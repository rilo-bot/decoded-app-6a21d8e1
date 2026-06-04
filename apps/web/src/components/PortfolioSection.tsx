import React, { useEffect, useRef, useState } from 'react';

interface Project {
  title: string;
  description: string;
  stack: string[];
  image: string;
  imageAlt: string;
  category: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Meridian Finance',
    description: 'A real-time financial dashboard for wealth managers — live portfolio tracking, alerts, and automated reporting built for speed and accuracy.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    image: 'https://images.pexels.com/photos/7058702/pexels-photo-7058702.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Meridian Finance dashboard interface',
    category: 'Fintech',
  },
  {
    title: 'Curia Commerce',
    description: 'A cross-platform mobile commerce application with AI-driven product recommendations and a checkout flow optimized for conversion.',
    stack: ['React Native', 'GraphQL', 'Stripe', 'Redis'],
    image: 'https://images.pexels.com/photos/6331230/pexels-photo-6331230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Curia Commerce mobile shopping app',
    category: 'E-commerce',
  },
  {
    title: 'Orbis DevOps',
    description: 'Infrastructure monitoring platform for distributed systems — real-time metrics, anomaly detection, and automated incident response workflows.',
    stack: ['Go', 'Kubernetes', 'Prometheus', 'React'],
    image: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Orbis DevOps monitoring system',
    category: 'Cloud',
  },
  {
    title: 'Healpath Clinical',
    description: 'HIPAA-compliant patient management system for clinics — appointment scheduling, electronic health records, and billing integration.',
    stack: ['Next.js', 'Python', 'PostgreSQL', 'AWS'],
    image: 'https://images.pexels.com/photos/7439127/pexels-photo-7439127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Healpath Clinical management interface',
    category: 'Healthcare',
  },
  {
    title: 'Vector Logistics',
    description: 'Supply chain intelligence platform for a mid-market logistics firm — shipment tracking, demand forecasting, and carrier API integrations.',
    stack: ['Vue.js', 'FastAPI', 'Kafka', 'Elasticsearch'],
    image: 'https://images.pexels.com/photos/13025947/pexels-photo-13025947.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Vector Logistics supply chain platform',
    category: 'Logistics',
  },
  {
    title: 'Estato Property',
    description: 'Property listing and search platform with interactive maps, mortgage calculators, and a CRM for real estate agents to manage their pipelines.',
    stack: ['React', 'Django', 'PostGIS', 'Mapbox'],
    image: 'https://images.pexels.com/photos/7937214/pexels-photo-7937214.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Estato property listing platform',
    category: 'Real Estate',
  },
];

interface ProjectCardProps {
  project: Project;
  delay: number;
  visible: boolean;
}

function ProjectCard({ project, delay, visible }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden border border-border cursor-pointer group bg-card"
      style={{
        boxShadow: '0 2px 8px hsl(var(--primary) / 0.08)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 220ms ${delay}ms cubic-bezier(0.22,1,0.36,1), transform 220ms ${delay}ms cubic-bezier(0.22,1,0.36,1)`,
        position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent left border — hover */}
      <div
        className="bg-[hsl(var(--brand-accent))]"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 180ms cubic-bezier(0.22,1,0.36,1)',
          zIndex: 10,
          borderRadius: '2px 0 0 2px',
        }}
        aria-hidden="true"
      />

      {/* Image area */}
      <div
        className="relative overflow-hidden"
        style={{ height: '200px' }}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? 'scale(1.03)' : 'scale(1.00)',
            transition: 'transform 180ms ease',
          }}
        />

        {/* Dark overlay with stack tags */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'hsl(var(--primary) / 0.88)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '16px',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 180ms ease',
          }}
        >
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs font-semibold bg-[hsl(var(--brand-accent)/0.2)] text-[hsl(var(--brand-accent))] border border-[hsl(var(--brand-accent)/0.35)]"
                style={{
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.03em',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Category badge */}
        <div
          className="absolute top-3 right-3"
          style={{
            opacity: hovered ? 0 : 1,
            transition: 'opacity 180ms ease',
          }}
        >
          <span
            className="px-2 py-0.5 rounded text-xs font-semibold bg-primary/20 text-primary-foreground"
            style={{
              fontFamily: 'var(--font-display)',
              backdropFilter: 'blur(4px)',
              letterSpacing: '0.05em',
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 bg-card">
        <h3
          className="text-base font-semibold text-foreground mb-1.5"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm text-muted-foreground leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {project.description}
        </p>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="portfolio"
      className="py-24 md:py-32 bg-background"
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
            Selected Work
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
            Projects we are proud to put our name on
          </h2>
          <p
            className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            A cross-section of the industries and challenges we have tackled — each one shipped, maintained, and trusted by real users.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              delay={i * 60}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
