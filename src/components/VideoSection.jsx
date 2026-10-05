import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { reduceMotion } from '../hooks'

const VIDEO = '/video/sri-swarupa-hospital.mp4' // hospital's own Telugu promo film (0:54, with sound)
const POSTER = '/video/sri-swarupa-hospital.jpg'

// Poster + play button; the 11 MB file only starts loading when the visitor presses play.
// Plays with sound and native controls, pauses if scrolled out of view, and returns to the poster when it ends.
export default function VideoSection() {
  const ref = useRef(null)
  const vid = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current, v = vid.current
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting && !v.paused) v.pause() }, { threshold: 0.25 })
    io.observe(el)
    let ctx
    if (!reduceMotion()) ctx = gsap.context(() => {
      gsap.fromTo('.vframe', { scale: 0.92 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.vframe', start: 'top bottom', end: 'top 30%', scrub: true } })
    }, el)
    return () => { io.disconnect(); ctx?.revert() }
  }, [])

  const play = () => {
    const v = vid.current
    if (!v.getAttribute('src')) v.src = VIDEO
    setStarted(true)
    v.play().catch(() => {})
  }
  const ended = () => { const v = vid.current; v.currentTime = 0; v.load(); setStarted(false) }

  return (
    <section className="vsec" ref={ref}>
      <div className="wrap">
        <div className="vhead">
          <span className="tag">Watch</span>
          <h2 className="sec-title">Sri Swarupa in under a minute</h2>
          <p className="sub">Meet our senior consultants and see the care available under one roof, from kidney transplant and 24-hour dialysis to fertility, IVF and keyhole surgery.</p>
        </div>
        <div className={'vframe' + (started ? ' started' : '')}>
          <video ref={vid} poster={POSTER} preload="none" playsInline controls={started} onEnded={ended}
            aria-label="Sri Swarupa Super Speciality Hospital introduction video, in Telugu" />
          {!started && (
            <button className="vplay" onClick={play} aria-label="Play hospital introduction video (Telugu, 54 seconds, with sound)">
              <span className="ring"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span>
              <span className="lbl">Play video<small>Telugu · 0:54 · sound on</small></span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
