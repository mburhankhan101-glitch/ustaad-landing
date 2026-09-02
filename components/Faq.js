import styles from './Faq.module.css'

// Native <details>, so this works with no JavaScript, is keyboard accessible,
// and is readable by search engines — these are queries students actually type.
const faqs = [
  {
    q: 'Ustaad kis kis exam ke liye hai?',
    a: 'Abhi FAST-NU entry test, NUST-NET aur NTS NAT (ICS/CS aur general) poori tarah cover hain — 3,900+ real past paper MCQs ke saath. MDCAT aur NUMS par kaam ho raha hai.',
  },
  {
    q: 'Kya Ustaad free hai?',
    a: 'Haan. Practice quizzes aur har sawal ki AI explanation free hain, aur shuru karne ke liye koi card ya payment nahi chahiye.',
  },
  {
    q: 'MDCAT aur NUMS kab aayenge?',
    a: 'Content tayar ho raha hai. In dono ka pattern alag hai, is liye jaldbaazi mein adhoora content dalne se behtar hai theek se launch karna. Neeche email chhod do — live hote hi sabse pehle aapko batayenge.',
  },
  {
    q: 'Sawal kahan se aate hain?',
    a: 'Sab asli past papers aur standard practice books se — FAST, NUST aur NTS ke actual papers. Har sawal topic aur difficulty ke hisaab se tag hota hai, taake aap apni weak jagah par drill kar sako.',
  },
  {
    q: 'Negative marking wali practice milti hai?',
    a: 'Haan. FAST-NU papers mein asli scheme lagti hai — sahi jawab par +1, galat par −0.25 — taake aap seekhein kab guess karna hai aur kab chhorna. NTS ke coloured booklet sections bhi replicate hote hain.',
  },
  {
    q: 'Kya internet ke baghair chalta hai?',
    a: 'Filhaal nahi — sawal aur explanations server se aate hain, is liye connection chahiye. Offline practice hamari list par hai.',
  },
]

export default function Faq() {
  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>

        <header className={styles.head}>
          <p className={styles.eyebrow}>Questions</p>
          <h2 className={styles.heading}>Poochne se pehle.</h2>
        </header>

        <div className={styles.list}>
          {faqs.map((f) => (
            <details key={f.q} className={styles.item}>
              <summary className={styles.q}>
                <span>{f.q}</span>
                <span className={styles.chev} aria-hidden="true" />
              </summary>
              <p className={styles.a}>{f.a}</p>
            </details>
          ))}
        </div>

      </div>
    </section>
  )
}
