import { dimensions } from '../data';
export default function Footer({ navigate, onShowCredits }) {
    const links = [
        { label: 'Home', page: 'home' },
        { label: 'About the Self', page: 'about' },
        { label: 'Dimensions', page: 'dimensions' },
        { label: 'Self-Reflection', page: 'reflection' },
        { label: 'Multimedia', page: 'multimedia' },
        { label: 'References', page: 'references' },
    ];
    return (<footer style={{ background: 'var(--navy)', color: 'rgba(255,255,255,0.5)', padding: 'clamp(3rem,6vw,5rem) 2rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="footer-grid" style={{ marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
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
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>Unpacking the Self</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>A Learning Website · Understanding the Self</div>
              </div>
            </div>
            <p style={{ fontSize: '0.84rem', lineHeight: 1.75 }}>
              An educational platform for self-discovery and understanding the dimensions of human identity. Created for ACT & BSCS — Understanding the Self.
            </p>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Navigate</div>
            {links.slice(0, 3).map(({ label, page }) => (<button key={page} onClick={() => navigate({ page })} style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', padding: '0.3rem 0', fontFamily: "'Inter', sans-serif", transition: 'color 0.2s', textAlign: 'left' }} onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>
                {label}
              </button>))}
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Activities</div>
            {links.slice(3).map(({ label, page }) => (<button key={page} onClick={() => navigate({ page })} style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', padding: '0.3rem 0', fontFamily: "'Inter', sans-serif", transition: 'color 0.2s', textAlign: 'left' }} onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>
                {label}
              </button>))}
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Dimensions</div>
            {dimensions.map(d => (<button key={d.id} onClick={() => navigate({ page: 'dimensions', dimLesson: d.id })} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.25rem 0', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '0.84rem', fontFamily: "'Inter', sans-serif", transition: 'color 0.2s', width: '100%' }} onMouseEnter={e => { e.currentTarget.style.color = d.color; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>
                <span style={{ fontSize: '0.85rem' }}>{d.icon}</span>{d.num} {d.name}
              </button>))}
          </div>
        </div>

        {/* Quote */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem', marginBottom: '2rem' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center', margin: 0 }}>
            "The privilege of a lifetime is to become who you truly are." — Carl Gustav Jung
          </p>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
            © 2026 · Unpacking the Self · Educational Project
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={onShowCredits} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontFamily: "'Inter', sans-serif", padding: 0, transition: 'color 0.2s', minHeight: '36px' }} onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}>
              Credits
            </button>
            <div style={{ display: 'flex', gap: '4px' }}>
              {dimensions.map(d => (<div key={d.id} style={{ width: '7px', height: '7px', borderRadius: '50%', background: d.color, opacity: 0.5 }}/>))}
            </div>
          </div>
        </div>
      </div>
    </footer>);
}
