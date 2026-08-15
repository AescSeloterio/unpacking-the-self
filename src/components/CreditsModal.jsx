export default function CreditsModal({ onClose }) {
    const groups = [
        {
            role: 'Project Leader',
            members: ['Ian Humphrey I. Seloterio'],
        },
        {
            role: 'UI/UX Design',
            members: ['Jhon Russel Amaya', 'Lovely Ompad ', 'John Lloyd Baladhay', 'Clark Jared Manigos'],
        },
        {
            role: 'Development',
            members: ['Ian Humphrey I. Seloterio'],
        },
        {
            role: 'Content & Research',
            members: ['Benedict Declanan', 'Jian Reyson', 'Sherylyn Tagsip'],
        },
        {
            role: 'Documentation',
            members: ['In Progress'],
        },
        {
            role: 'Testing & Quality',
            members: ['Clark Jared Manigos', 'Andrea Faith Marce', 'Jolly Mae Neduelan'],
        },
    ];
    return (<div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem' }} onClick={e => { if (e.target === e.currentTarget)
        onClose(); }}>
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(9,13,19,0.72)', backdropFilter: 'blur(8px)' }} onClick={onClose}/>

      {/* Modal */}
      <div style={{
            position: 'relative', background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)', padding: 'clamp(1.75rem,4vw,2.75rem)',
            maxWidth: '680px', width: '100%', maxHeight: '85vh', overflowY: 'auto',
            boxShadow: '0 32px 80px rgba(0,0,0,0.28)', animation: 'fadeInUp 0.3s ease',
        }}>
        {/* Close */}
        <button onClick={onClose} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1rem', color: 'var(--text-2)', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--border)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg)'; }}>
          ✕
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem', paddingRight: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#0F3460', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
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
          </div>
          <div className="section-label" style={{ marginBottom: '0.4rem' }}>Project Credits</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem,2.5vw,1.75rem)', color: 'var(--text-1)', margin: '0 0 0.5rem' }}>
            Unpacking the Self
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: '0.82rem', margin: 0 }}>
            ACT &amp; BSCS — Understanding the Self · Educational Project
          </p>
        </div>

        {/* Grid of roles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {groups.map(g => (<div key={g.role} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.1rem 1.25rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.625rem' }}>{g.role}</div>
              {g.members.map((m, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: i < g.members.length - 1 ? '0.3rem' : 0 }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--teal)', flexShrink: 0 }}/>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-1)', lineHeight: 1.4 }}>{m}</span>
                </div>))}
            </div>))}
        </div>

        <div style={{ marginTop: '1.75rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-3)', fontSize: '0.75rem', margin: 0 }}>© 2026 · ACT &amp; BSCS — Understanding the Self · Educational Project</p>
        </div>
      </div>
    </div>);
}
