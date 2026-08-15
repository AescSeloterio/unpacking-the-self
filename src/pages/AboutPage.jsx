import { useState } from 'react';
import { dimensions } from '../data';
function SelfInfographic() {
    const layers = [
        { r: 52, color: '#0F3460', label: 'Core Self', sub: 'Values · Purpose · Identity' },
        { r: 100, color: '#0D9488', label: 'Inner World', sub: 'Thoughts · Feelings · Beliefs' },
        { r: 148, color: '#7C3AED', label: 'Behavioral Self', sub: 'Actions · Habits · Choices' },
        { r: 196, color: '#D97706', label: 'Relational Self', sub: 'Relationships · Culture · Roles' },
        { r: 240, color: '#C9A227', label: 'Contextual Self', sub: 'Environment · Society · Technology' },
    ];
    const cx = 285, cy = 285;
    const n = dimensions.length;
    return (<div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
      {/* Diagram */}
      <svg viewBox="0 0 570 570" style={{ width: '100%', maxWidth: '360px', height: 'auto', flexShrink: 0 }}>
        <defs>
          <radialGradient id="cGrad2" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#0F3460" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#0D9488" stopOpacity="0.8"/>
          </radialGradient>
        </defs>

        {/* Rings — outermost to innermost for correct fill layering */}
        {[...layers].reverse().map((layer, i) => (<circle key={i} cx={cx} cy={cy} r={layer.r} fill={`${layers[layers.length - 1 - i].color}0d`} stroke={layers[layers.length - 1 - i].color} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.75"/>))}

        {/* Spoke lines to each dimension node */}
        {dimensions.map((_, i) => {
            const angle = (i * (360 / n) - 90) * Math.PI / 180;
            return <line key={i} x1={cx} y1={cy} x2={cx + layers[4].r * Math.cos(angle)} y2={cy + layers[4].r * Math.sin(angle)} stroke="rgba(15,52,96,0.06)" strokeWidth="1"/>;
        })}

        {/* Dimension icon nodes on outermost ring */}
        {dimensions.map((dim, i) => {
            const angle = (i * (360 / n) - 90) * Math.PI / 180;
            const x = cx + layers[4].r * Math.cos(angle);
            const y = cy + layers[4].r * Math.sin(angle);
            return (<g key={dim.id}>
              <circle cx={x} cy={y} r="22" fill={dim.colorLight.replace('0.08', '0.18')} stroke={dim.color} strokeWidth="1.5"/>
              <text x={x} y={y + 7} textAnchor="middle" fontSize="15">{dim.icon}</text>
            </g>);
        })}

        {/* Center circle */}
        <circle cx={cx} cy={cy} r={layers[0].r} fill="url(#cGrad2)"/>
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.65)" fontFamily="Inter, sans-serif" letterSpacing="0.1em">CORE</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff" fontFamily="Playfair Display, serif">Self</text>
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '200px' }}>
        {layers.map((l, i) => (<div key={l.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: l.color, flexShrink: 0, marginTop: '2px', border: '2px solid white', boxShadow: `0 0 0 1px ${l.color}` }}/>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-1)', lineHeight: 1.3 }}>{l.label}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', lineHeight: 1.4, marginTop: '1px' }}>{l.sub}</div>
            </div>
          </div>))}
        <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Dimensions</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {dimensions.map(d => (<div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '0.8rem' }}>{d.icon}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-2)', fontWeight: 600 }}>{d.name}</span>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
export default function AboutPage({ navigate }) {
    const [expandedConcept, setExpandedConcept] = useState(null);
    const concepts = [
        { title: 'Self-Concept', subtitle: 'The story you tell about yourself', desc: 'Self-concept, strictly defined, is the totality of our beliefs, preferences, opinions and attitudes organized in a systematic manner, towards our personal existence. Simply put, it is how we think of ourselves and how we should think, behave and act out our various life roles.', icon: '🧩', color: 'var(--navy)' },
        { title: 'Self-Efficacy', subtitle: 'Belief in your own capability', desc: 'Self-efficacy, a concept introduced by psychologist Albert Bandura, refers to an individual’s belief in their capacity to execute behaviors necessary to produce specific performance outcomes. It’s the confidence in one’s ability to influence events and control over one’s environment.', icon: '💪', color: 'var(--teal)' },
        { title: 'Self-Compassion', subtitle: 'Kindness toward your own imperfection', desc: 'Researcher Kristin Neff shows that treating yourself with kindness — especially in moments of failure — is a more sustainable foundation for well-being than self-criticism or unrealistic self-esteem.', icon: '❤️', color: '#DC2626' },
        { title: 'Identity Development', subtitle: 'The ongoing project of becoming', desc: 'Erik Erikson described identity formation as the central developmental task of adolescence — but identity continues to evolve throughout life as we encounter new roles, relationships, and discoveries.', icon: '🌿', color: '#D97706' },
        { title: 'Authentic Self', subtitle: 'Living aligned with who you truly are', desc: "Authenticity means acting in consistent alignment with your genuine values, feelings, and character — rather than performing a role for others' approval or social acceptance.", icon: '🔑', color: '#7C3AED' },
        { title: 'Growth Mindset', subtitle: 'The self as dynamic, not fixed', desc: "Carol Dweck's landmark research shows that people who believe their qualities can be developed through effort — rather than fixed at birth — achieve more and cope better with challenge.", icon: '🌱', color: '#059669' },
    ];
    return (<div style={{ paddingTop: '68px' }}>
      {/* Hero */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3.5rem,6vw,5rem) 2rem', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div className="section-label" style={{ marginBottom: '0.6rem' }}>Understanding Identity</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: 'var(--text-1)', margin: '0 0 1.25rem', lineHeight: 1.15 }}>About the Self</h1>
        <p style={{ color: 'var(--text-2)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.8, fontSize: '1rem' }}>
          The "self" is one of psychology's most central and philosophy's oldest concepts — the "I" that thinks, feels, chooses, and grows.
        </p>
      </section>

      {/* What is the Self */}
      <section style={{ background: 'var(--surface)', padding: 'clamp(3rem,6vw,5rem) 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.6rem' }}>Definition</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: 'var(--text-1)', margin: '0 0 1.5rem', lineHeight: 1.3 }}>What Is the Self?</h2>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.85, marginBottom: '1rem', fontSize: '0.925rem' }}>
              The <strong style={{ color: 'var(--text-1)' }}>self</strong> is the totality of who you are — your thoughts, feelings, memories, values, experiences, and the stories you tell about yourself. It is both stable and fluid: grounded in enduring traits yet continuously shaped by experience, relationship, and reflection.
            </p>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: '0.925rem' }}>
              Psychologists distinguish between the <em>experiencing self</em> (who you are in the present moment) and the <em>narrative self</em> (the story you construct about who you are over time). Both matter to a complete understanding of identity.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {[
            { label: 'Philosophical', text: 'The self as subject — the "I" that has experiences, makes choices, and seeks meaning.', color: 'var(--navy)' },
            { label: 'Psychological', text: 'The self as a dynamic system of traits, schemas, memories, and emotional patterns.', color: 'var(--teal)' },
            { label: 'Sociological', text: 'The self as constructed in relationship — shaped by culture, language, and social roles.', color: '#D97706' },
            { label: 'Neuroscientific', text: 'The self as an emergent property of brain processes, continuously revised and updated.', color: '#7C3AED' },
        ].map(item => (<div key={item.label} style={{ background: 'var(--bg)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', borderLeft: `3px solid ${item.color}`, transition: 'transform 0.22s ease' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(5px)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; }}>
                <div style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: item.color, marginBottom: '0.3rem' }}>{item.label}</div>
                <div style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.text}</div>
              </div>))}
          </div>
        </div>
      </section>

      {/* Infographic */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,6vw,5rem) 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <SelfInfographic />
          <div>
            <div className="section-label" style={{ marginBottom: '0.6rem' }}>Visual Framework</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: 'var(--text-1)', margin: '0 0 1.5rem', lineHeight: 1.3 }}>The Layered Architecture of the Self</h2>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: '0.925rem', marginBottom: '1.5rem' }}>
              The self is not a single thing — it is a nested system of layers, from your innermost core values to the broadest social and digital contexts that shape who you can become.
            </p>
            {[
            { n: 1, label: 'Core Self', desc: 'Your deepest values, sense of identity, and fundamental purpose.', color: '#0F3460' },
            { n: 2, label: 'Inner World', desc: 'Thoughts, emotions, beliefs, memories, and internal dialogue.', color: '#0D9488' },
            { n: 3, label: 'Behavioral Self', desc: 'Your habits, actions, choices, and observable patterns.', color: '#7C3AED' },
            { n: 4, label: 'Relational Self', desc: 'How you show up in relationships, culture, and social roles.', color: '#D97706' },
            { n: 5, label: 'Contextual Self', desc: 'Environment, technology, history, and culture that shape you.', color: '#C9A227' },
        ].map(l => (<div key={l.n} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '0.75rem', padding: '0.875rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', transition: 'all 0.22s ease' }} onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateX(4px)'; el.style.borderColor = l.color + '40'; }} onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateX(0)'; el.style.borderColor = 'var(--border)'; }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: l.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>{l.n}</div>
                <div>
                  <div style={{ fontWeight: 700, color: l.color, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{l.label}</div>
                  <div style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.6 }}>{l.desc}</div>
                </div>
              </div>))}
          </div>
        </div>
      </section>

      {/* Why self-understanding */}
      <section style={{ background: 'var(--surface)', padding: 'clamp(3rem,6vw,5rem) 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ marginBottom: '0.6rem' }}>Importance</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: 'var(--text-1)', margin: 0 }}>Why Self-Understanding Matters</h2>
          </div>
          <div className="about-why-grid">
            {[
            { icon: '🎯', title: 'Better Decisions', desc: 'Self-awareness reduces impulsive choices and aligns your actions with what you truly value.', color: 'var(--navy)' },
            { icon: '💬', title: 'Richer Relationships', desc: 'Knowing yourself allows you to show up authentically and communicate your real needs.', color: 'var(--teal)' },
            { icon: '🧭', title: 'Sense of Purpose', desc: "Understanding your values and passions helps you navigate life's transitions with direction.", color: '#D97706' },
            { icon: '🛡️', title: 'Emotional Resilience', desc: 'Self-knowledge is the foundation of emotional regulation and healthy coping.', color: '#DC2626' },
            { icon: '🔓', title: 'Freedom from Limiting Beliefs', desc: 'Unpacking the self reveals hidden narratives that constrain your potential.', color: '#7C3AED' },
            { icon: '✨', title: 'Integrity', desc: 'When your actions align with your values, you experience the satisfaction of authentic living.', color: '#059669' },
        ].map(c => (<div key={c.title} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', transition: 'all 0.3s ease' }} onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 10px 32px rgba(0,0,0,0.07)'; el.style.borderColor = 'rgba(15,52,96,0.15)'; }} onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; el.style.borderColor = 'var(--border)'; }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{c.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: 'var(--text-1)', margin: '0 0 0.5rem' }}>{c.title}</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '0.84rem', lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
                <div style={{ marginTop: '1rem', height: '2px', width: '28px', background: c.color, borderRadius: '2px' }}/>
              </div>))}
          </div>
        </div>
      </section>

      {/* Key Concepts */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,6vw,5rem) 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ marginBottom: '0.6rem' }}>Frameworks</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: 'var(--text-1)', margin: 0 }}>Key Concepts of Unpacking the Self</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', alignItems: 'start' }}>
            {concepts.map(c => (<div key={c.title} style={{ background: 'var(--surface)', border: `1px solid ${expandedConcept === c.title ? 'rgba(15,52,96,0.2)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: expandedConcept === c.title ? '0 8px 32px rgba(15,52,96,0.08)' : 'none' }} onClick={() => setExpandedConcept(expandedConcept === c.title ? null : c.title)}>
                <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0, border: '1px solid var(--border)' }}>{c.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: 'var(--text-1)' }}>{c.title}</div>
                    <div style={{ fontSize: '0.73rem', color: 'var(--teal)', fontWeight: 600 }}>{c.subtitle}</div>
                  </div>
                  <div style={{ color: 'var(--text-3)', fontSize: '1rem', transition: 'transform 0.25s', transform: expandedConcept === c.title ? 'rotate(180deg)' : 'rotate(0)' }}>▾</div>
                </div>
                <div style={{ maxHeight: expandedConcept === c.title ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease', padding: expandedConcept === c.title ? '0 1.5rem 1.5rem' : '0 1.5rem' }}>
                  <div style={{ height: '1px', background: 'var(--border)', marginBottom: '1rem' }}/>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.75, margin: 0 }}>{c.desc}</p>
                </div>
              </div>))}
          </div>
        </div>
      </section>

      {/* Think About It */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(3rem,6vw,5rem) 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', color: '#C9A227', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Think About It</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#fff', margin: '0 0 1rem', fontStyle: 'italic', lineHeight: 1.4 }}>
            "How would you describe yourself<br />beyond your name?"
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: '0 0 2rem', fontSize: '0.9rem' }}>
            Take a moment. Think about what makes you, <em>you</em> — beyond labels, roles, and what others expect.
          </p>
          <button style={{ background: '#C9A227', border: '2px solid #C9A227', color: '#0F172A', padding: '0.9rem 2.25rem', borderRadius: '50px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.25s ease', minHeight: '48px', letterSpacing: '0.03em' }} onClick={() => navigate({ page: 'reflection' })} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,162,39,0.35)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            REFLECT →
          </button>
        </div>
      </section>
    </div>);
}
