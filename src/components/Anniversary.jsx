import { anniversary as a } from '../data/site'
import { useReveal } from '../hooks'
import { ArrowBadge } from './Icons'
const cols = ['#f2a51a', '#e31b74', '#12a5a0', '#1f3c9c', '#fabac5']
const confetti = Array.from({ length: 34 }, (_, i) => ({ left: Math.random() * 100, bg: cols[i % cols.length], dur: 5 + Math.random() * 6, delay: -Math.random() * 10, w: 6 + Math.random() * 6, h: 10 + Math.random() * 8 }))
export default function Anniversary() {
  const ref = useReveal()
  if (!a.enabled) return null
  return (
    <section className="anniv" id="anniversary" ref={ref}><div className="wrap"><div className="abox rv">
      <div className="confetti" aria-hidden="true">{confetti.map((c, i) => <i key={i} style={{ left: `${c.left}%`, background: c.bg, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s`, width: c.w, height: c.h }} />)}</div>
      <div className="big10"><img src="/img/10th-anniversary.png" alt="10th anniversary" className="tenbig" /><div className="wish te">{a.wish}</div></div>
      <div style={{ position: 'relative' }}>
        <div className="te">{a.telugu}</div>
        <h2>{a.title}</h2>
        <p>{a.text}</p>
        <div className="offers">{a.offers.map(([b, s]) => <div key={b}><b>{b}</b><span>{s}</span></div>)}</div>
        <p className="fine">{a.fine}</p>
        <a className="btn btn-primary btn-arrow" href="#book">Claim anniversary offer <ArrowBadge /></a>
      </div>
    </div></div></section>
  )
}
