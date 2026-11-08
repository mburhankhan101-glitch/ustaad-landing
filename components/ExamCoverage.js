'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { UNIVERSITIES } from '../lib/universities'
import styles from './ExamCoverage.module.css'

/**
 * Which test you are sitting, as a way in rather than a specification.
 *
 * This used to print each paper's MCQ count, duration and section split on
 * the landing page. That was wrong twice over: it is more detail than anyone
 * needs while deciding whether to install, and it was a single pattern per
 * university when FAST sets two papers and NUST sets four — so for half the
 * readers the numbers were someone else's exam.
 *
 * The detail now lives on each university's own page, where a student who
 * wants it has asked for it and can be shown the right one.
 *
 * Crests are trademarks, used nominatively to say which test is covered.
 */
export default function ExamCoverage() {
  return (
    <section className={styles.section} id="exams">
      <div className={styles.inner}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          Kaunsa exam de rahe ho?
        </motion.h2>

        <div className={styles.grid}>
          {UNIVERSITIES.map((uni, i) => (
            <motion.div
              key={uni.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.05 + i * 0.06,
              }}
              viewport={{ once: true }}
            >
              <Link href={`/exams/${uni.slug}`} className={styles.card}>
                <span className={styles.crest}>
                  <Image
                    src={uni.logo}
                    alt=""
                    width={56}
                    height={56}
                    className={styles.crestImg}
                  />
                </span>
                <span className={styles.name}>{uni.name}</span>
                <span className={styles.programs}>
                  {uni.programs.map((p) => p.name).join(' · ')}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
