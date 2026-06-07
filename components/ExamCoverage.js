'use client'

import { motion } from 'framer-motion'
import styles from './ExamCoverage.module.css'

const exams = [
  {
    name: 'FAST-NU',
    tag: 'CS · AI · EE · Business',
    color: '#6C63FF',
    bg: '#EEEEFF',
    details: [
      { label: 'Total MCQs', value: '120' },
      { label: 'Time', value: '120 min' },
      { label: 'Negative marking', value: 'Yes' },
    ],
    sections: ['Advanced Maths (50)', 'Basic Maths (20)', 'Analytical & IQ (20)', 'English (30)'],
  },
  {
    name: 'NUST-NET',
    tag: 'Engineering · CS · Business',
    color: '#e85c5c',
    bg: '#FFF0F0',
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
    details: [
      { label: 'Total MCQs', value: '90' },
      { label: 'Time', value: '100 min' },
      { label: 'Negative marking', value: 'No' },
    ],
    sections: ['English (20)', 'Analytical (20)', 'Quantitative (20)', 'Subject (30)'],
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
                  Covered ✓
                </div>
              </div>

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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}