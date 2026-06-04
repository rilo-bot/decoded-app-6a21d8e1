import React from 'react';
import { NavBar } from '@/components/NavBar';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { TeamSection } from '@/components/TeamSection';
import { ContactForm } from '@/components/ContactForm';

// Footer
function Footer() {
  return (
    <footer
      className="py-10 border-t"
      style={{
        borderColor: 'hsl(var(--border))',
        background: 'hsl(267, 30%, 97%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <img
              src="https://rilo-api-dev.onrender.com/uploads/logos/craft-with-love-v2-thumb-1780489618403-a59e6644.png"
              alt="DevCraft"
              className="h-7 w-auto object-contain"
            />
            <span
              className="font-semibold text-sm text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              DevCraft
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6">
            {[
              { label: 'Services', href: '#services' },
              { label: 'Portfolio', href: '#portfolio' },
              { label: 'Team', href: '#team' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-150"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector(link.href);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Legal */}
          <p
            className="text-xs text-muted-foreground"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            © {new Date().getFullYear()} DevCraft. Built with craft.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>
      <NavBar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <TeamSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
