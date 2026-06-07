'use client'

import { motion } from 'framer-motion'
import styles from './Features.module.css'

/* ── Screen 1: Ustu Explanation — matches explanation.jpeg ── */
function ExplanationScreen() {
  return (
    <div className={styles.phoneFrame}>
      {/* blurred quiz behind sheet */}
      <div className={styles.behindSheet}>
        <div className={styles.behindNav}>
          <div className={styles.behindBack}>‹</div>
          <span className={styles.behindTitle}>Quantitative</span>
          <div className={styles.behindQuit}>Quit</div>
        </div>
        <div className={styles.behindProgressRow}>
          <span className={styles.behindProgLabel}>Progress</span>
          <span className={styles.behindProgCount}>Q 8 of 10</span>
        </div>
        <div className={styles.behindTrack}><div className={styles.behindFill} style={{width:'80%'}} /></div>
        <div className={styles.behindTag}>
          <span className={styles.behindDot} />Quantitative · FAST-NU
        </div>
        <div className={styles.behindQCard}>
          <span className={styles.behindQNum}>QUESTION 08</span>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className={styles.sheet}>
        <div className={styles.sheetHandle} />

        {/* Ustu header */}
        <div className={styles.sheetHeader}>
          <div className={styles.ustuAvatar}>🦉</div>
          <div>
            <p className={styles.sheetTitle}>Ustu&apos;s Explanation</p>
            <p className={styles.sheetSub}>AI-powered · Quantitative</p>
          </div>
        </div>

        {/* Language toggle */}
        <div className={styles.langToggle}>
          <span className={styles.langActive}>English</span>
          <span className={styles.langInactive}>اردو</span>
        </div>

        {/* Question */}
        <div className={styles.sheetQuestion}>
          Complete the number series: 8, 10, 14, 20, 28, 38, 50, …
        </div>

        {/* Correct answer */}
        <div className={styles.correctAnswer}>
          <span className={styles.correctLetter}>D</span>
          <span className={styles.correctText}>Correct: 64</span>
        </div>

        {/* Explanation */}
        <div className={styles.explanationText}>
          <p><strong>Concept:</strong> Series where gaps increase by 2 (even numbers).</p>
          <p><strong>Solution:</strong> 8+2=10. 10+4=14. 14+6=20. Next gap: 14. So 50+14=64.</p>
          <p><strong>Trick:</strong> Gaps are consecutive even numbers (2, 4, 6…).</p>
        </div>

        {/* CTA button */}
        <div className={styles.gotItBtn}>Got it, thanks Ustu!</div>
      </div>
    </div>
  )
}

/* ── Screen 2: Mock Papers — matches mockpaper.jpeg ── */
function MockPapersScreen() {
  const papers = [
    {
      name: 'FAST-NU Entrance',
      time: '120 mins', marks: '100 marks',
      sections: ['50 Adv Math', '20 Basic Math', '20 IQ', '30 English'],
      scheme: '+1 / −0.25 (Math, IQ)  ·  +0.344 / −0.0844 (English)',
      schemeColor: '#6C63FF',
      schemeBg: 'rgba(108,99,255,0.12)',
    },
    {
      name: 'NUST NET (Engineering)',
      time: '180 mins', marks: '200 marks',
      sections: ['100 Math', '60 Physics', '40 English'],
      scheme: '+1  ·  No Negative Marking',
      schemeColor: '#4CAF50',
      schemeBg: 'rgba(76,175,80,0.12)',
    },
    {
      name: 'NTS NAT (ICS/CS)',
      time: '100 mins', marks: '90 marks',
      sections: ['20 English', '20 Analytical', '20 Quantitative', '30 CS'],
      scheme: '+1  ·  No Negative Marking',
      schemeColor: '#FF9500',
      schemeBg: 'rgba(255,149,0,0.12)',
    },
  ]

  return (
    <div className={styles.phoneFrame}>
      <div className={styles.papersScreen}>
        <h3 className={styles.papersTitle}>Mock Papers</h3>
        <p className={styles.papersSub}>Full-length timed exams to test your endurance.</p>

        {papers.map((p, i) => (
          <div key={i} className={styles.paperCard}>
            <div className={styles.paperCardTop}>
              <div>
                <p className={styles.paperName}>{p.name}</p>
                <p className={styles.paperMeta}>{p.time} · {p.marks}</p>
              </div>
              <span className={styles.paperArrow} style={{color: p.schemeColor}}>›</span>
            </div>
            <div className={styles.sectionPills}>
              {p.sections.map((s, j) => (
                <span key={j} className={styles.sectionPill}>{s}</span>
              ))}
            </div>
            <div className={styles.schemeBox} style={{background: p.schemeBg, borderColor: p.schemeColor + '33'}}>
              <p className={styles.schemeLabel} style={{color: p.schemeColor}}>MARKING SCHEME</p>
              <p className={styles.schemeText}>{p.scheme}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Screen 3: Home Screen — matches homescreen.jpeg ── */
function HomeScreen() {
  return (
    <div className={styles.phoneFrame}>
      <div className={styles.homeScreen}>

        {/* Greeting */}
        <div className={styles.homeGreet}>
          <div>
            <p className={styles.homeGreetText}>Still up, Burhan ☕</p>
            <p className={styles.homeGreetSub}>Night Student, NUST topper banne ka time aa gaya.</p>
          </div>
          <div className={styles.homeAvatar}>BK</div>
        </div>

        {/* Streak card */}
        <div className={styles.streakCard}>
          <span className={styles.streakFire}>🔥</span>
          <div>
            <p className={styles.streakNum}><span className={styles.streakBig}>2</span> day streak</p>
            <p className={styles.streakMsg}>🔥 2 din ho gaye. Shaabaash!🤩</p>
          </div>
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          <div className={styles.goalCard}>
            <div className={styles.goalTop}>
              <span className={styles.goalLabel}>Today&apos;s Goal</span>
              <span className={styles.goalVal}>20/20</span>
            </div>
            <div className={styles.goalTrack}><div className={styles.goalFill} /></div>
            <p className={styles.goalSmashed}>🎯 Goal smashed today!</p>
          </div>
          <div className={styles.accuracyCard}>
            <p className={styles.accuracyNum}>23%</p>
            <p className={styles.accuracyLabel}>Overall accuracy</p>
            <p className={styles.accuracyTrend}>↑ improving</p>
          </div>
        </div>

        {/* Practice Quiz header + tabs */}
        <p className={styles.pqTitle}>Practice Quiz</p>
        <div className={styles.tabRow}>
          <span className={styles.tabActive}>FAST-NU</span>
          <span className={styles.tabInactive}>NUST-NET</span>
          <span className={styles.tabInactive}>NTS</span>
        </div>

        {/* Subject grid */}
        <div className={styles.subjectGrid}>
          {[
            { icon:'📐', name:'Advanced Maths', pct:'50%', done:'13% DONE', color:'#6C63FF' },
            { icon:'🔢', name:'Basic Maths',    pct:'20%', done:'2% DONE',  color:'#6C63FF' },
            { icon:'🧩', name:'IQ & Analytical',pct:'20%', done:'11% DONE', color:'#FFD700' },
            { icon:'✏️', name:'English',         pct:'10%', done:'NOT STARTED', color:'#4CAF50', badge:'NEW' },
          ].map((s, i) => (
            <div key={i} className={styles.subjectCard}>
              {s.badge && <span className={styles.subjectBadge}>{s.badge}</span>}
              <span className={styles.subjectIcon}>{s.icon}</span>
              <p className={styles.subjectName}>{s.name}</p>
              <p className={styles.subjectPct}>{s.pct} of FAST-NU</p>
              <div className={styles.subjectTrack}>
                <div className={styles.subjectFill} style={{width: s.done === 'NOT STARTED' ? '0%' : s.done, background: s.color}} />
              </div>
              <p className={styles.subjectDone}>{s.done}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Feature rows ── */
const rows = [
  {
    tag: 'AI Explanations',
    tagColor: '#6C63FF',
    headline: 'Galat jawab? Ustu explain karega.',
    sub: 'Every wrong answer triggers an instant AI explanation in Urdu or English. Understand the concept, not just mark and move on.',
    bullets: ['Urdu & English toggle', 'Step-by-step breakdown', 'Powered by Google Gemini'],
    screen: <ExplanationScreen />,
    reverse: false,
  },
  {
    tag: 'Past Papers',
    tagColor: '#858542',
    headline: 'Real papers. Organized. Finally.',
    sub: 'Browse FAST-NU, NUST-NET and NTS past papers with full marking schemes. Simulate real exam pressure, timed, section-locked, negative marking, colored booklets',
    bullets: ['Exact marking schemes', 'Section-wise timing', 'Auto-submit on time up'],
    screen: <MockPapersScreen />,
    reverse: true,
  },
  {
    tag: 'Progress Tracking',
    tagColor: '#FF9500',
    headline: 'Consistency beats cramming. Always.',
    sub: 'Your daily goal, streak and accuracy all on one screen. Ustu tracks weak topics after every quiz and sends a focused drill before you notice the gap.',
    bullets: ['Daily goal progress bar', 'Streak tracking', 'Subject-wise accuracy'],
    screen: <HomeScreen />,
    reverse: false,
  },
]

export default function Features() {
  // Shared Apple-like animation settings
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
    viewport: { once: true },
  }

  return (
    <section className={styles.section} id="features">
      <div className={styles.inner}>
        {/* Section label */}
        <motion.div
          className={styles.sectionLabel}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
        >
          Features
        </motion.div>

        {/* Main heading */}
        <motion.h2
          className={styles.sectionHeading}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
        >
          Sab kuch ek jagah.<br />
          <span className={styles.purple}>Smart tareeqe se.</span>
        </motion.h2>

        {/* Feature rows */}
        <div className={styles.rows}>
          {rows.map((row, i) => (
            <div
              key={i}
              className={`${styles.row} ${row.reverse ? styles.rowReverse : ''}`}
            >
              {/* Text side – slides in from left (or right if reversed) */}
              <motion.div
                className={styles.textSide}
                initial={{ opacity: 0, x: row.reverse ? 30 : -30, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.25 + i * 0.15,
                }}
                viewport={{ once: true }}
              >
                <span
                  className={styles.tag}
                  style={{
                    color: row.tagColor,
                    background: row.tagColor + '18',
                  }}
                >
                  {row.tag}
                </span>
                <h3 className={styles.rowHeadline}>{row.headline}</h3>
                <p className={styles.rowSub}>{row.sub}</p>
                <ul className={styles.bullets}>
                  {row.bullets.map((b, j) => (
                    <li key={j} className={styles.bullet}>
                      <span
                        className={styles.bulletDot}
                        style={{ background: row.tagColor }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Phone mockup side – fades up + scales */}
              <motion.div
                className={styles.screenSide}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.4 + i * 0.15,
                }}
                viewport={{ once: true }}
              >
                {row.screen}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}