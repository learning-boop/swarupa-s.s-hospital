import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { site } from '../data/site'
import { reduceMotion } from '../hooks'

// Statement that lights up word by word as it scrolls through the viewport;
// words wrapped in *asterisks* are highlighted in sky blue once lit.
const STATEMENT = `For over a decade, Sri Swarupa has brought *super speciality care* to Vijayawada. Senior consultants, a *tertiary referral ICU* and *round-the-clock emergency*, so your family never has to travel far for the care it needs.`

export default function Ethos() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (reduceMotion()) { el.classList.add('static'); return }
    const ctx = gsap.context(() => {
      gsap.fromTo('.lit .w', { opacity: 0.16 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: '.lit', start: 'top 80%', end: 'bottom 50%', scrub: true } })
      gsap.fromTo('.slide-card', { clipPath: 'inset(0% 7% 0% 7% round 48px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'none', scrollTrigger: { trigger: '.slide-card', start: 'top bottom', end: 'top 25%', scrub: true } })
      gsap.fromTo('.slide-card img', { yPercent: -8, scale: 1.15 }, { yPercent: 8, scale: 1.15, ease: 'none', scrollTrigger: { trigger: '.slide-card', start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.fromTo('.slide-words .l1', { xPercent: 2 }, { xPercent: -34, ease: 'none', scrollTrigger: { trigger: '.slide-card', start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.fromTo('.slide-words .l2', { xPercent: -52 }, { xPercent: -16, ease: 'none', scrollTrigger: { trigger: '.slide-card', start: 'top bottom', end: 'bottom top', scrub: true } })
    }, el)
    return () => ctx.revert()
  }, [])

  // a highlight runs from the word opening with * to the word closing with * (before any punctuation)
  let on = false
  const marked = STATEMENT.split(' ').map(w => {
    if (w.startsWith('*')) on = true
    const word = { t: w.replace(/\*/g, ''), hl: on }
    if (/\*[.,]?$/.test(w)) on = false
    return word
  })

  return (
    <section className="ethos" ref={ref}>
      <div className="wrap">
        <span className="tag tag-dark">Our promise</span>
        <p className="lit" aria-label={STATEMENT.replace(/\*/g, '')}>
          {marked.map((w, i) => <span key={i} aria-hidden="true" className={'w' + (w.hl ? ' hl' : '')}>{w.t} </span>)}
        </p>
        <p className="ethos-sub">NABH accredited · {site.beds} beds · caring since {site.since}</p>
      </div>

      <div className="wrap">
        <div className="slide-card">
          <img src="/img/hospital-building.jpg" alt="Sri Swarupa Super Speciality Hospital, Labbipet, Vijayawada" loading="lazy" />
          <div className="slide-words" aria-hidden="true">
            <div className="l1">{'Decades of experience · '.repeat(3)}</div>
            <div className="l2">{'Modern technology · '.repeat(3)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
