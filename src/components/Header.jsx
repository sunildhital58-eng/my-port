import React, { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'services', label: 'Services' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'clients', label: 'Clients' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="bg-transparent">
      <nav className="container navbar">
        {/* Desktop Logo */}
        <img src="/logo.png" alt="logo" className="logo" />
        
        {/* Mobile Logo */}
        <img src="/logo-mobile.png" alt="logo" className="mobile-logo" />

        {/* Hamburger Menu */}
        <div className="humburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className="fa-solid fa-bars-staggered" data-visible={!isMenuOpen}></i>
          <i className="fa-solid fa-xmark" data-visible={isMenuOpen}></i>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links" data-visible={isMenuOpen}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
          <a href="/admin" className="btn" onClick={() => setIsMenuOpen(false)}>
            Admin
          </a>
        </ul>
      </nav>
    </header>
  );
}
