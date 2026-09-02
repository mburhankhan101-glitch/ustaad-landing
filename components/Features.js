import styles from './Features.module.css'

// Real screenshots instead of the hand-built CSS replicas that used to live in
// this file. The app is well designed; showing it is more convincing than
// redrawing it, and it cannot drift out of sync with what ships.
const features = [
  {
    id: 'explain',
    eyebrow: 'AI explanations',
    title: 'Galat jawab? Ustu batayega kyun.',
    body: 'Every wrong answer opens a full breakdown — the concept, the working step by step, and the trick to spot it next time. Toggle between Urdu and English mid-question.',
    points: ['Urdu aur English, ek tap par', 'Concept → Solution → Trick', 'Har sawal ke saath, free'],
    shot: '/app/explanation.jpeg',
    alt: 'The Ustaad app showing Ustu\'s bilingual explanation sheet for a quantitative series question.',
  },
  {
    id: 'papers',
    eyebrow: 'Real exam simulation',
    title: 'Asli paper jaisa. Har detail tak.',
    body: 'FAST-NU ki negative marking, NTS ke coloured booklets, section-wise timing aur auto-submit — exam hall mein kuch bhi naya nahi lagega.',
    points: ['FAST-NU: +1 sahi, −0.25 galat', 'NTS coloured booklet sections', 'Timer, mark-for-review, auto-submit'],
    shot: '/app/papers.jpeg',
    alt: 'The papers screen in the Ustaad app listing full-length mock papers with their marking schemes.',
  },
  {
    id: 'progress',
    eyebrow: 'Progress tracking',
    title: 'Consistency beats cramming.',
    body: 'Daily goal, streak aur subject-wise accuracy ek screen par. Ustaad tracks which topics keep costing you marks and sends you back to them.',
    points: ['Daily goal aur streak', 'Subject-wise accuracy', 'Weak topics sabse upar'],
    shot: '/app/progress.jpeg',
    alt: 'The progress screen in the Ustaad app showing daily goal, streak and subject-wise accuracy.',
  },
]

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.inner}>

        <header className={styles.head}>
          <p className={styles.eyebrow}>What you get</p>
          <h2 className={styles.heading}>
            Sab kuch ek jagah.<br />
            <span className={styles.accent}>Smart tareeqe se.</span>
          </h2>
        </header>

        <div className={styles.rows}>
          {features.map((f, i) => (
            <article key={f.id} className={`${styles.row} ${i % 2 === 1 ? styles.flip : ''}`}>
              <div className={styles.copy}>
                <p className={styles.rowEyebrow}>{f.eyebrow}</p>
                <h3 className={styles.rowTitle}>{f.title}</h3>
                <p className={styles.rowBody}>{f.body}</p>
                <ul className={styles.points}>
                  {f.points.map(p => <li key={p}>{p}</li>)}
                </ul>
              </div>

              <div className={styles.shotWrap}>
                <div className={styles.phone}>
                  <img src={f.shot} alt={f.alt} width="790" height="1624" loading="lazy" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
