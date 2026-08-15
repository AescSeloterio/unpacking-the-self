import { useState } from 'react';
export default function ReferencesPage() {
    const [activeTab, setActiveTab] = useState('course');
    const refs = {
        course: [
            { title: 'GE 7: Understanding the Self', author: 'GE 7 - Core Subject · ACT & BSCS', year: '1st Sem 2026', desc: 'Foundational module exploring the biological, psychological, and socio-cultural dimensions of identity. Serves as the primary reference for defining self-concept and personal development', placeholder: false },
            { title: 'In-Class Lecture & Discussion Notes', author: 'Vernel Vergel Otara Sagarino · Santo Niño Mactan College', year: '2026', desc: 'Key insights, active learning notes, and instructor-guided discussions on psychological theories, self-efficacy, and identity formation covered throughout the semester', placeholder: false },
            { title: 'Self-Reflection & Experiential Learning', author: 'GE 7 · Activity Guide', year: '2026', desc: 'Guided self-reflection prompts, introspective exercises, and personal assessment activities designed to apply theoretical models of the self to real-world experiences', placeholder: false },
        ],
        books: [
            { title: "Man's Search for Meaning", author: 'Viktor E. Frankl', year: '1946', desc: 'A foundational text on the human search for purpose, identity, and meaning — even in extreme conditions. One of the most influential books on the psychology of the self.', placeholder: false },
            { title: 'Emotional Intelligence', author: 'Daniel Goleman', year: '1995', desc: 'The landmark work defining emotional intelligence and its role in personal and social success. Directly relevant to the Emotional Self.', placeholder: false },
            { title: 'The Body Keeps the Score', author: 'Bessel van der Kolk', year: '2014', desc: 'Examines how identity and the body are shaped by experience. Highly relevant to both the Physical Self and Emotional Self dimensions.', placeholder: false },
            { title: 'Daring Greatly', author: 'Brené Brown', year: '2012', desc: 'Explores vulnerability, belonging, and authentic identity. Directly relevant to the Social Self and Emotional Self.', placeholder: false },
            { title: 'The Physical Self-Perception Profile: Development and Preliminary Validation', author: 'Kenneth R. Fox & Charles B. Corbin', year: '1989', desc: 'A foundational study on physical self-perception that developed and evaluated the Physical Self-Perception Profile, examining areas such as physical competence, strength, conditioning, and physical self-worth.', placeholder: false },
            { title: 'The Digital Self: Through the Looking Glass of Telecopresent Others', author: 'Shanyang Zhao', year: '2005', desc: 'A study examining how interactions and relationships through the Internet can influence self-formation and contribute to the development of a distinct digital self.', placeholder: false },
            { title: 'Bio-Psycho-Social Factors Affecting Sexual Self-Concept: A Systematic Review', author: 'Potki et al.', year: '2017', desc: 'A systematic review examining biological, psychological, and social factors that influence sexual self-concept.', placeholder: false },
        ],
        websites: [
            { title: 'Greater Good Science Center', author: 'University of California, Berkeley', year: 'greatergood.berkeley.edu', desc: 'Research-based insights on well-being, empathy, and the science of a meaningful life. An excellent source for evidence-based content about the self.', placeholder: false },
            { title: 'Positive Psychology Program', author: 'PositivePsychology.com', year: 'positivepsychology.com', desc: 'Evidence-based tools, exercises, and resources for understanding and developing the self across multiple dimensions.', placeholder: false },
            { title: 'TED Talks: Identity & Self', author: 'TED Conferences', year: 'ted.com', desc: 'Curated talks on identity, consciousness, emotional intelligence, and human potential. Use specific talk titles and speakers in your references.', placeholder: false },
            { title: 'APA Dictionary of Psychology', author: 'American Psychological Association', year: 'dictionary.apa.org', desc: "An authoritative psychology reference providing definitions and explanations of concepts related to the self, including social self, intellect, spiritual self, and emotional insight, supporting the understanding of identity, self-concept, and personal development.", placeholder: false },
        ],
        multimedia: [
            { title: 'Self-Concept', author: 'Professor Rockey', year: '2022', desc: 'An educational breakdown of self-concept vs. self-esteem, exploring how biology, reflected appraisal, social comparison, and culture shape our self-identity. (https://www.youtube.com/watch?v=Mt0GzSXIbLc)', placeholder: false },
            { title: 'The Power of Vulnerability', author: 'Brené Brown · TED Talks', year: '2010', desc: 'A landmark talk examining how vulnerability, courage, and self-compassion shape human connection and personal identity. (https://www.ted.com/talks/brene_brown_the_power_of_vulnerability)', placeholder: false },
        ],
    };
    const tabColors = { course: 'var(--navy)', books: 'var(--teal)', websites: '#D97706', multimedia: '#7C3AED' };
    const tabs = [
        { key: 'course', label: '📚 Course Materials', count: refs.course.length },
        { key: 'books', label: '📖 Books & Articles', count: refs.books.length },
        { key: 'websites', label: '🌐 Websites', count: refs.websites.length },
        { key: 'multimedia', label: '🎬 Multimedia', count: refs.multimedia.length },
    ];
    return (<div style={{ paddingTop: '68px' }}>
      <section style={{ background: 'var(--bg)', padding: 'clamp(3.5rem,6vw,5rem) 2rem', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div className="section-label" style={{ marginBottom: '0.6rem' }}>Sources</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'var(--text-1)', margin: '0 0 1rem', lineHeight: 1.15 }}>References</h1>
        <p style={{ color: 'var(--text-2)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8, fontSize: '0.95rem' }}>
          Sources and resources used in this project. 
        </p>
      </section>

      {/* Tabs */}
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: '68px', zIndex: 50 }}>
        <div className="ref-tab-strip" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', display: 'flex', gap: '0.25rem' }}>
          {tabs.map(t => (<button key={t.key} onClick={() => setActiveTab(t.key)} style={{ padding: '1rem 1.25rem', border: 'none', cursor: 'pointer', background: 'none', fontFamily: "'Inter', sans-serif", fontSize: '0.855rem', fontWeight: 600, color: activeTab === t.key ? tabColors[t.key] : 'var(--text-2)', borderBottom: `2.5px solid ${activeTab === t.key ? tabColors[t.key] : 'transparent'}`, transition: 'all 0.22s', whiteSpace: 'nowrap' }}>
              {t.label}
              <span style={{ marginLeft: '6px', background: activeTab === t.key ? `${tabColors[t.key]}18` : 'var(--bg)', color: activeTab === t.key ? tabColors[t.key] : 'var(--text-3)', borderRadius: '50px', padding: '1px 7px', fontSize: '0.72rem' }}>{t.count}</span>
            </button>))}
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(2.5rem,5vw,4rem) 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div key={activeTab} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', animation: 'fadeIn 0.35s ease' }}>
            {refs[activeTab].map((ref, i) => (<div key={i} style={{ background: 'var(--surface)', border: `1px solid ${ref.placeholder ? 'rgba(201,162,39,0.3)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', padding: '1.5rem', borderTop: `4px solid ${ref.placeholder ? '#D97706' : tabColors[activeTab]}`, transition: 'all 0.25s ease' }} onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 10px 32px rgba(0,0,0,0.07)'; }} onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '0.75rem' }}>
                  <span style={{ background: ref.placeholder ? 'rgba(201,162,39,0.1)' : `${tabColors[activeTab]}12`, color: ref.placeholder ? '#D97706' : tabColors[activeTab], borderRadius: '50px', padding: '2px 9px', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {ref.placeholder ? 'Placeholder' : 'Source'}
                  </span>
                  <span style={{ color: 'var(--text-3)', fontSize: '0.78rem', flexShrink: 0 }}>{ref.year}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: 'var(--text-1)', margin: '0 0 0.35rem', lineHeight: 1.35 }}>{ref.title}</h3>
                <div style={{ color: tabColors[activeTab], fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.75rem' }}>{ref.author}</div>
                <p
                  style={{
                    color: 'var(--text-2)',
                    fontSize: '0.84rem',
                    lineHeight: 1.7,
                    margin: 0,
                    overflowWrap: 'anywhere',
                    wordBreak: 'break-word'
                  }}
                >
                  {ref.desc}
                </p>
              </div>))}
          </div>
        </div>
      </section>
    </div>);
}
