import styles from './SocialProof.module.css'

const testimonials = [
  {
    name: 'Hamza Hussain',
    city: 'Lahore',
    program: 'Preparing for NTS-CS',
    avatar: 'HH',
    color: '#6C63FF',
    text: '"NTS prep ke liye coloured booklets waala feature toh next level hai, bilkul real paper pattern feel hota hai. Aur upar se Ustu har mushkil sawal ki explanation chutkiyon mein de deta hai.',
  },
  {
    name: 'Taha bin Talib',
    city: 'Lahore',
    program: 'Preparing for NUST-NET',
    avatar: 'TT',
    color: '#FF6B6B',
    text: 'Finally ek jagah sab past papers mil gaye. Ustu ka weak topic tracker bata deta hai exactly kahan concentrate karna hai.',
  },
  {
    name: 'Roshaan Waqas',
    city: 'Islamabad',
    program: 'Preparing for FAST-NU',
    avatar: 'RW',
    color: '#4CAF50',
    text: 'FAST ke entry test mein negative marking sab se mushkil cheez hoti hai. Ustaad par exact real format aur negative marking ke sath practice kar ke ab tukke marne ki aadat khatam ho gayi hai. Truly a lifesaver!',
  },
]

export default function SocialProof() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.label}>Student Reviews</div>
        <h2 className={styles.heading}>
          Students bol rahe hain.<br />
          <span className={styles.purple}>Results show ho rahe hain.</span>
        </h2>

        <div className={styles.counter}>
          <span className={styles.counterNum}>135+</span>
          <span className={styles.counterText}>students on the waitlist</span>
        </div>

        <div className={styles.cards}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.card}>
              <p className={styles.quote}>"{t.text}"</p>
              <div className={styles.author}>
                <div
                  className={styles.avatar}
                  style={{ background: t.color + '22', color: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.meta}>{t.program} · {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}