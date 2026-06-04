import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        scrolled
          ? 'bg-card/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
      style={{ transition: 'background-color 200ms ease, box-shadow 200ms ease' }}
    >
      <nav className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 shrink-0"
          aria-label="DevCraft home"
        >
          <img
            src="https://rilo-api-dev.onrender.com/uploads/logos/craft-with-love-v2-thumb-1780489618403-a59e6644.png"
            alt="DevCraft"
            className="h-8 w-auto object-contain"
          />
          <span
            className="font-semibold text-foreground tracking-tight hidden sm:inline"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            DevCraft
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                'nav-link text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-150 bg-transparent border-0 cursor-pointer pb-0.5'
              )}
              style={{ fontFamily: 'var(--font-display)', position: 'relative' }}
            >
              {link.label}
              <span
                className="absolute left-0 bottom-0 h-px bg-[hsl(var(--brand-accent))] transition-all duration-200"
                style={{ width: 0 }}
                aria-hidden="true"
              />
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="cta-lift ml-2 inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ fontFamily: 'var(--font-display)', transition: 'background-color 150ms ease, transform 150ms ease' }}
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={cn(
              'block h-0.5 w-5 bg-foreground transition-transform duration-200',
              menuOpen && 'rotate-45 translate-y-2'
            )}
          />
          <span
            className={cn(
              'block h-0.5 w-5 bg-foreground transition-opacity duration-200',
              menuOpen && 'opacity-0'
            )}
          />
          <span
            className={cn(
              'block h-0.5 w-5 bg-foreground transition-transform duration-200',
              menuOpen && '-rotate-45 -translate-y-2'
            )}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 pt-2 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left w-full py-2.5 px-2 text-sm font-medium text-muted-foreground hover:text-primary rounded hover:bg-primary/5 transition-colors duration-150 bg-transparent border-0 cursor-pointer"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="mt-2 w-full py-2.5 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-150"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Get a Quote
          </button>
        </div>
      )}
    </header>
  );
}
