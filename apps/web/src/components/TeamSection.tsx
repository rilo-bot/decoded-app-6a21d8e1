import React, { useEffect, useRef, useState } from 'react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
}

const TEAM: TeamMember[] = [
  {
    name: 'Marcus Reid',
    role: 'Co-Founder & CTO',
    bio: 'Systems architect with 15 years shipping distributed backends at scale. Marcus leads technical strategy and ensures every project is built to last.',
    image: 'https://images.pexels.com/photos/5483147/pexels-photo-5483147.jpeg?auto=compress&cs=tinysrgb&h=350',
    imageAlt: 'Marcus Reid, Co-Founder and CTO',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Product Design',
    bio: 'Product designer and strategist who works at the intersection of user research and engineering reality. Priya ensures the interfaces we ship are earned, not assembled.',
    image: 'https://images.pexels.com/photos/25651527/pexels-photo-25651527.jpeg?auto=compress&cs=tinysrgb&h=350',
    imageAlt: 'Priya Nair, Head of Product Design',
  },
  {
    name: 'Jonas Weber',
    role: 'Lead Full-Stack Engineer',
    bio: 'Specialist in high-performance web applications and API design. Jonas has a bias for simplicity and a track record of on-time delivery across complex multi-stakeholder projects.',
    image: 'https://images.pexels.com/photos/14391922/pexels-photo-14391922.jpeg?auto=compress&cs=tinysrgb&h=350',
    imageAlt: 'Jonas Weber, Lead Full-Stack Engineer',
  },
  {
    name: 'Anya Osei',
    role: 'Cloud & Infrastructure Lead',
    bio: 'Cloud architect certified across AWS, GCP, and Azure. Anya designs systems that scale predictably and cost efficiently — from first deploy to ten million users.',
    image: 'https://images.pexels.com/photos/1181319/pexels-photo-1181319.jpeg?auto=compress&cs=tinysrgb&h=350',
    imageAlt: 'Anya Osei, Cloud and Infrastructure Lead',
  },
];

interface TeamCardProps {
  member: TeamMember;
  delay: number;
  visible: boolean;
}

function TeamCard({ member, delay, visible }: TeamCardProps) {
  return (
    <div
      className="rounded-xl p-6 border border-border bg-card flex flex-col items-center text-center"
      style={{
        boxShadow: '0 2px 8px hsl(var(--primary) / 0.08)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 220ms ${delay}ms cubic-bezier(0.22,1,0.36,1), transform 220ms ${delay}ms cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      {/* Avatar with gradient ring using primary and accent tokens */}
      <div
        className="mb-4 shrink-0"
        style={{
          width: '88px',
          height: '88px',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.5), hsl(var(--brand-accent)))',
          padding: '2px',
        }}
      >
        <img
          src={member.image}
          alt={member.imageAlt}
          crossOrigin="anonymous"
          className="w-full h-full rounded-full object-cover block"
        />
      </div>

      {/* Name + role */}
      <h3
        className="text-base font-semibold text-foreground leading-snug mb-0.5"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {member.name}
      </h3>
      <p
        className="text-xs font-semibold mb-3 uppercase tracking-wider text-primary"
        style={{
          fontFamily: 'var(--font-display)',
          letterSpacing: '0.08em',
        }}
      >
        {member.role}
      </p>

      {/* Bio */}
      <p
        className="text-sm text-muted-foreground leading-relaxed"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {member.bio}
      </p>
    </div>
  );
}

export function TeamSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="team"
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
            Meet the Team
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
            People who own what they build
          </h2>
          <p
            className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            A small, senior team. You work with the engineers building your product — not account managers relaying messages.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <TeamCard
              key={member.name}
              member={member}
              delay={i * 60}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
