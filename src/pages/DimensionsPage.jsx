import { useState, useRef } from 'react';
import { dimensions } from '../data';
const HEX_R = 192;
const CENTER = { x: 300, y: 292 };
const CONTAINER_H = 590;
function getNodePos(i, total) {
    const angle = (i * (360 / total) - 90) * Math.PI / 180;
    return { x: CENTER.x + HEX_R * Math.cos(angle), y: CENTER.y + HEX_R * Math.sin(angle) };
}
function HexOrbital({ navigate, completed }) {
    const [selected, setSelected] = useState(null);
    const [hovered, setHovered] = useState(null);
    const [panelVisible, setPanelVisible] = useState(false);
    const panelRef = useRef(null);
    const selectedDim = dimensions.find(d => d.id === selected);
    const nodePositions = dimensions.map((_, i) => getNodePos(i, dimensions.length));
    const handleSelect = (id) => {
        if (selected === id) {
            setSelected(null);
            setPanelVisible(false);
        }
        else {
            setSelected(id);
            setTimeout(() => setPanelVisible(true), 40);
            setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 120);
        }
    };
    return (<div>
      {/* Orbital */}
      <div className="dim-orbit-wrap">
        <div style={{ position: 'relative', width: '600px', maxWidth: '100%', aspectRatio: '600 / 590' }}>
          {/* SVG lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox={`0 0 600 ${CONTAINER_H}`}>
            <defs>
              {dimensions.map((d, i) => (<linearGradient key={i} id={`sp${i}`} gradientUnits="userSpaceOnUse" x1={CENTER.x} y1={CENTER.y} x2={nodePositions[i].x} y2={nodePositions[i].y}>
                  <stop offset="0%" stopColor="#0F3460" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor={d.color} stopOpacity="0.25"/>
                </linearGradient>))}
              {dimensions.map((d, i) => {
            const j = (i + 1) % dimensions.length;
            return <linearGradient key={`adj${i}`} id={`adj${i}`} gradientUnits="userSpaceOnUse" x1={nodePositions[i].x} y1={nodePositions[i].y} x2={nodePositions[j].x} y2={nodePositions[j].y}>
                  <stop offset="0%" stopColor={d.color} stopOpacity="0.2"/>
                  <stop offset="100%" stopColor={dimensions[j].color} stopOpacity="0.2"/>
                </linearGradient>;
        })}
              <filter id="glow2"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <circle cx={CENTER.x} cy={CENTER.y} r={HEX_R} fill="none" stroke="rgba(15,52,96,0.1)" strokeWidth="1.5" strokeDasharray="5 4"/>
            {dimensions.map((_, i) => {
            const j = (i + 1) % dimensions.length;
            const active = selected === dimensions[i].id || selected === dimensions[j].id;
            return <line key={i} x1={nodePositions[i].x} y1={nodePositions[i].y} x2={nodePositions[j].x} y2={nodePositions[j].y} stroke={`url(#adj${i})`} strokeWidth={active ? 1.5 : 0.8} opacity={active ? 0.7 : 0.4}/>;
        })}
            {dimensions.map((d, i) => {
            const pos = nodePositions[i];
            const active = selected === d.id || hovered === d.id;
            return <line key={i} x1={CENTER.x} y1={CENTER.y} x2={pos.x} y2={pos.y} stroke={`url(#sp${i})`} strokeWidth={active ? 2 : 1} opacity={active ? 1 : 0.4} filter={active ? 'url(#glow2)' : undefined} style={{ transition: 'opacity 0.3s, stroke-width 0.3s' }}/>;
        })}
            {selected && dimensions.filter(d => d.id === selected).map((d, _) => {
            const i = dimensions.findIndex(x => x.id === d.id);
            const pos = nodePositions[i];
            const mx = (CENTER.x + pos.x) / 2, my = (CENTER.y + pos.y) / 2;
            return <circle key="pulse" cx={mx} cy={my} r="3.5" fill={d.color} opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.6s" repeatCount="indefinite"/>
                <animate attributeName="r" values="2.5;4.5;2.5" dur="1.6s" repeatCount="indefinite"/>
              </circle>;
        })}
          </svg>

          {/* Center "You" */}
          <div style={{ position: 'absolute', left: `${(CENTER.x / 600) * 100}%`, top: `${(CENTER.y / CONTAINER_H) * 100}%`, transform: 'translate(-50%, -50%)', zIndex: 5 }}>
            <div style={{ width: '92px', height: '92px', borderRadius: '50%', background: 'var(--navy)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 8px rgba(15,52,96,0.08), 0 8px 32px rgba(15,52,96,0.2)' }}>
              <svg viewBox="0 0 36 54" width="26" height="38">
                <ellipse cx="18" cy="8" rx="6.5" ry="7.5" fill="rgba(255,255,255,0.85)"/>
                <path d="M6 17 Q18 14 30 17 L32 38 Q18 42 4 38 Z" fill="rgba(255,255,255,0.75)"/>
                <path d="M6 18 Q2 26 3 35" stroke="rgba(255,255,255,0.7)" strokeWidth="5" strokeLinecap="round" fill="none"/>
                <path d="M30 18 Q34 26 33 35" stroke="rgba(255,255,255,0.7)" strokeWidth="5" strokeLinecap="round" fill="none"/>
                <path d="M13 38 Q11 46 10 54" stroke="rgba(255,255,255,0.7)" strokeWidth="5.5" strokeLinecap="round" fill="none"/>
                <path d="M23 38 Q25 46 26 54" stroke="rgba(255,255,255,0.7)" strokeWidth="5.5" strokeLinecap="round" fill="none"/>
              </svg>
              <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#C9A227', letterSpacing: '0.08em', marginTop: '1px' }}>YOU</span>
            </div>
          </div>

          {/* Dimension nodes */}
          {dimensions.map((dim, i) => {
            const pos = getNodePos(i, dimensions.length);
            const isSel = selected === dim.id;
            const isHov = hovered === dim.id;
            const isDone = completed.has(dim.id);
            return (<div key={dim.id} onClick={() => handleSelect(dim.id)} onMouseEnter={() => setHovered(dim.id)} onMouseLeave={() => setHovered(null)} style={{ position: 'absolute', left: `${(pos.x / 600) * 100}%`, top: `${(pos.y / CONTAINER_H) * 100}%`, transform: 'translate(-50%, -50%)', zIndex: 10, cursor: 'pointer', width: '108px' }}>
                <div className="dim-node-card" style={{
                    background: isSel ? `${dim.color}14` : isHov ? `${dim.color}0a` : 'var(--surface)',
                    border: `2px solid ${isSel || isHov ? dim.color : 'var(--border)'}`,
                    padding: '0.85rem 0.55rem',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                    boxShadow: isSel ? `0 0 0 4px ${dim.color}18, 0 8px 32px ${dim.color}28` : isHov ? `0 6px 20px ${dim.color}18` : '0 2px 12px rgba(0,0,0,0.06)',
                    transform: isSel ? 'scale(1.1)' : isHov ? 'scale(1.06)' : 'scale(1)',
                    position: 'relative',
                }}>
                  {isDone && <div style={{ position: 'absolute', top: '-7px', right: '-7px', width: '18px', height: '18px', borderRadius: '50%', background: dim.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 700 }}>✓</div>}
                  <span style={{ fontSize: '1.5rem' }}>{dim.icon}</span>
                  <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em' }}>{dim.num}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: dim.color, textAlign: 'center', lineHeight: 1.2 }}>{dim.name}</span>
                  {isSel && <div style={{ position: 'absolute', bottom: '-9px', left: '50%', transform: 'translateX(-50%)', borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: `7px solid ${dim.color}` }}/>}
                </div>
              </div>);
        })}
        </div>
      </div>

      {/* Mobile grid fallback */}
      <div className="dim-mobile-grid" style={{ display: 'none', padding: '2rem 1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
        {dimensions.map(dim => (<button key={dim.id} onClick={() => handleSelect(dim.id)} style={{
                background: selected === dim.id ? `${dim.color}12` : 'var(--surface)',
                border: `2px solid ${selected === dim.id ? dim.color : 'var(--border)'}`,
                borderRadius: '14px', padding: '1rem 0.75rem', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
            }}>
            <span style={{ fontSize: '1.5rem' }}>{dim.icon}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-3)', fontWeight: 700 }}>{dim.num}</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: dim.color }}>{dim.name}</span>
          </button>))}
      </div>

      {/* Hint */}
      {!selected && (<p style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: '0.82rem', padding: '0.5rem 1rem 1.5rem', margin: 0 }}>
          Select any dimension to explore it
        </p>)}

      {/* Expanded info panel */}
      <div ref={panelRef} style={{ maxWidth: '920px', margin: '0 auto', padding: '0 1.5rem', maxHeight: selectedDim && panelVisible ? '900px' : '0', opacity: selectedDim && panelVisible ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease' }}>
        {selectedDim && (<div style={{ background: 'var(--surface)', border: `2px solid ${selectedDim.color}30`, borderRadius: '24px', overflow: 'hidden', boxShadow: `0 16px 56px ${selectedDim.color}14`, marginBottom: '2rem' }}>
            <div className="dim-expand-panel-inner">
              <div className="dim-expand-panel-img" style={{ position: 'relative', minHeight: '260px', overflow: 'hidden', background: selectedDim.colorLight }}>
                <img src={selectedDim.image} alt={selectedDim.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '260px', opacity: 0.7 }}/>
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent 50%, ${selectedDim.colorLight.replace('0.08', '0.6')})` }}/>
                <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem' }}>
                  <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: '10px', padding: '0.5rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                    <span style={{ fontSize: '1.2rem' }}>{selectedDim.icon}</span>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.82rem', fontFamily: "'Playfair Display', serif" }}>{selectedDim.num} — {selectedDim.name} Self</span>
                  </div>
                </div>
              </div>
              <div className="dim-expand-panel-content" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <div className="section-label" style={{ marginBottom: '0.4rem' }}>What It Means</div>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.85, margin: 0 }}>{selectedDim.description}</p>
                </div>
                <div style={{ background: selectedDim.colorLight, borderRadius: '12px', padding: '1rem 1.1rem', borderLeft: `4px solid ${selectedDim.color}` }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: selectedDim.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>In Everyday Life</div>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.84rem', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>{selectedDim.example}</p>
                </div>
                <div style={{ background: 'var(--surface-2)', borderRadius: '12px', padding: '1rem 1.1rem' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>Reflect</div>
                  <p style={{ color: 'var(--text-1)', fontSize: '0.84rem', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>{selectedDim.reflectiveQuestion}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.65rem 1.3rem', background: selectedDim.color, borderColor: selectedDim.color }} onClick={() => navigate({ page: 'dimensions', dimLesson: selectedDim.id })}>
                    Explore {selectedDim.name} Self →
                  </button>
                  <button className="btn-ghost" style={{ fontSize: '0.82rem' }} onClick={() => { setSelected(null); setPanelVisible(false); }}>Close ✕</button>
                </div>
              </div>
            </div>
          </div>)}
      </div>
    </div>);
}
export default function DimensionsPage({ navigate, completed, onComplete }) {
    return (<div style={{ paddingTop: '68px' }}>
      {/* Header */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,6vw,4.5rem) 2rem', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div className="section-label" style={{ marginBottom: '0.6rem' }}>The Seven Dimensions</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'var(--text-1)', margin: '0 0 1rem', lineHeight: 1.15 }}>
          Dimensions of the Self
        </h1>
        <p style={{ color: 'var(--text-2)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8, fontSize: '0.95rem' }}>
          Every person is a multidimensional being. Select any dimension below to explore what it means, see everyday examples, and begin your lesson.
        </p>
        {completed.size > 0 && (<div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.2)', borderRadius: '50px', padding: '0.5rem 1.25rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '4px' }}>{dimensions.map(d => <div key={d.id} style={{ width: '8px', height: '8px', borderRadius: '50%', background: completed.has(d.id) ? d.color : 'var(--border)' }}/>)}</div>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--teal)' }}>{completed.size} of 6 dimensions completed</span>
          </div>)}
      </section>

      {/* Interconnected visualization */}
      <section style={{ background: 'var(--surface)', paddingBottom: '1rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', paddingTop: '1.5rem' }}>
          <p style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'var(--text-3)', fontSize: '0.88rem', marginBottom: '0' }}>
            The Interconnected Self — tap any node to explore
          </p>
        </div>
        <HexOrbital navigate={navigate} completed={completed}/>
      </section>

      {/* All six cards */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,6vw,5rem) 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ marginBottom: '0.6rem' }}>Explore All Seven</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text-1)', margin: 0 }}>All Seven Dimensions at a Glance</h2>
          </div>
          <div className="dim-glance-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center' }}>
            {dimensions.map(dim => (<div key={dim.id} className="dim-card" onClick={() => navigate({ page: 'dimensions', dimLesson: dim.id })} style={{ position: 'relative' }} onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = dim.color; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = `0 14px 44px ${dim.color}18`; }} onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
                {/* Image strip */}
                <div style={{ height: '130px', overflow: 'hidden', position: 'relative', background: dim.colorLight }}>
                  <img src={dim.image} alt={dim.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }}/>
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${dim.colorLight.replace('0.08', '0.7')})` }}/>
                  {completed.has(dim.id) && <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', background: dim.color, color: '#fff', borderRadius: '50px', padding: '2px 9px', fontSize: '0.65rem', fontWeight: 700 }}>✓ Done</div>}
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>{dim.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.1em' }}>{dim.num}</div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: 'var(--text-1)', margin: 0 }}>{dim.name} Self</h3>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.8rem', lineHeight: 1.7, margin: '0 0 0.875rem' }}>{dim.shortDesc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-3)' }}>{dim.lessons.length} lessons</span>
                    <span style={{ color: dim.color, fontSize: '0.78rem', fontWeight: 700 }}>Explore →</span>
                  </div>
                </div>
              </div>))}
          </div>
        </div>
      </section>

      {/* CTA to Self-Reflection */}
      <section style={{ background: 'var(--surface)', padding: 'clamp(2.5rem,5vw,4rem) 2rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: '0.6rem' }}>Self-Reflection</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem,3vw,2rem)', color: 'var(--text-1)', margin: '0 0 0.875rem' }}>Ready to reflect?</h2>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '1.75rem' }}>Discover your strongest dimension and explore personalised reflection activities for each area of the self.</p>
          <button className="btn-primary" onClick={() => navigate({ page: 'reflection' })}>Go to Self-Reflection →</button>
        </div>
      </section>
    </div>);
}
