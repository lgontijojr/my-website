import { useState, useEffect } from 'react';
import Link from 'next/link';
import MobileNavbar from './MobileNavbar';

interface NavbarProps {
  isOpen: boolean;
  toggleSidebar: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  function getWindowWidth() {
    const { innerWidth: width } = window;
    return width;
  }

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  if (windowWidth > 600) props.toggleSidebar(false);

  return (
    <header className={props.isOpen ? "header_expand" : "header"}>
      <div className="navbar_header">
        <h1 className="name_logo">
          <a href="/">{"<LG/>"}</a>
        </h1>
        <span
          className="hamburger_menu"
          role="button"
          onClick={() => props.toggleSidebar(!props.isOpen)}
        >
          ☰
        </span>
      </div>
      {props.isOpen && (
        <MobileNavbar
          isOpen={props.isOpen}
          toggleSidebar={props.toggleSidebar}
        />
      )}
      <nav className="nav_bar">
        <ul className="nav_menu">
          <li className="nav_item">
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/resume">Resume</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
