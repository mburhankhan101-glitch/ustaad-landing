'use client'
import { useState } from 'react'
import questions from '../lib/demoQuestions.json'
import styles from './QuestionDemo.module.css'

const LETTERS = ['A', 'B', 'C', 'D']

/**
 * Explanations are written as a run of labelled parts — "Concept: … Solution: …
 * Trick: … Mistake: …". Splitting on those labels lets the panel show the same
 * structure the app does instead of one grey paragraph.
 */
const PARTS = ['Concept', 'Solution', 'Trick', 'Mistake']

function parseExplanation(raw) {
  if (!raw) return []
  const pattern = new RegExp(`(?:^|\\s)(${PARTS.join('|')}):\\s*`, 'g')
  const out = []
  const matches = [...raw.matchAll(pattern)]

  if (!matches.length) return [{ label: null, body: raw.trim() }]

  matches.forEach((m, i) => {
    const start = m.index + m[0].length
    const end = i + 1 < matches.length ? matches[i + 1].index : raw.length
    const body = raw.slice(start, end).trim()
    if (body) out.push({ label: m[1], body })
  })
  return out
}

export default function QuestionDemo() {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [lang, setLang] = useState('en')

  const q = questions[index]
  const answered = picked !== null
  const gotItRight = picked === q.correctIndex
  const parts = parseExplanation(lang === 'en' ? q.explanationEn : q.explanationUr)

  function next() {
    setIndex((index + 1) % questions.length)
    setPicked(null)
    setLang('en')
  }

  return (
    <section className={styles.section} id="try">
      <div className={styles.inner}>

        <header className={styles.head}>
          <p className={styles.eyebrow}>Try it right now</p>
          <h2 className={styles.heading}>
            Jawab dekhna asaan hai.<br />
            Asal cheez hai <span className={styles.mark}>kyun</span>.
          </h2>
          <p className={styles.sub}>
            Ek asli sawal, asli past paper se. Jawab chuno — Ustu wahi explanation
            dega jo app ke andar milta hai.
          </p>
        </header>

        <div className={styles.board}>
          <div className={styles.boardTop}>
            <span className={styles.tag}>{q.exam} · {q.topic}</span>
            <span className={styles.counter}>
              {String(index + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
            </span>
          </div>

          <p className={styles.question}>{q.text}</p>

          <ul className={styles.options}>
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correctIndex
              const isPicked = i === picked
              let state = ''
              if (answered && isCorrect) state = styles.correct
              else if (answered && isPicked) state = styles.wrong
              else if (answered) state = styles.muted

              return (
                <li key={i}>
                  <button
                    type="button"
                    className={`${styles.option} ${state}`}
                    onClick={() => !answered && setPicked(i)}
                    disabled={answered}
                    aria-pressed={isPicked}
                  >
                    <span className={styles.letter}>{LETTERS[i]}</span>
                    <span className={styles.optText}>{opt}</span>
                    {answered && isCorrect && <span className={styles.tick} aria-label="Correct">✓</span>}
                    {answered && isPicked && !isCorrect && <span className={styles.cross} aria-label="Your answer">✕</span>}
                  </button>
                </li>
              )
            })}
          </ul>

          {!answered && (
            <p className={styles.prompt}>Koi ek option chuno ↑</p>
          )}

          {answered && (
            <div className={styles.explain}>
              <div className={styles.explainTop}>
                <div className={styles.who}>
                  <span className={styles.owl} aria-hidden="true">🦉</span>
                  <div>
                    <p className={styles.whoName}>Ustu ka jawab</p>
                    <p className={styles.whoVerdict} data-right={gotItRight}>
                      {gotItRight ? 'Bilkul sahi!' : `Sahi jawab: ${LETTERS[q.correctIndex]}`}
                    </p>
                  </div>
                </div>

                <div className={styles.langToggle} role="group" aria-label="Explanation language">
                  <button
                    type="button"
                    className={lang === 'en' ? styles.langOn : styles.langOff}
                    onClick={() => setLang('en')}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    className={lang === 'ur' ? styles.langOn : styles.langOff}
                    onClick={() => setLang('ur')}
                  >
                    اردو
                  </button>
                </div>
              </div>

              <dl className={styles.parts}>
                {parts.map((p, i) => (
                  <div key={i} className={styles.part}>
                    {p.label && <dt className={styles.partLabel}>{p.label}</dt>}
                    <dd className={styles.partBody}>{p.body}</dd>
                  </div>
                ))}
              </dl>

              <div className={styles.actions}>
                <button type="button" className={styles.next} onClick={next}>
                  Agla sawal →
                </button>
                <span className={styles.note}>
                  App mein har sawal ke saath yeh explanation hai. Free.
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
