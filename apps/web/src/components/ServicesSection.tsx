import React, { useEffect, useRef, useState } from 'react';
import { Code2, Globe, Smartphone, Cloud, Plug, Palette } from 'lucide-react';

const SERVICES = [
  {
    icon: Code2,
    title: 'Custom Software',
    description: 'Bespoke applications built to your exact specification — no off-the-shelf constraints, no compromises on the logic that matters most to your business.',
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Fast, accessible, and resilient web platforms built on modern stacks. From marketing sites to complex web applications — we ship with intent.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications with interfaces that respect the medium — intuitive on iOS, precise on Android.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Infrastructure designed for reliability and cost-efficiency. We architect, deploy, and optimize cloud systems that scale with your ambitions.',
  },
  {
    icon: Plug,
    title: 'API Integration',
    description: 'Connecting your systems, third-party services, and data pipelines cleanly — so your stack communicates without friction.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Interfaces that earn trust on first contact. Product design grounded in user research, shaped by craft, and delivered with engineering precision.',
  },
];

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
  visible: boolean;
}

function ServiceCard({ icon: Icon, title, description, delay, visible }: ServiceCardProps) {
  return (
    <div
      className="group rounded-xl p-6 border-border border bg-card"
      style={{
        boxShadow: '0 2px 8px hsl(var(--primary) / 0.08)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 220ms ${delay}ms cubic-bezier(0.22,1,0.36,1), transform 220ms ${delay}ms cubic-bezier(0.22,1,0.36,1), box-shadow 180ms ease`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px hsl(var(--primary) / 0.16)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px hsl(var(--primary) / 0.08)';
      }}
    >
      {/* Icon */}
      <div
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4 bg-primary/10"
      >
        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
      </div>

      <h3
        className="text-base font-semibold mb-2 text-foreground"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
        {description}
      </p>

      {/* Accent underline on hover */}
      <div
        className="mt-4 h-px bg-[hsl(var(--brand-accent))]"
        style={{
          transformOrigin: 'left',
          transition: 'transform 200ms cubic-bezier(0.22,1,0.36,1)',
          transform: 'scaleX(0)',
        }}
        ref={(el) => {
          if (!el) return;
          const parent = el.parentElement;
          if (!parent) return;
          const show = () => (el.style.transform = 'scaleX(1)');
          const hide = () => (el.style.transform = 'scaleX(0)');
          parent.addEventListener('mouseenter', show);
          parent.addEventListener('mouseleave', hide);
        }}
      />
    </div>
  );
}

export function ServicesSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-primary/[0.03]"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          ref={ref}
          className="mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 220ms cubic-bezier(0.22,1,0.36,1), transform 220ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'hsl(var(--primary))',
              marginBottom: '16px',
            }}
          >
            Our Services
            <span
              style={{
                display: 'inline-block',
                width: '32px',
                height: '1px',
                background: 'hsl(var(--primary) / 0.5)',
              }}
            />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground max-w-2xl leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The full stack of a reliable engineering partner
          </h2>
          <p
            className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Six disciplines. One team. Delivered without the overhead of a large agency or the risk of a freelancer network.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <ServiceCard
              key={svc.title}
              icon={svc.icon}
              title={svc.title}
              description={svc.description}
              delay={i * 60}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
