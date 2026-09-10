'use client'

import { motion } from 'framer-motion'
import styles from './ExamCoverage.module.css'

/**
 * The universities each test actually gets you into.
 *
 * A student does not sit "the NTS NAT", they sit it to get into COMSATS or
 * Air. Naming the campuses is what turns an abstract test pattern into the
 * thing they are working towards, and it is the difference between this
 * section listing features and it listing outcomes.
 *
 * `mark` is the monogram drawn in the exam's colour. Swapping in real crests
 * later is a matter of adding `logo: '/unis/nust.png'` to a row; the component
 * already prefers it over the monogram when present. Real crests are
 * trademarks, so use them nominatively — to say which test we cover — and drop
 * any university that asks.
 */
const UNIS = {
  fast: [
    { mark: 'FAST', name: 'FAST NUCES', where: 'Lahore · Karachi · Islamabad · Peshawar' },
  ],
  nust: [
    { mark: 'NUST', name: 'NUST', where: 'Islamabad · Risalpur' },
  ],
  nts: [
    { mark: 'CUI', name: 'COMSATS', where: 'Islamabad · Lahore · Abbottabad · Wah' },
    { mark: 'AU', name: 'Air University', where: 'Islamabad · Multan' },
    { mark: 'BZU', name: 'Bahauddin Zakariya', where: 'Multan' },
    { mark: '+', name: 'Aur doosri NTS lene wali universities', where: '' },
  ],
}

const exams = [
  {
    name: 'FAST NU',
    tag: 'CS · AI · EE · Business',
    color: '#6C63FF',
    bg: '#EEEEFF',
    unis: UNIS.fast,
    details: [
      { label: 'Total MCQs', value: '120' },
      { label: 'Time', value: '120 min' },
      { label: 'Negative marking', value: 'Yes' },
    ],
    sections: ['Advanced Maths (50)', 'Basic Maths (20)', 'Analytical & IQ (20)', 'English (30)'],
  },
  {
    name: 'NUST NET',
    tag: 'Engineering · CS · Business',
    color: '#e85c5c',
    bg: '#FFF0F0',
    unis: UNIS.nust,
    details: [
      { label: 'Total MCQs', value: '200' },
      { label: 'Time', value: '180 min' },
      { label: 'Negative marking', value: 'No' },
    ],
    sections: ['Mathematics (100)', 'Physics (60)', 'English (40)'],
  },
  {
    name: 'NTS',
    tag: 'CS · General · COMSATS',
    color: '#a29449',
    bg: '#FFFBEB',
    unis: UNIS.nts,
    details: [
      { label: 'Total MCQs', value: '90' },
      { label: 'Time', value: '100 min' },
      { label: 'Negative marking', value: 'No' },
    ],
    sections: ['English (20)', 'Analytical (20)', 'Quantitative (20)', 'Subject (30)'],
  },
  // Targeted, but no questions live yet. Deliberately carries no MCQ count or
  // paper pattern — inventing those is how you lose a student permanently.
  {
    name: 'MDCAT',
    tag: 'PMDC · MBBS · BDS',
    color: '#3E8E7E',
    bg: '#E6F4F1',
    status: 'soon',
    note: 'Biology, Chemistry aur Physics ka content tayar ho raha hai.',
  },
  {
    name: 'NUMS',
    tag: 'Army Medical · AMC',
    color: '#B4654A',
    bg: '#FBEDE8',
    status: 'soon',
    note: 'NUMS ka apna pattern hai, alag se tayar kar rahe hain.',
  },
]

export default function ExamCoverage() {
  // Shared fade-up animation preset
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
    viewport: { once: true },
  }

  return (
    <section className={styles.section} id="exams">
      <div className={styles.inner}>
        <motion.div
          className={styles.label}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
        >
          Exam Coverage
        </motion.div>

        <motion.h2
          className={styles.heading}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
        >
          Kaunsa exam de rahe ho?<br />
          <span className={styles.purple}>Hum tayar hain.</span>
        </motion.h2>

        <div className={styles.cards}>
          {exams.map((exam, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.25 + i * 0.12,   // staggered reveal per card
              }}
              viewport={{ once: true }}
            >
              <div className={styles.cardTop} style={{ borderBottom: `3px solid ${exam.color}` }}>
                <div>
                  <h3 className={styles.examName} style={{ color: exam.color }}>{exam.name}</h3>
                  <p className={styles.examTag}>{exam.tag}</p>
                </div>
                <div
                  className={styles.examBadge}
                  style={{ background: exam.bg, color: exam.color }}
                >
                  {exam.status === 'soon' ? 'Coming soon' : 'Covered ✓'}
                </div>
              </div>

              {exam.status === 'soon' ? (
                <div className={styles.soonBody}>
                  <p className={styles.soonNote}>{exam.note}</p>
                  <a className={styles.soonLink} href="#download" style={{ color: exam.color }}>
                    Live hote hi batayenge →
                  </a>
                </div>
              ) : (
                <>
                  <div className={styles.stats}>
                    {exam.details.map((d, j) => (
                      <div key={j} className={styles.stat}>
                        <span className={styles.statVal}>{d.value}</span>
                        <span className={styles.statLabel}>{d.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.sections}>
                    <p className={styles.sectionsLabel}>Sections covered:</p>
                    <div className={styles.tags}>
                      {exam.sections.map((s, j) => (
                        <span key={j} className={styles.sectionTag} style={{ background: exam.bg, color: exam.color }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.unis}>
                    <p className={styles.unisLabel}>Is test se admission:</p>
                    <ul className={styles.uniList}>
                      {exam.unis.map((u, j) => (
                        <li key={j} className={styles.uni}>
                          {u.logo ? (
                            <img src={u.logo} alt="" className={styles.uniLogo} />
                          ) : (
                            <span
                              className={styles.uniMark}
                              style={{ background: exam.bg, color: exam.color }}
                              aria-hidden="true"
                            >
                              {u.mark}
                            </span>
                          )}
                          <span className={styles.uniText}>
                            <span className={styles.uniName}>{u.name}</span>
                            {u.where && <span className={styles.uniWhere}>{u.where}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}