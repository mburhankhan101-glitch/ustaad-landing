import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  UNIVERSITIES,
  universityBySlug,
  TEST_DATES_2027,
  SUBJECT_TOPICS,
} from '../../../lib/universities'
import styles from './Exam.module.css'

// Five universities, known at build time, so every page is static.
export function generateStaticParams() {
  return UNIVERSITIES.map((u) => ({ slug: u.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const uni = universityBySlug(slug)
  if (!uni) return {}
  return {
    title: `${uni.test} — paper pattern and preparation | Ustaad`,
    description:
      `${uni.full}. ${uni.programs.length > 1 ? 'Each paper' : 'The paper'} ` +
      `section by section, and what to practise.`,
  }
}

/**
 * One subject in a paper: how much of it, and what is in it.
 *
 * The weight bar is the point of the card. A student scanning four subjects
 * wants to know where the marks are before they read a single chapter name,
 * and a number alone does not answer that at a glance — 45 next to 25 next to
 * 20 is three numbers, where three bars of different lengths is one picture.
 */
function SubjectCard({ section }) {
  const topics = SUBJECT_TOPICS[section.label]
  const pct = section.weight ? parseFloat(section.weight) : null

  return (
    <div className={styles.subject}>
      <div className={styles.subjectHead}>
        <h4 className={styles.subjectName}>{section.label}</h4>
        {section.count ? (
          <span className={styles.qs}>{section.count} Qs</span>
        ) : null}
      </div>

      {pct != null ? (
        <div className={styles.weight}>
          <div className={styles.weightRow}>
            <span className={styles.weightLabel}>Weightage</span>
            <span className={styles.weightValue}>{section.weight}</span>
          </div>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${pct}%` }} />
          </div>
        </div>
      ) : null}

      {topics ? (
        <div className={styles.topics}>
          <p className={styles.topicsLabel}>Selected topics</p>
          <ul className={styles.topicList}>
            {topics.show.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {topics.total > topics.show.length ? (
            <p className={styles.more}>
              + {topics.total - topics.show.length} more
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default async function ExamPage({ params }) {
  const { slug } = await params
  const uni = universityBySlug(slug)
  if (!uni) notFound()

  const dates = TEST_DATES_2027[uni.slug]

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <Link href="/#exams" className={styles.back}>
          ← All tests
        </Link>

        <header className={styles.head}>
          <Image
            src={uni.logo}
            alt=""
            width={76}
            height={76}
            className={styles.crest}
          />
          <div className={styles.headText}>
            <h1 className={styles.title}>{uni.test}</h1>
            <p className={styles.full}>{uni.full}</p>
          </div>
        </header>

        <div className={styles.topGrid}>
          <p className={styles.intro}>{uni.intro}</p>

          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt>Where it gets you</dt>
              <dd>{uni.campuses.join(' · ')}</dd>
            </div>
            <div className={styles.fact}>
              <dt>Negative marking</dt>
              <dd>{uni.negative}</dd>
            </div>
            {/* Rendered only once a real date exists. A test date invented
                here is one a student plans a year around and then misses. */}
            {dates?.length ? (
              <div className={styles.fact}>
                <dt>2027 test dates</dt>
                <dd>{dates.map((d) => `${d.label}: ${d.window}`).join(' · ')}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        {uni.programs.map((p) => (
          <section key={p.name} className={styles.program}>
            <div className={styles.programHead}>
              <h2 className={styles.programName}>{p.name}</h2>
              {p.totalMcqs ? (
                <p className={styles.shape}>
                  {p.totalMcqs} questions · {p.minutes} minutes
                </p>
              ) : null}
            </div>

            <div className={styles.subjects}>
              {p.sections.map((s) => (
                <SubjectCard key={s.label} section={s} />
              ))}
            </div>

            {p.note ? <p className={styles.note}>{p.note}</p> : null}
          </section>
        ))}

        <Link href="/#download" className={styles.cta}>
          Practise this paper in Ustaad
        </Link>
      </div>
    </main>
  )
}
