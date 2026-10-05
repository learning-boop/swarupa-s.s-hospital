import { useEffect, useRef, useState } from 'react'
import { site, departments } from '../data/site'
import { useReveal } from '../hooks'
function Count({ to }) {
  const [v, setV] = useState(0); const r = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(es => { if (!es[0].isIntersecting) return; io.disconnect(); const t0 = performance.now()
      const f = t => { const p = Math.min(1, Math.max(0, (t - t0) / 1600)); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(f) }; requestAnimationFrame(f) }, { threshold: .3 })
    io.observe(r.current); return () => io.disconnect()
  }, [to])
  return <span ref={r}>{v}</span>
}
export default function Stats() {
  const ref = useReveal()
  return (
    <section className="stats" ref={ref}><div className="wrap"><div className="box rv">
      <div><b><Count to={site.beds} /></b><span>Beds across super speciality departments</span></div>
      <div><b>24/7</b><span>Emergency, ICU, dialysis, pharmacy and lab</span></div>
      <div><b><Count to={departments.length} /></b><span>Medical departments with senior consultants</span></div>
      <div><b>{site.since}</b><span>Serving Vijayawada and beyond since</span></div>
    </div></div></section>
  )
}
