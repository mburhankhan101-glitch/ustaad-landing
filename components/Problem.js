'use client'

import { motion } from 'framer-motion'
import styles from './Problem.module.css'

const problems = [
  {
    icon: '📚',
    title: 'Ratta system kaam nahi karta',
    desc: 'Textbooks give you theory. Entry tests ask application. Memorizing definitions gets you nowhere in FAST-NU Advanced Maths.',
  },
  {
    icon: '📄',
    title: 'Past papers scattered everywhere',
    desc: 'Searching Facebook groups and random PDFs wastes hours. There is no clean, organized source for real past papers.',
  },
  {
    icon: '❓',
    title: 'Wrong answer, now what?',
    desc: 'You get a question wrong, mark it, and move on. No one explains WHY. That same mistake repeats on the real test.',
  },
]

// Shared animation settings for a clean, premium feel
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }, // Apple-like ease-out
}

export default function Problem() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Small label – slight delay, keep it subtle */}
        <motion.div
          className={styles.label}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          viewport={{ once: true }}
        >
          The Problem
        </motion.div>

        {/* Main heading */}
        <motion.h2
          className={styles.heading}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Baaki sab resources<br />
          <span className={styles.red}>incomplete hain.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className={styles.sub}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Pakistani students preparing for entry tests deserve better than
          scattered PDFs and zero feedback.
        </motion.p>

        {/* Cards grid – stagger children */}
        <div className={styles.cards}>
          {problems.map((p, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: 0.4 + i * 0.15,   // stagger each card
              }}
              viewport={{ once: true }}
            >
              <div className={styles.icon}>{p.icon}</div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}