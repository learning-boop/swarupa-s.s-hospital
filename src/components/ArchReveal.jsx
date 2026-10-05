import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { reduceMotion } from '../hooks'

// Scroll-scrubbed reveal: an arch-shaped photo rises over giant "Step into expert care" type
// and grows to full screen, then a caption fades in. The stage is CSS-sticky inside a tall section.
export default function ArchReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (reduceMotion()) { el.classList.add('static'); return }
    const mobile = innerWidth <= 720
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
      tl.fromTo('.ar-arch', { clipPath: mobile ? 'inset(32vh 10vw 0vh 10vw round 40vw 40vw 0vw 0vw)' : 'inset(40vh 31vw 0vh 31vw round 19vw 19vw 0vw 0vw)' },
        { clipPath: 'inset(0vh 0vw 0vh 0vw round 0vw 0vw 0vw 0vw)', ease: 'power1.inOut', duration: 1 }, 0)
        .fromTo('.ar-arch img', { scale: 1.35 }, { scale: 1, duration: 1.1 }, 0)
        .to('.ar-title', { yPercent: -40, opacity: 0, duration: 0.45 }, 0.3)
        .to('.ar-shade', { opacity: 1, duration: 0.3 }, 0.7)
        .fromTo('.ar-copy > *', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.3 }, 0.8)
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section className="reveal" ref={ref} aria-label="Inside Sri Swarupa">
      <div className="ar-stage">
        <h2 className="ar-title"><span>Step into</span>expert care</h2>
        <div className="ar-arch">
          <img src="/img/operation-theatre.jpg" alt="Operation theatre at Sri Swarupa Super Speciality Hospital" />
          <div className="ar-shade" />
        </div>
        <div className="ar-copy wrap">
          <span className="tag tag-dark">Inside Sri Swarupa</span>
          <p className="ar-head">Modern theatres, a tertiary referral ICU and 24-hour dialysis, designed around your recovery</p>
          <p className="ar-sub">All under one roof in Labbipet, Vijayawada.</p>
        </div>
      </div>
    </section>
  )
}
