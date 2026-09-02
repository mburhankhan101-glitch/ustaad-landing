import PlayButton from './PlayButton'
import styles from './PriceAnchor.module.css'

const academy = [
  'Fixed timings, aur roz ka commute',
  'Poori class ki ek hi raftaar',
  'Pata nahi apni position kya hai',
  'Miss kiya lecture, gaya lecture',
]

const ustaad = [
  'Jab marzi, jahan marzi',
  'Apne weak topics par focus',
  'Har galti par AI explanation',
  'Har sawal jitni baar chaho',
]

export default function PriceAnchor() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <header className={styles.head}>
          <p className={styles.eyebrow}>The cost</p>
          <h2 className={styles.heading}>Academy ki fees? Yahan nahi.</h2>
        </header>

        <div className={styles.compare}>

          <div className={styles.card}>
            <p className={styles.cardLabel}>Entry test academy</p>
            <p className={styles.priceMuted}>
              Rs 30,000<span className={styles.plus}>+</span>
            </p>
            <p className={styles.per}>per course</p>
            <ul className={styles.listMuted}>
              {academy.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div className={`${styles.card} ${styles.cardOwn}`}>
            <p className={styles.cardLabelOwn}>Ustaad</p>
            <p className={styles.price}>Free</p>
            <p className={styles.per}>to start · no card needed</p>
            <ul className={styles.list}>
              {ustaad.map(item => <li key={item}>{item}</li>)}
            </ul>
            <div className={styles.cta}>
              <PlayButton placement="price-anchor" />
            </div>
          </div>

        </div>

        <p className={styles.footnote}>
          Academy figure is a typical published fee for a full entry-test course
          and varies by city and institute.
        </p>

      </div>
    </section>
  )
}
