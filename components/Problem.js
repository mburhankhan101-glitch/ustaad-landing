import styles from './Problem.module.css'

/**
 * What preparing for these exams is actually like, with and without this.
 *
 * The earlier version of this table lost on two counts: it dimmed the left
 * column to grey so the reader was told which side to agree with before
 * reading either, and the left column was a caricature rather than a
 * description. A student who has actually prepared from PDFs knows what that
 * is like, and recognising their real situation is what earns the right-hand
 * column — being told their situation is pathetic does not.
 *
 * So both columns are set in the same weight and colour, and the left one
 * says true things. Nobody is being beaten; two ways of working are being
 * described, and the difference does the arguing.
 */
const rows = [
  {
    aspect: 'The questions',
    without:
      'Whatever a PDF happens to contain. Mixed years, mixed boards, and no way to tell what is still on the syllabus.',
    with: 'Real past paper questions, filtered to your exam and your degree.',
  },
  {
    aspect: 'Past papers',
    without:
      'Scattered across Facebook groups and drive links, usually without the marking scheme.',
    with: 'Every paper in one place, with its marking scheme and the real exam interface.',
  },
  {
    aspect: 'Getting one wrong',
    without:
      'A cross in the margin. You learn what you got wrong, not why, and you meet the same question again in the exam.',
    with: 'An explanation the moment you answer, covering the concept, the working, and the mistake most students make.',
  },
  {
    aspect: 'What you practise',
    without: 'A whole paper, or nothing.',
    with: 'One chapter at a time, or a full timed mock when you are ready for it.',
  },
  {
    aspect: 'Knowing where you stand',
    without: 'A score you work out yourself, with nothing to compare it to.',
    with: 'Accuracy by subject, and the topics you keep getting wrong.',
  },
]

export default function Problem() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          The same syllabus. A different year.
        </h2>
        <p className={styles.sub}>
          Nothing here is a trick. It is the difference between working from
          what you can find and working from what you need.
        </p>

        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.aspectHead}>
                <span className={styles.srOnly}>Aspect</span>
              </th>
              <th scope="col" className={styles.colHead}>
                On your own
              </th>
              <th scope="col" className={styles.colHead}>
                With Ustaad
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.aspect}>
                <th scope="row" className={styles.aspect}>
                  {r.aspect}
                </th>
                <td className={styles.cell} data-label="On your own">
                  {r.without}
                </td>
                <td className={styles.cell} data-label="With Ustaad">
                  {r.with}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
