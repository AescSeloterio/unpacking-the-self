import { useState, useEffect } from 'react';
export default function Navbar({ current, navigate, darkMode, toggleDark }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 16);
        window.addEventListener('scroll', h);
        return () => window.removeEventListener('scroll', h);
    }, []);
    const links = [
        { label: 'Home', page: 'home' },
        { label: 'About the Self', page: 'about' },
        { label: 'Dimensions', page: 'dimensions' },
        { label: 'Self-Reflection', page: 'reflection' },
        { label: 'Multimedia', page: 'multimedia' },
        { label: 'References', page: 'references' },
    ];
    return (<nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            background: scrolled ? 'rgba(250,250,248,0.94)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
            transition: 'all 0.3s ease',
        }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <button onClick={() => navigate({ page: 'home' })} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="/favicon-clean.png"
                alt="Unpacking the Self"
                style={{
                  width: '48px',
                  height: '48px',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }}
              />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.1 }}>Unpacking the Self</div>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-3)', letterSpacing: '0.05em', lineHeight: 1 }}>ACT & BSCS · Understanding the Self</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          {links.map(({ label, page }) => (<button key={page} onClick={() => navigate({ page })} className={`nav-link${current.page === page && !current.dimLesson ? ' active' : ''}`} style={{ background: 'none', border: 'none', fontFamily: "'Inter', sans-serif" }}>
              {label}
            </button>))}
          <button className="theme-toggle" onClick={toggleDark} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.82rem', minHeight: '40px' }} onClick={() => navigate({ page: 'dimensions' })}>
            Start Learning
          </button>
        </div>

        {/* Hamburger */}
        <button className="show-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: 'var(--text-1)', display: 'none', padding: '8px', minHeight: '44px' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (<div style={{ background: 'var(--surface)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--border)', padding: '1rem 1.5rem 1.5rem' }}>
          {links.map(({ label, page }) => (<button key={page} onClick={() => { navigate({ page }); setMenuOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '0.85rem 0', fontSize: '1rem', fontWeight: current.page === page ? 700 : 500, color: current.page === page ? 'var(--navy)' : 'var(--text-2)', borderBottom: '1px solid var(--border)', fontFamily: "'Inter', sans-serif", transition: 'color 0.2s' }}>
              {label}
            </button>))}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button className="theme-toggle" onClick={toggleDark} style={{ flex: 'none' }}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="btn-primary" style={{ flex: 1 }} onClick={() => { navigate({ page: 'dimensions' }); setMenuOpen(false); }}>
              Start Learning
            </button>
          </div>
        </div>)}
      <style>{`@media(max-width:768px){.hide-mobile{display:none!important}.show-mobile{display:block!important}}`}</style>
    </nav>);
}
