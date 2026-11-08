import styles from './Problem.module.css'

/**
 * The three things that actually go wrong when you prepare without this.
 *
 * This was a three-column us-and-them table: a theme, a grey "Ab tak" column
 * and a highlighted "Ustaad ke saath" column. Two problems with it. A
 * comparison table against an unnamed competitor is the oldest shape on the
 * internet and reads as marketing before a word is taken in — and writing
 * the other side's case yourself means the student is being shown a strawman
 * they did not agree to.
 *
 * So the strawman column is gone and the complaint is stated in the
 * student's own voice, as something they recognise, with what the app does
 * about it directly underneath. Same three arguments, no table, nobody to
 * beat.
 */
const problems = [
  {
    says: 'Definitions ratta maar li. Test mein application based sawal aa gaya.',
    does:
      'Every question is a real past paper question — same style, same ' +
      'difficulty. Drill them topic by topic.',
  },
  {
    says: 'Facebook groups aur random PDFs mein do ghante barbaad, phir bhi adhoora.',
    does:
      'Every past paper in one place, with its marking scheme. Nothing to ' +
      'go and find.',
  },
  {
    says: 'Sawal galat hua, cross lagaya, aage barh gaye. Wahi galti test mein dobara.',
    does:
      'Every wrong answer gets an explanation on the spot, in Urdu or ' +
      'English, whichever lands.',
  },
]

export default function Problem() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          Preparation mein yehi teen cheezein kharab hoti hain.
        </h2>

        <ol className={styles.list}>
          {problems.map((p, i) => (
            <li key={p.says} className={styles.item}>
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.body}>
                <p className={styles.says}>{p.says}</p>
                <p className={styles.does}>{p.does}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
