// components/Navbar.tsx
'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      signOut();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="app-title">My App</span>
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <Link href="/portfolio" className={pathname === '/portfolio' ? 'active' : ''}>
            Portfolio
          </Link>
          <Link href="/todo" className={pathname === '/todo' ? 'active' : ''}>
            ToDo
          </Link>
          <button onClick={handleSignOut} className="sign-out-btn">
            Sign Out
          </button>
        </div>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`menu-line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`menu-line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`menu-line ${menuOpen ? 'open' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;