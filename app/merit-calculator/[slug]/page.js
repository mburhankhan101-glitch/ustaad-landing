import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import MeritForm from '../../../components/MeritForm'
import { MERIT, meritBySlug, faqsFor } from '../../../lib/merit'
import styles from './Uni.module.css'

// Known at build time, so every calculator is a static page.
export function generateStaticParams() {
  return MERIT.map((u) => ({ slug: u.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const uni = meritBySlug(slug)
  if (!uni) return {}
  return {
    title: `${uni.name} merit calculator 2027 | Ustaad`,
    description:
      `Calculate your ${uni.name} aggregate from your ${uni.test} score, ` +
      `Matric and Inter marks, using the published criteria.`,
    alternates: { canonical: `/merit-calculator/${slug}` },
    openGraph: {
      title: `${uni.name} merit calculator 2027`,
      description: `Your ${uni.name} aggregate, and where every mark comes from.`,
      url: `/merit-calculator/${slug}`,
      type: 'website',
    },
  }
}

export default async function UniMerit({ params }) {
  const { slug } = await params
  const uni = meritBySlug(slug)
  if (!uni) notFound()

  const faqs = faqsFor(uni)

  // Two schemas, both generated from the same data the page renders, so the
  // answer Google caches cannot drift from the arithmetic the calculator
  // runs. FAQPage is what earns the expandable result; BreadcrumbList is
  // what replaces the raw URL under it.
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ustaadapp.online' },
        { '@type': 'ListItem', position: 2, name: 'Merit calculators', item: 'https://www.ustaadapp.online/merit-calculator' },
        { '@type': 'ListItem', position: 3, name: `${uni.name} merit calculator` },
      ],
    },
  ]

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/merit-calculator">Merit calculators</Link>
        <span aria-hidden="true">/</span>
        <span>{uni.name}</span>
      </nav>

      <header className={styles.head}>
        <Image src={uni.logo} alt="" width={64} height={64} className={styles.crest} />
        <div>
          <h1 className={styles.title}>{uni.name} merit calculator 2027</h1>
          <p className={styles.lede}>
            Your aggregate from your {uni.test} score and your school results.
          </p>
        </div>
      </header>

      {uni.confidence === 'estimate' ? (
        <aside className={styles.estimate}>
          <strong>This one is an estimate.</strong> {uni.estimateNote}
        </aside>
      ) : null}

      <MeritForm uni={uni} />

      <section className={styles.info}>
        <h2 className={styles.infoTitle}>How {uni.name} calculates merit</h2>

        {/* The formula in words, from the same data the calculator runs on,
            so the explanation cannot drift from the arithmetic. */}
        {uni.routes.map((r) => (
          <div key={r.id} className={styles.formula}>
            <h3 className={styles.formulaName}>{r.label}</h3>
            <p className={styles.formulaLine}>
              {r.parts.map((p, i) => (
                <span key={p.id}>
                  {i > 0 ? ' + ' : ''}
                  <strong>{Math.round(p.weight * 100)}%</strong> {p.label}
                </span>
              ))}
            </p>
          </div>
        ))}

        <div className={styles.note}>
          <h3 className={styles.noteHead}>Eligibility</h3>
          <p className={styles.noteBody}>{uni.eligibility}</p>
        </div>

        {uni.notes.map((n) => (
          <div key={n.heading} className={styles.note}>
            <h3 className={styles.noteHead}>{n.heading}</h3>
            <p className={styles.noteBody}>{n.body}</p>
          </div>
        ))}

        <h2 className={styles.infoTitle} id="faqs">
          {uni.name} merit calculator FAQs
        </h2>
        <dl className={styles.faqs}>
          {faqs.map((f) => (
            <div key={f.q} className={styles.faq}>
              <dt className={styles.faqQ}>{f.q}</dt>
              <dd className={styles.faqA}>{f.a}</dd>
            </div>
          ))}
        </dl>

        <p className={styles.source}>
          Taken from{' '}
          <a href={uni.source.url} target="_blank" rel="noopener noreferrer">
            {uni.source.label}
          </a>
          , checked {uni.source.checked}. Universities change criteria between
          intakes &mdash; read the official page before you apply.
        </p>
      </section>
    </main>
  )
}
