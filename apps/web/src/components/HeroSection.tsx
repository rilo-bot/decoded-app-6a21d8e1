import React, { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: '12', label: 'Years of craft' },
  { value: '140+', label: 'Projects shipped' },
  { value: '80+', label: 'Satisfied clients' },
];

export function HeroSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleScrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToWork = () => {
    const el = document.querySelector('#portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/33349204/pexels-photo-33349204.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
          aria-hidden="true"
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.93) 0%, hsl(var(--primary) / 0.80) 60%, hsl(var(--primary) / 0.88) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-20">
        <div
          className="max-w-3xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 220ms cubic-bezier(0.22,1,0.36,1), transform 220ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Section label */}
          <div
            className="mb-6"
            style={{
              color: 'hsl(var(--primary-foreground) / 0.7)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Engineering partner
            <span
              style={{
                display: 'inline-block',
                width: '32px',
                height: '1px',
                background: 'hsl(var(--primary-foreground) / 0.4)',
              }}
            />
          </div>

          {/* Headline — split weight treatment */}
          <h1
            className="leading-tight mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'hsl(var(--primary-foreground))',
            }}
          >
            <span
              className="block text-4xl md:text-6xl"
              style={{ fontWeight: 300 }}
            >
              Software that earns
            </span>
            <span
              className="block text-4xl md:text-6xl"
              style={{ fontWeight: 700 }}
            >
              its place in{' '}
              <span className="text-[hsl(var(--brand-accent))]">production.</span>
            </span>
          </h1>

          {/* Value statement */}
          <p
            className="text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
            style={{
              color: 'hsl(var(--primary-foreground) / 0.75)',
              fontFamily: 'var(--font-body)',
            }}
          >
            DevCraft builds custom software, web platforms, and mobile applications for businesses that can't afford to compromise on quality or delivery speed.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 220ms 60ms cubic-bezier(0.22,1,0.36,1), transform 220ms 60ms cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <button
              onClick={handleScrollToContact}
              className="cta-lift inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold text-sm bg-[hsl(var(--brand-accent))] text-[hsl(var(--brand-accent-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:opacity-90 transition-opacity duration-150"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Request a Quote
            </button>
            <button
              onClick={handleScrollToWork}
              className="cta-lift inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold text-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-primary-foreground/5 transition-colors duration-150"
              style={{
                fontFamily: 'var(--font-display)',
                borderColor: 'hsl(var(--primary-foreground) / 0.35)',
                color: 'hsl(var(--primary-foreground))',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'hsl(var(--primary-foreground) / 0.7)';
                (e.currentTarget as HTMLButtonElement).style.background = 'hsl(var(--primary-foreground) / 0.06)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'hsl(var(--primary-foreground) / 0.35)';
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              See Our Work
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="mt-16 pt-8 border-t grid grid-cols-3 gap-6 md:gap-12 max-w-xl"
          style={{
            borderColor: 'hsl(var(--primary-foreground) / 0.15)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 220ms 120ms cubic-bezier(0.22,1,0.36,1), transform 220ms 120ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p
                className="text-3xl md:text-4xl leading-none mb-1 text-[hsl(var(--brand-accent))]"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontVariantNumeric: 'tabular-nums',
                  fontWeight: 700,
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs uppercase tracking-widest"
                style={{
                  color: 'hsl(var(--primary-foreground) / 0.55)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        style={{ color: 'hsl(var(--primary-foreground) / 0.4)' }}
        aria-hidden="true"
      >
        <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>Scroll</span>
        <span
          style={{
            display: 'block',
            width: '1px',
            height: '32px',
            background: 'hsl(var(--primary-foreground) / 0.3)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
