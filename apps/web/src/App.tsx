import '@/styles/theme.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from '@/pages/Home';

// Inline keyframes for fadeRise — referenced in ContactForm step transitions
const globalStyle = `
@keyframes fadeRise {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
html { scroll-behavior: smooth; }

.nav-link { position: relative; }
.nav-link::after {
  content: '';
  position: absolute;
  left: 0; bottom: -2px;
  width: 0; height: 1.5px;
  background: hsl(var(--brand-accent));
  transition: width 200ms cubic-bezier(0.22, 1, 0.36, 1);
}
.nav-link:hover::after { width: 100%; }

.cta-lift { transition: background-color 150ms ease, transform 150ms ease; }
.cta-lift:hover { transform: translateY(-2px); }

@media (prefers-reduced-motion: reduce) {
  .animate-fade-rise { animation: none !important; }
  .cta-lift:hover { transform: none !important; }
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
`;

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: globalStyle }} />;
}

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={
            <div
              className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
              style={{ background: 'hsl(var(--background))' }}
            >
              <p
                className="text-7xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--primary))' }}
              >
                404
              </p>
              <h1
                className="text-2xl font-bold text-foreground mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                This page does not exist.
              </h1>
              <p
                className="text-base text-muted-foreground mb-8 max-w-sm"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                The URL you followed is either outdated or was never here. Head back and keep exploring.
              </p>
              <a
                href="/"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Back to Home
              </a>
            </div>
          }
        />
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
}
