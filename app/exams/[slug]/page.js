import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { UNIVERSITIES, universityBySlug, TEST_DATES_2027 } from '../../../lib/universities'
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
            width={72}
            height={72}
            className={styles.crest}
          />
          <div>
            <h1 className={styles.title}>{uni.test}</h1>
            <p className={styles.full}>{uni.full}</p>
          </div>
        </header>

        <p className={styles.intro}>{uni.intro}</p>

        <section className={styles.block}>
          <h2 className={styles.h2}>Where it gets you</h2>
          <p className={styles.campuses}>{uni.campuses.join(' · ')}</p>
        </section>

        {/* Only rendered once a real date exists. A test date invented here
            is one a student plans a year around and then misses, so the
            section is absent rather than approximate. */}
        {dates?.length ? (
          <section className={styles.block}>
            <h2 className={styles.h2}>2027 test dates</h2>
            <dl className={styles.dates}>
              {dates.map((d) => (
                <div key={d.label} className={styles.dateRow}>
                  <dt className={styles.dateLabel}>{d.label}</dt>
                  <dd className={styles.dateValue}>{d.window}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <section className={styles.block}>
          <h2 className={styles.h2}>
            {uni.programs.length > 1 ? 'The papers' : 'The paper'}
          </h2>

          {uni.programs.map((p) => (
            <div key={p.name} className={styles.program}>
              <h3 className={styles.programName}>{p.name}</h3>

              {p.totalMcqs ? (
                <p className={styles.shape}>
                  {p.totalMcqs} questions in {p.minutes} minutes
                </p>
              ) : null}

              <table className={styles.table}>
                <tbody>
                  {p.sections.map((s) => (
                    <tr key={s.label}>
                      <th scope="row" className={styles.sectionName}>
                        {s.label}
                      </th>
                      <td className={styles.sectionCount}>
                        {s.count ? `${s.count} questions` : ''}
                      </td>
                      <td className={styles.sectionWeight}>{s.weight ?? ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {p.note ? <p className={styles.note}>{p.note}</p> : null}
            </div>
          ))}
        </section>

        <section className={styles.block}>
          <h2 className={styles.h2}>Negative marking</h2>
          <p className={styles.plain}>{uni.negative}</p>
        </section>

        <Link href="/#download" className={styles.cta}>
          Practise this paper in Ustaad
        </Link>
      </div>
    </main>
  )
}
