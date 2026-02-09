const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_USERNAME = "lgontijojr";

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  minRequestInterval: 60 * 1000, // Minimum 1 minute between requests
  cacheTimeout: 60 * 60 * 1000, // Cache for 1 hour
  rateLimitThreshold: 100, // Start throttling when remaining calls drop below this
};

// In-memory cache and rate limit tracking
interface CacheEntry {
  data: ContributionData;
  timestamp: number;
  rateLimitRemaining: number;
  rateLimitReset: number;
}

let cache: CacheEntry | null = null;
let lastRequestTime = 0;

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

const CONTRIBUTION_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

function isCacheValid(): boolean {
  if (!cache) {
    return false;
  }

  const now = Date.now();
  const cacheAge = now - cache.timestamp;

  // Cache is valid if it's within the timeout period
  if (cacheAge < RATE_LIMIT_CONFIG.cacheTimeout) {
    return true;
  }

  return false;
}

function shouldThrottle(): boolean {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  // Enforce minimum interval between requests
  if (timeSinceLastRequest < RATE_LIMIT_CONFIG.minRequestInterval) {
    return true;
  }

  // If we have rate limit info and we're approaching the limit, throttle
  if (cache && cache.rateLimitRemaining < RATE_LIMIT_CONFIG.rateLimitThreshold) {
    const resetTime = cache.rateLimitReset * 1000; // Convert to ms
    if (now < resetTime) {
      return true;
    }
  }

  return false;
}

export async function fetchGitHubContributions(): Promise<ContributionData | null> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return null;
  }

  // Return cached data if valid
  if (isCacheValid()) {
    return cache!.data;
  }

  // Check if we should throttle requests
  if (shouldThrottle() && cache) {
    return cache.data;
  }

  try {
    lastRequestTime = Date.now();

    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CONTRIBUTION_QUERY,
        variables: { username: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 }, // Next.js cache revalidation
    });

    // Extract rate limit headers
    const rateLimitRemaining = parseInt(
      response.headers.get("x-ratelimit-remaining") || "5000",
      10
    );
    const rateLimitReset = parseInt(response.headers.get("x-ratelimit-reset") || "0", 10);

    // Handle rate limit exceeded (403 with rate limit message)
    if (response.status === 403) {
      const errorData = await response.json();
      if (errorData.message?.includes("rate limit")) {
        return cache?.data ?? null;
      }
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const calendar = data.data.user.contributionsCollection.contributionCalendar;

    const contributionData: ContributionData = {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    };

    // Update cache
    cache = {
      data: contributionData,
      timestamp: Date.now(),
      rateLimitRemaining,
      rateLimitReset,
    };

    return contributionData;
  } catch {
    // Return cached data on error if available
    return cache?.data ?? null;
  }
}
