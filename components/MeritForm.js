'use client'

import { useMemo, useState } from 'react'
import { aggregate, round2 } from '../lib/merit'
import styles from './MeritForm.module.css'

/**
 * The calculator.
 *
 * Two rules it does not break:
 *
 *   1. It shows nothing until every field of the chosen route is filled with
 *      a possible number. A form that treats blanks as zero produces an
 *      aggregate far below the real one, and a student who believes it may
 *      decide not to apply at all. Silence is the safe failure here.
 *
 *   2. It shows the working, not just the total. Three quarters of a NUST
 *      aggregate is NET, and a student who can see 52.5 of their 74.48
 *      coming from one row learns where the marks actually are — which is
 *      more useful than the total they came for.
 */
/** Prefilled totals for a route, where the data gives one. */
function seedTotals(route) {
  const seed = {}
  for (const part of route.parts) {
    if (part.defaultTotal != null) seed[part.id] = { total: String(part.defaultTotal) }
  }
  return seed
}

export default function MeritForm({ uni }) {
  const [routeId, setRouteId] = useState(uni.routes[0].id)

  // Some totals are known but not fixed — MDCAT has not always been out of
  // 180 — so they are prefilled and left editable rather than hard-coded.
  const [values, setValues] = useState(() => seedTotals(uni.routes[0]))

  const route = uni.routes.find((r) => r.id === routeId) ?? uni.routes[0]

  const result = useMemo(() => aggregate(route, values), [route, values])

  function set(partId, field, raw) {
    setValues((v) => ({ ...v, [partId]: { ...v[partId], [field]: raw } }))
  }

  return (
    <div className={styles.wrap}>
      <fieldset className={styles.routes}>
        <legend className={styles.legend}>Which applies to you?</legend>
        {uni.routes.map((r) => (
          <label
            key={r.id}
            className={`${styles.route} ${r.id === routeId ? styles.routeOn : ''}`}
          >
            <input
              type="radio"
              name="route"
              value={r.id}
              checked={r.id === routeId}
              onChange={() => {
              setRouteId(r.id)
              setValues(seedTotals(r))
            }}
              className={styles.radio}
            />
            <span>
              <span className={styles.routeLabel}>{r.label}</span>
              {r.hint ? <span className={styles.routeHint}>{r.hint}</span> : null}
            </span>
          </label>
        ))}
      </fieldset>

      <div className={styles.fields}>
        {route.parts.map((part, i) => (
          <div key={part.id} className={styles.field}>
            <label className={styles.fieldLabel} htmlFor={`${part.id}-a`}>
              <span className={styles.step}>{i + 1}</span>
              {part.label}
              <span className={styles.weight}>{Math.round(part.weight * 100)}%</span>
            </label>

            {part.kind === 'marks' ? (
              <div className={styles.pair}>
                {/* Both boxes are named. The visible label sits on the row
                    rather than on each field, so without these a screen
                    reader reaches the second box and announces nothing but
                    "edit text" — two identical unnamed number fields. */}
                <input
                  id={`${part.id}-a`}
                  className={styles.input}
                  type="number"
                  inputMode="numeric"
                  placeholder="Obtained"
                  aria-label={`${part.label}, marks obtained`}
                  value={values[part.id]?.obtained ?? ''}
                  onChange={(e) => set(part.id, 'obtained', e.target.value)}
                />
                <span className={styles.outOf}>out of</span>
                <input
                  className={styles.input}
                  type="number"
                  inputMode="numeric"
                  placeholder="Total"
                  aria-label={`${part.label}, total marks`}
                  value={values[part.id]?.total ?? ''}
                  onChange={(e) => set(part.id, 'total', e.target.value)}
                />
              </div>
            ) : part.kind === 'score' ? (
              <div className={styles.single}>
                <input
                  id={`${part.id}-a`}
                  className={styles.input}
                  type="number"
                  inputMode="numeric"
                  placeholder={`For example, ${Math.round(part.outOf * 0.75)}`}
                  aria-label={`${part.label}, out of ${part.outOf}`}
                  value={values[part.id]?.obtained ?? ''}
                  onChange={(e) => set(part.id, 'obtained', e.target.value)}
                />
                <span className={styles.outOf}>out of {part.outOf}</span>
              </div>
            ) : (
              <div className={styles.single}>
                <input
                  id={`${part.id}-a`}
                  className={styles.input}
                  type="number"
                  inputMode="numeric"
                  placeholder="For example, 88"
                  value={values[part.id]?.percent ?? ''}
                  onChange={(e) => set(part.id, 'percent', e.target.value)}
                />
                <span className={styles.outOf}>%</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.resultBox} aria-live="polite">
        {result ? (
          <>
            <p className={styles.resultLabel}>
              {uni.confidence === 'estimate' ? 'Estimated aggregate' : 'Your aggregate'}
            </p>
            <p className={styles.resultValue}>{round2(result.total)}%</p>

            <table className={styles.working}>
              <tbody>
                {result.breakdown.map((b) => (
                  <tr key={b.id}>
                    <th scope="row">{b.label}</th>
                    <td>{round2(b.percent)}%</td>
                    <td className={styles.times}>&times; {Math.round(b.weight * 100)}%</td>
                    <td className={styles.contrib}>{round2(b.contribution)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className={styles.caveat}>
              {uni.confidence === 'estimate'
                ? 'This uses a weighting the university does not publish. Treat it as a rough position only. '
                : 'This is your aggregate, not a merit position. Where it lands depends on who else applied this year. '}
              <a href={uni.source.url} target="_blank" rel="noopener noreferrer">
                Check the official criteria
              </a>{' '}
              before you apply.
            </p>
          </>
        ) : (
          // Said out loud rather than showing a zero. A zero looks like an
          // answer, and this is the absence of one.
          <p className={styles.waiting}>
            Fill in every field above and your aggregate appears here.
          </p>
        )}
      </div>
    </div>
  )
}
