import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { site, doctors, departments } from '../data/site'
import { reduceMotion } from '../hooks'
import { Ico, paths, ArrowBadge } from './Icons'

const DURATION = 6500 // ms per slide; drives the tab progress bars via --dur

// each slide pairs a background photo with the rotating headline word and a feature card
const slides = [
  { tab: 'Nephrology', word: 'healthy kidneys', img: '/img/dialysis-unit.jpg', pos: '62% 45%', doc: doctors[0], role: 'Kidney transplant & dialysis' },
  { tab: 'Women & IVF', word: 'growing families', img: '/img/hospital-building.jpg', pos: '50% 30%', doc: doctors[1], role: 'Gynaecology, fertility & IVF' },
  { tab: 'Orthopaedics', word: 'active joints', img: '/img/operation-theatre.jpg', pos: '15% 45%', doc: doctors[2], role: 'Knee, shoulder & joint replacement' },
  { tab: 'Emergency', word: 'every emergency', img: '/img/hospital-building.jpg', pos: '50% 88%', emergency: true },
]

const stats = [
  { n: site.beds, label: 'beds' },
  { n: 24, suffix: '/7', label: 'emergency & ambulance' },
  { n: departments.length, label: 'specialities' },
  { n: site.since, from: 1990, label: 'caring since' },
]

// one heartbeat repeated across a 1440-unit-wide line
const beat = x => `L${x + 40} 60 L${x + 50} 48 L${x + 58} 72 L${x + 70} 14 L${x + 82} 100 L${x + 92} 60 L${x + 180} 60`
const ECG = 'M0 60 ' + Array.from({ length: 8 }, (_, k) => beat(k * 180)).join(' ')

function Count({ n, from = 0, suffix = '' }) {
  const [v, setV] = useState(reduceMotion() ? n : from)
  useEffect(() => {
    if (reduceMotion()) return
    let raf, t0
    const tick = t => { t0 ??= t; const p = Math.min(1, (t - t0) / 1600); setV(Math.round(from + (n - from) * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick) }
    const id = setTimeout(() => (raf = requestAnimationFrame(tick)), 900)
    return () => { clearTimeout(id); cancelAnimationFrame(raf) }
  }, [n, from])
  return <>{v}{suffix}</>
}

export default function Hero({ solidAt }) {
  const ref = useRef(null)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const still = reduceMotion()

  useEffect(() => {
    // header turns solid once the hero has mostly scrolled away (straight away on stacked mobile layout)
    const set = () => { solidAt.current = innerWidth <= 900 ? 40 : Math.max(40, ref.current.offsetHeight - 90) }
    set(); addEventListener('resize', set)
    return () => { removeEventListener('resize', set); solidAt.current = 40 }
  }, [solidAt])

  useEffect(() => {
    if (still || paused) return
    const id = setTimeout(() => setI(x => (x + 1) % slides.length), DURATION)
    return () => clearTimeout(id)
  }, [i, paused, still])

  const s = slides[i]
  const hold = v => () => setPaused(v)

  return (
    <section className={'hero' + (paused ? ' paused' : '') + (still ? ' still' : '')} id="hero" ref={ref} style={{ '--dur': `${DURATION}ms` }}>
      <div className="slides" aria-hidden="true">
        {slides.map((sl, k) => <div key={k} className={'slide' + (k === i ? ' on' : '')}><img src={sl.img} alt="" style={{ objectPosition: sl.pos }} /></div>)}
      </div>
      <div className="shade" />

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="tag tag-dark hz" style={{ '--d': '.05s' }}>NABH accredited · {site.beds}-bed super speciality<span className="hide-sm"> · Vijayawada</span></span>
          <div className="script hz" style={{ '--d': '.15s' }}>{site.tagline}</div>
          <h1 className="hz" style={{ '--d': '.25s' }}>
            Expert care for <span className="rot" aria-live="polite"><span key={i} className="word">{s.word}</span></span>
          </h1>
          <p className="lede hz" style={{ '--d': '.45s' }}>Kidney transplant, 24-hour dialysis, fertility &amp; IVF, a tertiary referral ICU and round-the-clock emergency, all under one roof in Vijayawada.</p>

          <div className="ctas hz" style={{ '--d': '.55s' }}>
            <a className="btn btn-primary btn-arrow" href="#book">Book an Appointment <ArrowBadge /></a>
            <a className="btn btn-ghost light hide-sm" href={`tel:${site.phone.tel}`}><Ico d={paths.phone} /> Call {site.phone.display}</a>
          </div>

          <div className="tabs hz" style={{ '--d': '.65s' }} role="tablist" aria-label="Specialities" onMouseEnter={hold(true)} onMouseLeave={hold(false)}>
            {slides.map((sl, k) => (
              <button key={k} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)} onFocus={hold(true)} onBlur={hold(false)}>
                <span className="lbl">{sl.tab}</span><span className="prog"><i key={k === i ? i : 'x'} /></span>
              </button>
            ))}
          </div>
        </div>

        <div className="feature" key={i}>
          {s.emergency ? (
            <a className="fcard em" href={`tel:${site.phone.tel}`}>
              <span className="pulse"><Ico d={paths.ambulance} /></span>
              <div><small>24/7 emergency &amp; ambulance</small><b>{site.phone.display}</b><span className="note">Ventilator-equipped ambulances with expert paramedics</span></div>
            </a>
          ) : (
            <Link className="fcard" to="/doctors">
              <img src={s.doc.img} alt={s.doc.name} />
              <div><small>{s.tab}</small><b>{s.doc.name}</b><span className="note">{s.doc.q} · {s.role}</span></div>
            </Link>
          )}
        </div>
      </div>

      <svg className="ecg" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d={ECG} className="base" />
        <path d={ECG} className="trace" pathLength="1000" />
      </svg>

      <div className="hstats">
        <ul className="wrap">{stats.map(st => <li key={st.label}><b><Count {...st} /></b><span>{st.label}</span></li>)}</ul>
      </div>
    </section>
  )
}
