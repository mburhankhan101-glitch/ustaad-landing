import Link from 'next/link'
import Image from 'next/image'
import { MERIT } from '../../lib/merit'
import styles from './Merit.module.css'

export const metadata = {
  alternates: { canonical: '/merit-calculator' },
  title: 'University merit calculators 2027 | Ustaad',
  description:
    'Work out your aggregate using each university\u2019s own published ' +
    'criteria. Pick the route that matches your application, and see where ' +
    'every mark comes from.',
}

export default function MeritIndex() {
  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Merit calculators</p>
        <h1 className={styles.title}>
          Work out your aggregate, and see where it comes from.
        </h1>
        <p className={styles.lede}>
          Every formula here is read off the university&rsquo;s own criteria
          page, and each calculator links to the page it came from. Pick the
          route that matches your application &mdash; the weighting changes if
          your result is still pending.
        </p>
      </header>

      <div className={styles.grid}>
        {MERIT.map((u) => (
          <Link key={u.slug} href={`/merit-calculator/${u.slug}`} className={styles.card}>
            <div className={styles.cardTop} style={{ '--accent': u.color }}>
              <Image src={u.logo} alt="" width={56} height={56} className={styles.crest} />
              <span className={styles.badge}>{u.short}</span>
            </div>
            {u.confidence === 'estimate' ? (
              // Said on the card, not only on the page behind it. Someone
              // who never clicks through should still know which of these
              // numbers the university actually publishes.
              <span className={styles.estimate}>Estimate &mdash; not published by the university</span>
            ) : null}
            <h2 className={styles.cardTitle}>{u.name} merit calculator</h2>
            <p className={styles.cardBody}>{u.blurb}</p>
            <p className={styles.cardGo}>
              Open calculator <span aria-hidden="true">&rarr;</span>
            </p>
          </Link>
        ))}

      </div>
    </main>
  )
}
