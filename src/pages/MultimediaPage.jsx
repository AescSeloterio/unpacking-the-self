import { useState } from 'react';
import { dimensions, IMG } from '../data';
export default function MultimediaPage({ navigate }) {
    const [playing, setPlaying] = useState(false);
    return (<div style={{ paddingTop: '68px' }}>
      {/* Header */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,6vw,4.5rem) 2rem', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div className="section-label" style={{ marginBottom: '0.6rem' }}>Watch & Learn</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.2rem)', color: 'var(--text-1)', margin: '0 0 0.875rem', lineHeight: 1.15 }}>
          MULTIMEDIA RESOURCES
        </h1>
        <p style={{ color: 'var(--text-2)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8, fontSize: '0.95rem' }}>
          Deepen your understanding through educational videos, dimension galleries, and curated reading materials.
        </p>
      </section>

      {/* Featured Video */}
      <section style={{ background: 'var(--surface)', padding: 'clamp(2.5rem,5vw,4rem) clamp(1.25rem,4vw,2rem)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: '0.5rem' }}>Featured Video</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: 'var(--text-1)', margin: '0 0 1.75rem' }}>Self-Concept: A Visual Journey</h2>
          <div className="video-section-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            {/* Video card */}
            <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 12px 40px rgba(0,0,0,0.08)', cursor: 'pointer', background: 'var(--navy)' }} onClick={() => setPlaying(!playing)}>
              {!playing ? (<div className="video-thumb-container" style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                  <img src={IMG.video} alt="Educational video thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}/>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(15,52,96,0.65))' }}/>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.875rem' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '2px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s ease' }}>
                      <span style={{ fontSize: '1.5rem', marginLeft: '4px', color: '#fff' }}>▶</span>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', borderRadius: '50px', padding: '4px 14px' }}>
                      <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 600 }}>▷ 10 min · Self-Concept</span>
                    </div>
                  </div>
                </div>) : (<iframe width="100%" height="260" src="https://www.youtube.com/embed/Mt0GzSXIbLc?autoplay=1" title="The Power of Vulnerability — Brené Brown" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ border: 'none', display: 'block' }}/>)}
              <div style={{ padding: '0.875rem 1.25rem', background: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ height: '3px', flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: playing ? '15%' : '0%', background: '#C9A227', borderRadius: '2px', transition: 'width 0.3s' }}/>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>14:00</span>
              </div>
            </div>

            {/* Info */}
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {[{ icon: '🎓', l: 'Educational' }, { icon: '⏱', l: '10 Minutes' }, { icon: '🔬', l: 'Research-Based' }].map(t => (<div key={t.l} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '50px', padding: '4px 12px' }}>
                    <span style={{ fontSize: '0.85rem' }}>{t.icon}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-2)', fontWeight: 600 }}>{t.l}</span>
                  </div>))}
              </div>
              <p style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Explore how psychologists, philosophers, and neuroscientists understand the layered architecture of human identity — and what self-knowledge truly means in the modern age.
              </p>
              {[
            { icon: '🧭', text: 'How psychologists define and measure the self across traditions' },
            { icon: '🔄', text: 'Why the self is dynamic, not fixed — and how it changes through experience' },
            { icon: '🌐', text: 'The seven dimensions framework mapped onto modern psychology' },
            { icon: '✏️', text: 'Guided reflection exercises to begin unpacking your own identity' },
        ].map((item, i) => (<div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '0.65rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.65 }}>{item.text}</span>
                </div>))}
            </div>
          </div>
        </div>
      </section>

      {/* Dimension Image Gallery */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(2.5rem,5vw,4rem) clamp(1.25rem,4vw,2rem)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>Dimension Gallery</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', color: 'var(--text-1)', margin: '0 0 0.5rem' }}>Explore by Dimension</h2>
            <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.75, maxWidth: '540px' }}>
              Each dimension of the self has a distinct visual identity. Click any card to explore its lessons.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center' }}>
            {dimensions.map(d => (<button key={d.id} onClick={() => navigate({ page: 'dimensions', dimLesson: d.id })} style={{ flex: '0 0 calc(33.33% - 0.84rem)', minWidth: '260px', maxWidth: '340px', background: 'var(--surface)', border: `1px solid ${d.color}20`, borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer', textAlign: 'left', transition: 'all 0.28s ease', display: 'flex', flexDirection: 'column' }} onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 12px 36px ${d.color}18`; el.style.borderColor = `${d.color}50`; }} onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; el.style.borderColor = `${d.color}20`; }}>
                <div style={{ height: '160px', position: 'relative', overflow: 'hidden', background: d.colorLight, flexShrink: 0 }}>
                  <img src={d.image} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, display: 'block' }}/>
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${d.colorLight.replace('0.08', '0.8')})` }}/>
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', borderRadius: '8px', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.9rem' }}>{d.icon}</span>
                    <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>{d.num}</span>
                  </div>
                </div>
                <div style={{ padding: '1rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: 'var(--text-1)', margin: 0 }}>{d.name} Self</h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.8rem', lineHeight: 1.65, margin: 0, flex: 1 }}>{d.shortDesc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '0.5rem' }}>
                    <div style={{ height: '2px', width: '20px', background: d.color, borderRadius: '2px' }}/>
                    <span style={{ fontSize: '0.72rem', color: d.color, fontWeight: 700 }}>{d.lessons.length} Lessons →</span>
                  </div>
                </div>
              </button>))}
          </div>
        </div>
      </section>

    </div>);
}
