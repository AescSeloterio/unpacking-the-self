import { useState, useEffect } from 'react';
import { dimensions } from '../data';
export default function DimensionLessonPage({ dimId, navigate, completed, onComplete }) {
    const dim = dimensions.find(d => d.id === dimId);
    const dimIdx = dimensions.findIndex(d => d.id === dimId);
    const prev = dimensions[dimIdx - 1];
    const next = dimensions[dimIdx + 1];
    const [activeLesson, setActiveLesson] = useState(0);
    const [checked, setChecked] = useState(new Set());
    const [visible, setVisible] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    useEffect(() => { const t = setTimeout(() => setVisible(true), 30); return () => clearTimeout(t); }, [dimId]);
    const toggleCheck = (i) => {
        setChecked(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
    };
    return (<div style={{ paddingTop: '68px', minHeight: '100vh', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.45s ease, transform 0.45s ease' }}>

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '380px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', background: dim.colorLight }}>
        <img src={dim.image} alt={dim.name} onLoad={() => setImgLoaded(true)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: imgLoaded ? 0.4 : 0, transition: 'opacity 0.8s ease' }}/>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${dim.colorLight.replace('0.08', '0.4')} 0%, rgba(250,250,248,0.97) 100%)` }}/>
        <div style={{ maxWidth: '940px', margin: '0 auto', width: '100%', padding: '1.5rem 2rem 2.5rem', position: 'relative' }}>
          <button className="btn-ghost" style={{ marginBottom: '1.5rem', fontSize: '0.8rem' }} onClick={() => navigate({ page: 'dimensions' })}>
            ← Back to All Dimensions
          </button>
          {/* Progress strip */}
          <div className="lesson-progress-bar" style={{ display: 'flex', gap: '5px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {dimensions.map(d => (<button key={d.id} onClick={() => navigate({ page: 'dimensions', dimLesson: d.id })} title={`${d.name} Self`} style={{ flex: 1, minWidth: '28px', height: '5px', borderRadius: '3px', border: 'none', cursor: 'pointer', background: completed.has(d.id) ? d.color : d.id === dimId ? `${d.color}70` : `${d.color}18`, transition: 'all 0.3s' }}/>))}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `linear-gradient(135deg, ${dim.color}30, ${dim.color}60)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0, border: `2px solid ${dim.color}30` }}>{dim.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                <span className="section-number">Dimension {dim.num} of 07</span>
                {completed.has(dimId) && <span style={{ background: `${dim.color}18`, color: dim.color, borderRadius: '50px', padding: '1px 9px', fontSize: '0.68rem', fontWeight: 700, border: `1px solid ${dim.color}30` }}>✓ Completed</span>}
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,4.5vw,2.8rem)', color: 'var(--text-1)', margin: '0 0 0.3rem', lineHeight: 1.15 }}>
                The {dim.name} Self
              </h1>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: dim.color, margin: 0, fontSize: '1rem' }}>"{dim.tagline}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT MEANS */}
      <section style={{ background: 'var(--surface)', padding: 'clamp(2.5rem,5vw,3.5rem) 2rem' }}>
        <div style={{ maxWidth: '940px', margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: '0.5rem' }}>What It Means</div>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.9, fontSize: '0.95rem', maxWidth: '680px', marginBottom: '2rem' }}>{dim.description}</p>

          {/* Lesson tabs */}
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: 'var(--text-1)', margin: '0 0 1rem' }}>Core Lessons</h3>
          <div className="dim-lesson-tab-strip" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '4px', flexWrap: 'wrap' }}>
            {dim.lessons.map((l, i) => (<button key={i} onClick={() => setActiveLesson(i)} style={{ padding: '0.55rem 1.1rem', borderRadius: '50px', border: `1.5px solid ${i === activeLesson ? dim.color : 'var(--border)'}`, background: i === activeLesson ? `${dim.color}12` : 'transparent', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: i === activeLesson ? dim.color : 'var(--text-2)', whiteSpace: 'nowrap', transition: 'all 0.22s ease', fontFamily: "'Inter', sans-serif" }}>
                {l.title}
              </button>))}
          </div>
          <div key={activeLesson} style={{ background: 'var(--bg)', border: `1px solid ${dim.color}25`, borderRadius: 'var(--radius-lg)', padding: '1.75rem', animation: 'fadeIn 0.3s ease', borderLeft: `4px solid ${dim.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.875rem' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: dim.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>{activeLesson + 1}</div>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--text-1)', margin: 0 }}>{dim.lessons[activeLesson].title}</h4>
            </div>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.9, fontSize: '0.9rem', margin: 0 }}>{dim.lessons[activeLesson].body}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', gap: '1rem' }}>
            <button className="btn-ghost" onClick={() => setActiveLesson(i => Math.max(0, i - 1))} disabled={activeLesson === 0} style={{ opacity: activeLesson === 0 ? 0.35 : 1, fontSize: '0.82rem' }}>← Previous</button>
            <button className="btn-ghost" onClick={() => setActiveLesson(i => Math.min(dim.lessons.length - 1, i + 1))} disabled={activeLesson === dim.lessons.length - 1} style={{ opacity: activeLesson === dim.lessons.length - 1 ? 0.35 : 1, fontSize: '0.82rem', color: dim.color, borderColor: `${dim.color}50` }}>Next →</button>
          </div>
        </div>
      </section>

      {/* IN EVERYDAY LIFE */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(2.5rem,5vw,3.5rem) 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '940px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>In Everyday Life</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem,3vw,1.9rem)', color: 'var(--text-1)', margin: '0 0 1rem', lineHeight: 1.35 }}>How This Shows Up For You</h2>
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border)', borderLeft: `4px solid ${dim.color}` }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: dim.color, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Example</div>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>{dim.example}</p>
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
            <div style={{ fontSize: '3rem', color: dim.color, fontFamily: "'Playfair Display', serif", lineHeight: 0.9, marginBottom: '0.75rem' }}>"</div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: 'var(--text-1)', lineHeight: 1.6, margin: '0 0 0.875rem', fontStyle: 'italic' }}>{dim.quote.text}</p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', fontWeight: 600 }}>— {dim.quote.author}</div>
          </div>
        </div>
      </section>

      {/* REFLECT */}
      <section style={{ background: 'var(--surface)', padding: 'clamp(2.5rem,5vw,3.5rem) 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '940px', margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: '0.5rem' }}>Reflect</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem,3vw,1.9rem)', color: 'var(--text-1)', margin: '0 0 1.5rem', lineHeight: 1.35 }}>Your Reflection Prompt</h2>
          <div style={{ background: 'var(--bg)', border: `2px solid ${dim.color}25`, borderRadius: 'var(--radius-xl)', padding: '2rem 2.25rem', maxWidth: '620px' }}>
            <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🪞</div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.05rem,2vw,1.2rem)', color: 'var(--text-1)', lineHeight: 1.65, margin: '0 0 1.25rem', fontStyle: 'italic', fontWeight: 600 }}>
              {dim.reflectiveQuestion}
            </p>
            <p style={{ color: 'var(--text-3)', fontSize: '0.8rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>Take a moment with this question. Self-discovery begins with honest curiosity, not judgment.</p>
            <button className="btn-teal" style={{ fontSize: '0.85rem', padding: '0.7rem 1.5rem' }} onClick={() => navigate({ page: 'reflection' })}>
              Go to Full Reflection Activity →
            </button>
          </div>
        </div>
      </section>

      {/* Practices */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(2.5rem,5vw,3.5rem) 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '940px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-label" style={{ marginBottom: '0.3rem' }}>Practice</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'var(--text-1)', margin: 0 }}>Your Action Checklist</h2>
            </div>
            <div style={{ background: `${dim.color}12`, border: `1px solid ${dim.color}25`, borderRadius: '50px', padding: '0.35rem 1rem', fontSize: '0.78rem', fontWeight: 700, color: dim.color }}>{checked.size} / {dim.practices.length} done</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.75rem' }}>
            {dim.practices.map((p, i) => (<button key={i} onClick={() => toggleCheck(i)} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: checked.has(i) ? `${dim.color}08` : 'var(--surface)', border: `1.5px solid ${checked.has(i) ? dim.color : 'var(--border)'}`, borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.22s ease' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, marginTop: '1px', border: `2px solid ${checked.has(i) ? dim.color : 'var(--border)'}`, background: checked.has(i) ? dim.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.22s', color: '#fff', fontSize: '0.65rem', fontWeight: 700 }}>
                  {checked.has(i) ? '✓' : ''}
                </div>
                <span style={{ fontSize: '0.875rem', color: checked.has(i) ? 'var(--text-1)' : 'var(--text-2)', lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>{p}</span>
              </button>))}
          </div>
          {checked.size === dim.practices.length && !completed.has(dimId) && (<div style={{ textAlign: 'center', animation: 'fadeInUp 0.5s ease' }}>
              <button className="btn-primary" onClick={() => onComplete(dimId)} style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>✨ Mark Lesson Complete</button>
            </div>)}
          {completed.has(dimId) && (<div style={{ textAlign: 'center', background: `${dim.color}08`, border: `1px solid ${dim.color}25`, borderRadius: 'var(--radius-lg)', padding: '1.5rem', animation: 'fadeInUp 0.5s ease' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: 'var(--text-1)', fontWeight: 600 }}>Lesson Complete</div>
              <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', margin: '0.4rem 0 0' }}>You have completed the {dim.name} Self dimension.</p>
            </div>)}
        </div>
      </section>

      {/* PREVIOUS / BACK / NEXT */}
      <section style={{ background: 'var(--surface)', padding: '1.5rem 1.25rem', borderTop: '1px solid var(--border)' }}>
        <div className="lesson-nav" style={{ maxWidth: '940px', margin: '0 auto' }}>
          <div className="lesson-nav-prev">
            {prev && (<button onClick={() => navigate({ page: 'dimensions', dimLesson: prev.id })} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', cursor: 'pointer', transition: 'all 0.25s ease', minHeight: '44px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = dim.color; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}>
                <span style={{ fontSize: '1rem' }}>{prev.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.06em' }}>← Previous</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-1)', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{prev.name}</div>
                </div>
              </button>)}
          </div>
          <button className="btn-ghost lesson-nav-back" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }} onClick={() => navigate({ page: 'dimensions' })}>
            All Dimensions
          </button>
          <div className="lesson-nav-next">
            {next && (<button onClick={() => navigate({ page: 'dimensions', dimLesson: next.id })} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', cursor: 'pointer', transition: 'all 0.25s ease', minHeight: '44px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = dim.color; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.06em' }}>Next →</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-1)', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{next.name}</div>
                </div>
                <span style={{ fontSize: '1rem' }}>{next.icon}</span>
              </button>)}
          </div>
        </div>
      </section>
    </div>);
}
