import styles from './Problem.module.css'

// The three pain points the old page listed as separate icon cards, restructured
// as before/after pairs. Same content, but the contrast is the argument — a card
// with an emoji on it isn't.
const contrasts = [
  {
    theme: 'Ratta',
    before: 'Definitions ratta maar li. Test mein application-based sawal aa gaya.',
    after:  'Har sawal asli past paper se — wahi style, wahi difficulty. Topic-wise drill.',
  },
  {
    theme: 'Past papers',
    before: 'Facebook groups aur random PDFs mein do ghante barbaad, phir bhi adhoora.',
    after:  'Saare past papers ek jagah, marking scheme ke saath. Search karne ki zaroorat nahi.',
  },
  {
    theme: 'Galtiyan',
    before: 'Sawal galat hua, cross lagaya, aage barh gaye. Wahi galti test mein dobara.',
    after:  'Har galat jawab par turant explanation — Urdu ya English, jo samajh aaye.',
  },
]

export default function Problem() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <header className={styles.head}>
          <p className={styles.eyebrow}>The problem</p>
          <h2 className={styles.heading}>
            Baaki sab resources<br />
            <span className={styles.dim}>incomplete hain.</span>
          </h2>
          <p className={styles.sub}>
            Pakistani students deserve better than scattered PDFs and zero feedback.
            Yeh farq hai.
          </p>
        </header>

        <div className={styles.table}>
          <div className={styles.colHead}>
            <span className={styles.colLabelBefore}>Ab tak</span>
            <span className={styles.colLabelAfter}>Ustaad ke saath</span>
          </div>

          {contrasts.map((row) => (
            <div key={row.theme} className={styles.row}>
              <p className={styles.theme}>{row.theme}</p>
              <p className={styles.before}>{row.before}</p>
              <p className={styles.after}>{row.after}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
