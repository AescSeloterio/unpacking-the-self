import { useState } from 'react';
import { dimensions, IMG } from '../data';
export default function HomePage({ navigate, completed }) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [activeDim, setActiveDim] = useState(null);
    const iconPositions = [
        { top: '5%', left: '3%', klass: 'float-a', dim: dimensions[0] },
        { top: '6%', right: '3%', klass: 'float-b', dim: dimensions[1] },
        { top: '32%', left: '1%', klass: 'float-c', dim: dimensions[2] },
        { top: '35%', right: '1%', klass: 'float-d', dim: dimensions[3] },
        { bottom: '28%', left: '3%', klass: 'float-e', dim: dimensions[4] },
        { bottom: '28%', right: '3%', klass: 'float-f', dim: dimensions[5] },
        { bottom: '5%', left: 'calc(42% - 65px)', klass: 'float-g', dim: dimensions[6] },
    ];
    return (<div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ minHeight: '100svh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', alignItems: 'center', paddingTop: '68px', position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>

        {/* Left: text */}
        <div style={{ padding: 'clamp(3rem,6vw,5.5rem) clamp(1.5rem,4vw,4rem)', position: 'relative', zIndex: 2 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 0% 50%, rgba(13,148,136,0.07), transparent 65%)', pointerEvents: 'none' }}/>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(15,52,96,0.08)', border: '1px solid rgba(15,52,96,0.15)', borderRadius: '50px', padding: '5px 14px', marginBottom: '1.75rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--teal)', flexShrink: 0 }}/>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>ACT & BSCS — Understanding the Self</span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.6rem,5.5vw,4.8rem)', fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.1, margin: '0 0 0.75rem', animation: 'fadeInUp 0.65s ease 0.05s both' }}>
              UNPACKING<br />THE SELF
            </h1>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1rem,2vw,1.3rem)', color: 'var(--teal)', fontStyle: 'italic', margin: '0 0 1.25rem', animation: 'fadeInUp 0.65s ease 0.15s both', fontWeight: 600 }}>
              Discover. Understand. Reflect.
            </p>
            <p style={{ color: 'var(--text-2)', fontSize: 'clamp(0.9rem,1.5vw,1rem)', lineHeight: 1.8, maxWidth: '460px', margin: '0 0 2.25rem', animation: 'fadeInUp 0.65s ease 0.25s both' }}>
              A guided journey into the seven dimensions of your identity. For college students exploring what it means to truly know yourself.
            </p>

            <div className="hero-cta-row" style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', animation: 'fadeInUp 0.65s ease 0.35s both' }}>
              <button className="btn-primary" onClick={() => navigate({ page: 'dimensions' })}>START EXPLORING →</button>
              <button className="btn-secondary" onClick={() => navigate({ page: 'about' })}>LEARN ABOUT THE SELF</button>
            </div>

            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2.5rem', flexWrap: 'wrap', animation: 'fadeInUp 0.65s ease 0.45s both' }}>
              {[{ n: '7', l: 'Dimensions' }, { n: '28', l: 'Lessons' }, { n: '3', l: 'Activities' }].map(s => (<div key={s.l}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 800, color: 'var(--navy)', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontWeight: 500, letterSpacing: '0.05em' }}>{s.l}</div>
                </div>))}
            </div>
          </div>
        </div>

        {/* Right: visual */}
        <div className="hero-image-panel" style={{ position: 'relative', overflow: 'hidden', background: '#f0f5f3' }}>
          <img src={IMG.hero} alt="Person in contemplative self-discovery" onLoad={() => setImgLoaded(true)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: imgLoaded ? 0.45 : 0, transition: 'opacity 0.8s ease' }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg) 0%, transparent 28%)' }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 25%)' }}/>

          {/* Floating dimension icons */}
          <div className="hero-float-icons-wrap">
            {iconPositions.map(({ top, left, right, bottom, transform, klass, dim }) => (<div key={dim.id} className={klass} onClick={() => navigate({ page: 'dimensions', dimLesson: dim.id })} onMouseEnter={() => setActiveDim(dim.id)} onMouseLeave={() => setActiveDim(null)} style={{ position: 'absolute', top, left, right, bottom, transform, cursor: 'pointer' }}>
                <div style={{
                background: activeDim === dim.id ? `${dim.color}18` : 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(12px)',
                border: `1.5px solid ${activeDim === dim.id ? dim.color : 'rgba(255,255,255,0.9)'}`,
                borderRadius: '14px', padding: '9px 13px',
                display: 'flex', alignItems: 'center', gap: '8px', minWidth: '112px',
                boxShadow: activeDim === dim.id ? `0 6px 24px ${dim.color}30` : '0 3px 16px rgba(0,0,0,0.08)',
                transform: activeDim === dim.id ? 'scale(1.08) translateY(-3px)' : 'scale(1)',
                transition: 'all 0.25s ease',
            }}>
                  <span style={{ fontSize: '1.2rem' }}>{dim.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.08em' }}>{dim.num}</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: dim.color }}>{dim.name}</div>
                  </div>
                  {completed.has(dim.id) && <div style={{ marginLeft: 'auto', width: '16px', height: '16px', borderRadius: '50%', background: dim.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 700 }}>✓</div>}
                </div>
              </div>))}
          </div>

          {/* Center ring */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '70px', height: '70px', borderRadius: '50%', border: '1.5px solid rgba(13,148,136,0.3)', animation: 'pulse-soft 3s ease-in-out infinite', zIndex: 2, pointerEvents: 'none' }}/>
        </div>
      </section>

      {/* ── Self-Discovery Journey ────────────────────────── */}
      <section style={{ background: '#0F3460', padding: 'clamp(3.5rem,6vw,5rem) 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ color: 'rgba(201,162,39,0.9)', marginBottom: '0.6rem' }}>Your Journey</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: '#fff', margin: 0 }}>The Self-Discovery Journey</h2>
          </div>
          <div className="journey-grid">
            {[
            { step: '01', label: 'DISCOVER', desc: 'Learn what the Self is and why understanding it is essential to a meaningful life.', icon: '🔍', color: '#C9A227' },
            { step: '02', label: 'UNDERSTAND', desc: 'Explore the seven dimensions that together form a complete picture of who you are.', icon: '📖', color: '#0D9488' },
            { step: '03', label: 'EXPLORE', desc: 'Dive deep into each dimension through guided lessons and everyday examples.', icon: '🌐', color: '#7C3AED' },
            { step: '04', label: 'REFLECT', desc: 'Apply your understanding to your own life through meaningful self-reflection activities.', icon: '💭', color: '#DC2626' },
        ].map((s, i) => (<div key={s.step} style={{ padding: '2rem 1.75rem', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.16)' : 'none', position: 'relative' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: s.color, letterSpacing: '0.15em', marginBottom: '0.6rem' }}>STEP {s.step}</div>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.6rem' }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, color: '#fff', margin: '0 0 0.6rem' }}>{s.label}</h3>
                <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.82rem', lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                {i < 3 && <div style={{ position: 'absolute', right: '-1px', top: '50%', width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', transform: 'translateY(-50%)' }}/>}
              </div>))}
          </div>
        </div>
      </section>

      {/* ── Six Dimensions Preview ────────────────────────── */}
      <section className="sp-xl" style={{ background: 'var(--bg)', padding: 'clamp(3.5rem,6vw,5.5rem) 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label" style={{ marginBottom: '0.6rem' }}>The Seven Dimensions</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: 'var(--text-1)', margin: '0 0 1rem' }}>The Architecture of the Self</h2>
            <p style={{ color: 'var(--text-2)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8, fontSize: '0.925rem' }}>
              Every person is a multidimensional being. Explore the seven dimensions that together form a complete understanding of who you are.
            </p>
            {completed.size > 0 && (<div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.2)', borderRadius: '50px', padding: '0.5rem 1.25rem', marginTop: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {dimensions.map(d => <div key={d.id} style={{ width: '8px', height: '8px', borderRadius: '50%', background: completed.has(d.id) ? d.color : 'var(--border)' }}/>)}
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--teal)' }}>{completed.size} of 6 completed</span>
              </div>)}
          </div>
          <div className="dim-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem' }}>
            {dimensions.map(dim => (<button key={dim.id} onClick={() => navigate({ page: 'dimensions', dimLesson: dim.id })} style={{ background: 'var(--surface)', border: `2px solid ${completed.has(dim.id) ? dim.color : 'var(--border)'}`, borderRadius: '18px', padding: '1.5rem 1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', position: 'relative', transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)' }} onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-7px) scale(1.03)'; el.style.background = `${dim.color}0a`; el.style.borderColor = dim.color; el.style.boxShadow = `0 12px 36px ${dim.color}20`; }} onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0) scale(1)'; el.style.background = 'var(--surface)'; el.style.borderColor = completed.has(dim.id) ? dim.color : 'var(--border)'; el.style.boxShadow = 'none'; }}>
                {completed.has(dim.id) && <div style={{ position: 'absolute', top: '-8px', right: '-8px', width: '20px', height: '20px', borderRadius: '50%', background: dim.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700 }}>✓</div>}
                <span style={{ fontSize: '1.8rem' }}>{dim.icon}</span>
                <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em' }}>{dim.num}</div>
                <div style={{ fontWeight: 700, color: dim.color, fontSize: '0.875rem', textAlign: 'center' }}>{dim.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', lineHeight: 1.4, textAlign: 'center' }}>{dim.tagline}</div>
                <div style={{ fontSize: '0.72rem', color: dim.color, fontWeight: 700, marginTop: '4px' }}>Explore →</div>
              </button>))}
          </div>
        </div>
      </section>

      {/* ── Why Understand Yourself ───────────────────────── */}
      <section style={{ background: 'var(--surface)', padding: 'clamp(3.5rem,6vw,5.5rem) 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label" style={{ marginBottom: '0.6rem' }}>Why It Matters</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: 'var(--text-1)', margin: 0 }}>Why Understand Yourself?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
            { icon: '🎯', title: 'Better Decisions', desc: "Understanding your values, biases, and emotional triggers leads to choices that are genuinely yours — not inherited from fear or habit.", color: 'var(--navy)' },
            { icon: '💬', title: 'Richer Relationships', desc: 'Self-knowledge allows you to show up authentically, communicate clearly, and connect with others at a deeper level.', color: 'var(--teal)' },
            { icon: '🌟', title: 'A Sense of Purpose', desc: "Knowing what gives you meaning and energy helps you navigate life's transitions with direction and courage.", color: 'var(--gold)' },
        ].map(c => (<div key={c.title} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(15,52,96,0.08)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{c.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#fff', margin: '0 0 0.75rem' }}>{c.title}</h3>
                <p style={{ color: 'var(--text-2)', lineHeight: 1.8, fontSize: '0.9rem', margin: 0 }}>{c.desc}</p>
                <div style={{ marginTop: '1.25rem', width: '36px', height: '2.5px', borderRadius: '2px', background: c.color }}/>
              </div>))}
          </div>
        </div>
      </section>

      {/* ── Quote ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,5vw,4.5rem) 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', color: 'var(--teal)', lineHeight: 0.8, marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>"</div>
          <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem,2.5vw,1.7rem)', color: 'var(--text-1)', lineHeight: 1.55, margin: '0 0 1.25rem', fontStyle: 'italic', fontWeight: 600 }}>
            Knowing yourself is the beginning of all wisdom.
          </blockquote>
          <cite style={{ color: 'var(--text-3)', fontSize: '0.875rem', fontStyle: 'normal', fontWeight: 600, letterSpacing: '0.05em' }}>— Aristotle</cite>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <section style={{ background: '#0F3460', padding: 'clamp(4rem,7vw,6rem) 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(13,148,136,0.25), transparent)', top: '-200px', left: '-150px' }}/>
        <div className="orb" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(201,162,39,0.12), transparent)', bottom: '-150px', right: '-100px' }}/>
        <div style={{ position: 'relative', maxWidth: '580px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#fff', margin: '0 0 1rem', lineHeight: 1.25 }}>
            Ready to understand<br />yourself better?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: '0 0 2rem', fontSize: '0.95rem' }}>
            Begin your self-discovery journey. Explore the seven dimensions that make you who you are.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ background: '#C9A227', border: '2px solid #C9A227', color: '#0F172A', padding: '0.9rem 2.25rem', borderRadius: '50px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.25s ease', letterSpacing: '0.03em', minHeight: '48px' }} onClick={() => navigate({ page: 'dimensions' })} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,162,39,0.3)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              BEGIN YOUR JOURNEY
            </button>
            <button className="btn-ghost" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }} onClick={() => navigate({ page: 'reflection' })}>
              Take a Reflection →
            </button>
          </div>
        </div>
      </section>
    </div>);
}
