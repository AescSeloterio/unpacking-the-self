import { useState, useEffect } from 'react';
import { dimensions, dimensionReflections, quizQuestions } from '../data';
export default function SelfReflectionPage({ navigate }) {
    const [step, setStep] = useState(0); // 0=select dim, 1-3=questions, 4=complete
    const [selectedDim, setSelectedDim] = useState(null);
    const [answers, setAnswers] = useState([null, null, null]);
    const [visible, setVisible] = useState(false);
    useEffect(() => { const t = setTimeout(() => setVisible(true), 30); return () => clearTimeout(t); }, []);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);
    const dimSteps = selectedDim ? (dimensionReflections[selectedDim] ?? []) : [];
    const currentQ = step >= 1 && step <= 3 ? dimSteps[step - 1] : null;
    // Quiz state (Discover Your Strongest Dimension)
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const getDominant = () => {
        const counts = {};
        Object.values(quizAnswers).forEach(d => { counts[d] = (counts[d] || 0) + 1; });
        return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
    };
    const dominantDim = quizSubmitted ? dimensions.find(d => d.id === getDominant()) : null;
    const currentAnswer = step >= 1 ? answers[step - 1] : null;
    const dim = dimensions.find(d => d.id === selectedDim);
    const selectAnswer = (text) => {
        const n = [...answers];
        n[step - 1] = text;
        setAnswers(n);
    };
    const goBack = () => { if (step > 0)
        setStep(s => s - 1); };
    const goNext = () => { if (step < 4)
        setStep(s => s + 1); };
    const restart = () => { setStep(0); setSelectedDim(null); setAnswers([null, null, null]); };
    return (<div style={{ paddingTop: '68px', minHeight: '100vh', background: 'var(--bg)', opacity: visible ? 1 : 0, transition: 'opacity 0.45s ease' }}>

      {/* Step 0: Dimension selector */}
      {step === 0 && (<div style={{ animation: 'fadeInUp 0.45s ease both' }}>
          <section style={{ background: 'var(--surface)', padding: 'clamp(3.5rem,7vw,6rem) 2rem', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
            <div className="section-label" style={{ marginBottom: '0.7rem' }}>Self-Reflection</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: 'var(--text-1)', margin: '0 0 0.75rem', lineHeight: 1.15 }}>
              KNOW YOURSELF
            </h1>
            <p style={{ color: 'var(--text-2)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8, fontSize: '1rem' }}>
              Take a moment to reflect on the different parts of who you are. This activity is for personal exploration — not a psychological assessment.
            </p>
          </section>

          <section style={{ padding: 'clamp(3rem,6vw,5rem) 2rem' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem,2.5vw,1.7rem)', color: 'var(--text-1)', margin: '0 0 0.5rem', textAlign: 'center' }}>
                Which dimension would you like to understand better?
              </h2>
              <p style={{ color: 'var(--text-3)', textAlign: 'center', fontSize: '0.85rem', marginBottom: '2rem', lineHeight: 1.7 }}>
                Choose the dimension that feels most relevant to you right now. There is no right or wrong answer.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center', marginBottom: '2.5rem' }} className="reflect-dim-grid">
                {dimensions.map(d => (<button key={d.id} onClick={() => setSelectedDim(d.id)} className={`reflect-dim-btn`} style={{ background: selectedDim === d.id ? `${d.color}12` : 'var(--surface)', border: `2px solid ${selectedDim === d.id ? d.color : 'var(--border)'}`, borderRadius: 'var(--radius-md)', padding: '1.25rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', transition: 'all 0.22s ease', boxShadow: selectedDim === d.id ? `0 0 0 4px ${d.color}14` : 'none' }} onMouseEnter={e => { if (selectedDim !== d.id) {
                const el = e.currentTarget;
                el.style.borderColor = d.color;
                el.style.background = `${d.color}07`;
            } }} onMouseLeave={e => { if (selectedDim !== d.id) {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--border)';
                el.style.background = 'var(--surface)';
            } }}>
                    <span style={{ fontSize: '1.6rem' }}>{d.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.1em' }}>{d.num}</div>
                      <div style={{ fontWeight: 700, color: selectedDim === d.id ? d.color : 'var(--text-1)', fontSize: '0.9rem' }}>{d.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', lineHeight: 1.3 }}>{d.tagline}</div>
                    </div>
                    {selectedDim === d.id && <div style={{ marginLeft: 'auto', width: '18px', height: '18px', borderRadius: '50%', background: d.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0 }}>✓</div>}
                  </button>))}
              </div>

              {selectedDim && dim && (<div style={{ background: `${dim.color}08`, border: `1px solid ${dim.color}20`, borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px', animation: 'fadeIn 0.3s ease' }}>
                  <span style={{ fontSize: '1.5rem' }}>{dim.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: dim.color, fontSize: '0.82rem' }}>You selected: The {dim.name} Self</div>
                    <div style={{ color: 'var(--text-2)', fontSize: '0.8rem' }}>{dim.tagline}</div>
                  </div>
                </div>)}

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="btn-primary" onClick={goNext} disabled={!selectedDim} style={{ opacity: selectedDim ? 1 : 0.4, transition: 'opacity 0.3s', fontSize: '0.95rem', padding: '0.95rem 2.5rem' }}>
                  BEGIN REFLECTION →
                </button>
              </div>
            </div>
          </section>

          {/* Discover Your Dimension quiz */}
          <section style={{ background: 'var(--surface)', padding: 'clamp(2.5rem,5vw,4rem) 2rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div className="section-label" style={{ marginBottom: '0.5rem' }}>Discover Your Dimension</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-1)', margin: '0 0 0.6rem' }}>Discover Your Strongest Dimension</h2>
                <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', lineHeight: 1.75 }}>Answer three questions to discover which dimension feels most alive in your life right now.</p>
              </div>
              {!quizSubmitted ? (<div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {quizQuestions.map((q, qi) => (<div key={q.id} className="quiz-card" style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--navy)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>{qi + 1}</div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', color: 'var(--text-1)', margin: 0, lineHeight: 1.4 }}>{q.question}</h3>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {q.options.map(opt => {
                        const d = dimensions.find(x => x.id === opt.dim);
                        const sel = quizAnswers[q.id] === opt.dim;
                        return (<button key={opt.dim} onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: opt.dim }))} className={`quiz-option${sel ? ' selected' : ''}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                              <span>{d.icon}</span>
                              <span style={{ fontSize: '0.84rem', color: sel ? 'var(--text-1)' : 'var(--text-2)', fontWeight: sel ? 600 : 400 }}>{opt.label}</span>
                              {sel && <span style={{ marginLeft: 'auto', color: d.color, fontWeight: 700, fontSize: '0.8rem' }}>✓</span>}
                            </button>);
                    })}
                      </div>
                    </div>))}
                  <button className="btn-primary" style={{ alignSelf: 'center', opacity: Object.keys(quizAnswers).length < 3 ? 0.45 : 1, transition: 'opacity 0.3s' }} disabled={Object.keys(quizAnswers).length < 3} onClick={() => setQuizSubmitted(true)}>
                    Reveal My Dimension ✨
                  </button>
                </div>) : dominantDim ? (<div style={{ animation: 'fadeInUp 0.5s ease', background: 'var(--bg)', border: `2px solid ${dominantDim.color}30`, borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <div style={{ height: '160px', position: 'relative', background: dominantDim.colorLight, overflow: 'hidden' }}>
                    <img src={dominantDim.image} alt={dominantDim.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}/>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '3.5rem' }}>{dominantDim.icon}</span>
                    </div>
                  </div>
                  <div style={{ padding: '1.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, color: dominantDim.color, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>Your Dominant Dimension</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.7rem', color: 'var(--text-1)', margin: '0 0 0.6rem' }}>The {dominantDim.name} Self</h2>
                    <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.75, maxWidth: '440px', margin: '0 auto 1.5rem' }}>{dominantDim.description.slice(0, 160)}…</p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button className="btn-primary" style={{ background: dominantDim.color, borderColor: dominantDim.color }} onClick={() => { setSelectedDim(dominantDim.id); setStep(1); }}>
                        Reflect on This Dimension →
                      </button>
                      <button className="btn-ghost" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}>Retake</button>
                    </div>
                  </div>
                </div>) : null}
            </div>
          </section>
        </div>)}

      {/* Steps 1-3: Questions */}
      {step >= 1 && step <= 3 && currentQ && (<div style={{ animation: 'fadeInUp 0.4s ease' }}>
          <section style={{ background: 'var(--surface)', padding: 'clamp(2.5rem,5vw,4rem) 2rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              {/* Progress */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3].map(n => (<div key={n} style={{ height: '4px', width: '40px', borderRadius: '2px', background: n <= step ? 'var(--navy)' : 'var(--border)', transition: 'background 0.3s' }}/>))}
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  REFLECTION {String(currentQ.progress.current).padStart(2, '0')} / {String(currentQ.progress.total).padStart(2, '0')}
                </span>
                {dim && <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', background: `${dim.color}12`, border: `1px solid ${dim.color}25`, borderRadius: '50px', padding: '3px 10px' }}>
                  <span style={{ fontSize: '0.85rem' }}>{dim.icon}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: dim.color }}>{dim.name}</span>
                </div>}
              </div>

              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem,2.8vw,1.9rem)', color: 'var(--text-1)', margin: '0 0 0.75rem', lineHeight: 1.35 }}>
                {currentQ.question}
              </h2>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>{currentQ.context}</p>
            </div>
          </section>

          <section style={{ padding: 'clamp(2.5rem,5vw,4rem) 2rem' }}>
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <div className="reflect-grid" style={{ marginBottom: '2.5rem' }}>
                {currentQ.options.map(opt => (<button key={opt.text} onClick={() => selectAnswer(opt.text)} className={`reflect-option${currentAnswer === opt.text ? ' selected' : ''}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                    <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{opt.emoji}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-1)', marginBottom: '2px' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-2)', lineHeight: 1.5 }}>{opt.text}</div>
                    </div>
                    {currentAnswer === opt.text && <div style={{ marginLeft: 'auto', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--navy)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0 }}>✓</div>}
                  </button>))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <button className="btn-ghost" onClick={goBack}>← BACK</button>
                <button className="btn-primary" onClick={goNext} disabled={!currentAnswer} style={{ opacity: currentAnswer ? 1 : 0.4, transition: 'opacity 0.3s' }}>
                  {step === 3 ? 'COMPLETE →' : 'NEXT →'}
                </button>
              </div>
            </div>
          </section>
        </div>)}

      {/* Step 4: Complete */}
      {step === 4 && (<div style={{ animation: 'fadeInUp 0.5s ease' }}>
          <section style={{ background: 'var(--surface)', padding: 'clamp(4rem,8vw,7rem) 2rem', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
            <div style={{ maxWidth: '580px', margin: '0 auto' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(13,148,136,0.1)', border: '2px solid rgba(13,148,136,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1.5rem' }}>✓</div>
              <div className="section-label" style={{ marginBottom: '0.7rem' }}>Well done</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.2rem)', color: 'var(--text-1)', margin: '0 0 1.25rem', lineHeight: 1.2 }}>
                REFLECTION COMPLETE
              </h1>
              <p style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: '1rem', marginBottom: '2.5rem' }}>
                You have taken a meaningful step toward understanding yourself. Self-discovery is not a single moment — it is a lifelong practice. Every honest question you ask is an act of courage and growth.
              </p>
              {dim && answers[0] && (<div style={{ background: `${dim.color}08`, border: `1px solid ${dim.color}20`, borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'left', marginBottom: '2.5rem' }}>
                  <div style={{ fontWeight: 700, color: dim.color, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Your Reflections</div>
                  {answers.map((a, i) => a && (<div key={i} style={{ display: 'flex', gap: '10px', marginBottom: i < 2 ? '0.5rem' : 0 }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: dim.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>{i + 1}</div>
                      <span style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.6 }}>{a}</span>
                    </div>))}
                </div>)}
              <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={restart}>EXPLORE AGAIN</button>
                <button className="btn-secondary" onClick={() => navigate({ page: 'dimensions' })}>Explore Dimensions</button>
              </div>
            </div>
          </section>
          {/* More reflections */}
          <section style={{ padding: 'clamp(3rem,6vw,5rem) 2rem', background: 'var(--bg)' }}>
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-1)', margin: '0 0 2rem', textAlign: 'center' }}>More Reflection Prompts</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {[
                'What is one part of yourself you are genuinely proud of?',
                'How have your experiences shaped who you are today?',
                'How do your closest relationships influence your sense of self?',
                'How does your digital presence represent — or misrepresent — who you really are?',
                'What would change if you lived more aligned with your deepest values?',
            ].map((q, i) => (<div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--teal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <span style={{ color: 'var(--text-2)', fontSize: '0.88rem', lineHeight: 1.65 }}>{q}</span>
                  </div>))}
              </div>
            </div>
          </section>
        </div>)}
    </div>);
}
