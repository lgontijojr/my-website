import Link from 'next/link';

interface MobileNavbarProps {
  isOpen: boolean;
  toggleSidebar: (open: boolean) => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = (props) => {
  return (
    <div className="mobile_menu">
      <nav>
        <ul>
          <li>
            <Link
              onClick={() => props.toggleSidebar(!props.isOpen)}
              href="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              onClick={() => props.toggleSidebar(!props.isOpen)}
              href="/resume"
            >
              Resume
            </Link>
          </li>
          <li>
            <Link
              onClick={() => props.toggleSidebar(!props.isOpen)}
              href="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavbar;
