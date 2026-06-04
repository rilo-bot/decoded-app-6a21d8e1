import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { useContactStore } from '@/stores/contactStore';

const SERVICE_OPTIONS = [
  'Custom Software Development',
  'Web Development',
  'Mobile Application',
  'Cloud Solutions',
  'API Integration',
  'UI/UX Design',
  'Multiple Services',
];

const BUDGET_OPTIONS = [
  'Under $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000+',
  'Not sure yet',
];

const STEPS = ['About You', 'Project Scope', 'Details'];

interface FormData {
  name: string;
  email: string;
  company: string;
  serviceType: string;
  budgetRange: string;
  description: string;
}

const INITIAL: FormData = {
  name: '',
  email: '',
  company: '',
  serviceType: '',
  budgetRange: '',
  description: '',
};

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          {/* Circle */}
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0 transition-all duration-200"
            style={{
              fontFamily: 'var(--font-display)',
              background: i <= current ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
              color: i <= current ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
              border: i === current ? '2px solid hsl(var(--primary))' : '2px solid transparent',
              boxShadow: i === current ? '0 0 0 3px hsl(var(--primary) / 0.15)' : 'none',
              transition: 'background 200ms ease, box-shadow 200ms ease',
            }}
            aria-current={i === current ? 'step' : undefined}
          >
            {i < current ? (
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <span>{i + 1}</span>
            )}
          </div>

          {/* Track */}
          {i < total - 1 && (
            <div
              className="flex-1 h-px mx-2"
              style={{
                background: i < current ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                transition: 'background 200ms ease',
                minWidth: '24px',
                maxWidth: '60px',
              }}
              aria-hidden="true"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function StepLabel({ step, current }: { step: string; current: boolean }) {
  return (
    <span
      className="text-xs font-semibold uppercase tracking-wider"
      style={{
        fontFamily: 'var(--font-display)',
        color: current ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
        letterSpacing: '0.08em',
      }}
    >
      {step}
    </span>
  );
}

export function ContactForm() {
  const addSubmission = useContactStore((s) => s.addSubmission);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (): boolean => {
    if (step === 0) {
      if (!form.name.trim()) { toast.error('Your name is required.'); return false; }
      if (!form.email.trim()) { toast.error('Your email is required.'); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { toast.error('Please enter a valid email address.'); return false; }
      return true;
    }
    if (step === 1) {
      if (!form.serviceType) { toast.error('Please select the service you need.'); return false; }
      if (!form.budgetRange) { toast.error('Please select a budget range.'); return false; }
      return true;
    }
    if (step === 2) {
      if (!form.description.trim() || form.description.trim().length < 20) {
        toast.error('Please describe your project in at least a sentence or two.');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    addSubmission({
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      serviceType: form.serviceType,
      budgetRange: form.budgetRange,
      description: form.description.trim(),
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(INITIAL);
    setStep(0);
    setSubmitted(false);
  };

  const inputClass = `
    w-full px-3 py-2.5 rounded-md border text-sm text-foreground bg-card
    focus:outline-none focus:ring-2 focus:ring-ring
    transition-colors duration-150
    placeholder:text-muted-foreground
  `;
  const inputStyle = {
    fontFamily: 'var(--font-body)',
    borderColor: 'hsl(var(--border))',
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontSize: '13px',
    fontWeight: 600,
    color: 'hsl(var(--foreground))',
    display: 'block',
    marginBottom: '6px',
  };

  if (submitted) {
    return (
      <section
        id="contact"
        className="py-24 md:py-32 bg-primary"
      >
        <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8 bg-[hsl(var(--brand-accent)/0.2)]"
          >
            <Check
              className="w-8 h-8 text-[hsl(var(--brand-accent))]"
              aria-hidden="true"
            />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Request received.
          </h2>
          <p
            className="text-lg mb-3 leading-relaxed"
            style={{ color: 'hsl(var(--primary-foreground) / 0.75)', fontFamily: 'var(--font-body)' }}
          >
            We have your details, <strong style={{ color: 'hsl(var(--primary-foreground))' }}>{form.name}</strong>. One of the team will review your project brief and be in touch within one business day.
          </p>
          <p
            className="text-sm mb-10"
            style={{ color: 'hsl(var(--primary-foreground) / 0.5)', fontFamily: 'var(--font-body)' }}
          >
            Confirmation sent to {form.email}
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-semibold border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              fontFamily: 'var(--font-display)',
              borderColor: 'hsl(var(--primary-foreground) / 0.4)',
              color: 'hsl(var(--primary-foreground))',
              background: 'transparent',
              transition: 'border-color 150ms ease, background 150ms ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'hsl(var(--primary-foreground) / 0.08)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            Submit another request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-primary"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — copy */}
          <div className="lg:pt-12">
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
                color: 'hsl(var(--primary-foreground) / 0.6)',
                marginBottom: '16px',
              }}
            >
              Start a Project
              <span
                style={{
                  display: 'inline-block',
                  width: '32px',
                  height: '1px',
                  background: 'hsl(var(--primary-foreground) / 0.3)',
                }}
              />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-5 leading-tight text-primary-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Tell us what you are building.
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: 'hsl(var(--primary-foreground) / 0.7)', fontFamily: 'var(--font-body)' }}
            >
              Three steps. Two minutes. We will come back to you with a clear next step — no obligation, no sales noise.
            </p>

            {/* What happens next */}
            <div className="space-y-4">
              {[
                { n: '01', text: 'We review your brief and assess fit — honestly.' },
                { n: '02', text: 'A senior engineer jumps on a 30-minute discovery call.' },
                { n: '03', text: 'You receive a clear scope and indicative estimate.' },
              ].map((item) => (
                <div key={item.n} className="flex items-start gap-4">
                  <span
                    className="text-sm leading-none pt-0.5 shrink-0 text-[hsl(var(--brand-accent))] font-bold"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {item.n}
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: 'hsl(var(--primary-foreground) / 0.72)', fontFamily: 'var(--font-body)' }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form card */}
          <div
            className="rounded-2xl p-8 bg-card"
            style={{
              boxShadow: '0 8px 40px hsl(var(--primary) / 0.30)',
            }}
          >
            {/* Step labels */}
            <div className="flex justify-between mb-4 px-1">
              {STEPS.map((label, i) => (
                <StepLabel key={label} step={label} current={i === step} />
              ))}
            </div>

            {/* Step indicator */}
            <StepIndicator current={step} total={STEPS.length} />

            <form onSubmit={handleSubmit} noValidate>
              {/* Step 0 — About You */}
              {step === 0 && (
                <div
                  className="space-y-4"
                  style={{
                    opacity: 1,
                    animation: 'fadeRise 160ms cubic-bezier(0.22,1,0.36,1) both',
                  }}
                >
                  <div>
                    <label htmlFor="name" style={labelStyle}>Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      className={inputClass}
                      style={inputStyle}
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      autoFocus
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>Work Email *</label>
                    <input
                      id="email"
                      type="email"
                      className={inputClass}
                      style={inputStyle}
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" style={labelStyle}>
                      Company <span style={{ color: 'hsl(var(--muted-foreground))', fontWeight: 400 }}>(optional)</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      className={inputClass}
                      style={inputStyle}
                      placeholder="Acme Corp"
                      value={form.company}
                      onChange={(e) => update('company', e.target.value)}
                      autoComplete="organization"
                    />
                  </div>
                </div>
              )}

              {/* Step 1 — Project Scope */}
              {step === 1 && (
                <div
                  className="space-y-5"
                  style={{ animation: 'fadeRise 160ms cubic-bezier(0.22,1,0.36,1) both' }}
                >
                  <div>
                    <p style={{ ...labelStyle, marginBottom: '10px' }}>Service Type *</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SERVICE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update('serviceType', opt)}
                          className="text-left px-3 py-2.5 rounded-md border text-sm transition-all duration-150 focus-visible:ring-2 focus-visible:ring-ring"
                          style={{
                            fontFamily: 'var(--font-body)',
                            borderColor: form.serviceType === opt ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                            background: form.serviceType === opt ? 'hsl(var(--primary) / 0.08)' : 'hsl(var(--card))',
                            color: form.serviceType === opt ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
                            fontWeight: form.serviceType === opt ? 600 : 400,
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p style={{ ...labelStyle, marginBottom: '10px' }}>Estimated Budget *</p>
                    <div className="grid grid-cols-2 gap-2">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update('budgetRange', opt)}
                          className="text-left px-3 py-2.5 rounded-md border text-sm transition-all duration-150 focus-visible:ring-2 focus-visible:ring-ring"
                          style={{
                            fontFamily: 'var(--font-body)',
                            borderColor: form.budgetRange === opt ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                            background: form.budgetRange === opt ? 'hsl(var(--primary) / 0.08)' : 'hsl(var(--card))',
                            color: form.budgetRange === opt ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
                            fontWeight: form.budgetRange === opt ? 600 : 400,
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 — Details */}
              {step === 2 && (
                <div
                  className="space-y-4"
                  style={{ animation: 'fadeRise 160ms cubic-bezier(0.22,1,0.36,1) both' }}
                >
                  <div>
                    <label htmlFor="description" style={labelStyle}>
                      Project Brief *
                    </label>
                    <p
                      className="text-xs mb-2 leading-relaxed text-muted-foreground"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Describe the problem you are solving, your target users, and any constraints or timelines we should know about.
                    </p>
                    <textarea
                      id="description"
                      className={inputClass}
                      style={{ ...inputStyle, minHeight: '160px', resize: 'vertical' }}
                      placeholder="We need to replace our manual Excel process with a system that handles X for Y users, in roughly Z timeframe..."
                      value={form.description}
                      onChange={(e) => update('description', e.target.value)}
                      autoFocus
                    />
                    <p
                      className="text-xs mt-1.5 text-right"
                      style={{
                        color: form.description.length >= 20 ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {form.description.length} chars
                    </p>
                  </div>

                  {/* Summary */}
                  <div
                    className="rounded-lg p-4 text-sm space-y-1 bg-primary/[0.06]"
                    style={{
                      borderLeft: '3px solid hsl(var(--primary))',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <p className="text-foreground">
                      <strong style={{ fontFamily: 'var(--font-display)' }}>{form.name}</strong>
                      {form.company ? ` · ${form.company}` : ''}
                    </p>
                    <p className="text-muted-foreground">{form.email}</p>
                    <p className="text-primary font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                      {form.serviceType} · {form.budgetRange}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 gap-3">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2.5 rounded-md text-sm font-semibold border border-border text-muted-foreground bg-transparent transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring hover:bg-muted"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Back
                  </button>
                ) : (
                  <span />
                )}

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="cta-lift px-5 py-2.5 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    style={{
                      fontFamily: 'var(--font-display)',
                      transition: 'background-color 150ms ease, transform 150ms ease',
                    }}
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="cta-lift px-5 py-2.5 rounded-md text-sm font-semibold bg-[hsl(var(--brand-accent))] text-[hsl(var(--brand-accent-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:opacity-90 transition-opacity duration-150"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Send Request
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
