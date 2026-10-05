import { useEffect, useState } from 'react'
import { quotes } from '../data/site'
import { useReveal } from '../hooks'
import { Ico, paths } from './Icons'
export default function Testimonials() {
  const ref = useReveal(); const [i, setI] = useState(0); const [vis, setVis] = useState(true)
  const go = n => { setVis(false); setTimeout(() => { setI(((n % quotes.length) + quotes.length) % quotes.length); setVis(true) }, 250) }
  useEffect(() => { const id = setInterval(() => go(i + 1), 6500); return () => clearInterval(id) })
  const [t, w, c] = quotes[i]
  return (
    <section className="testi" id="stories" ref={ref}>
      <div className="wrap">
        <div className="rv"><span className="tag">Patient stories</span><h2 className="sec-title" style={{ marginTop: 18 }}>What our patients say</h2>
          <div className="tcard"><div className="qm">“</div>
            <div style={{ opacity: vis ? 1 : 0, transition: 'opacity .25s' }}><p>{t}</p><div className="who"><div><b>{w}</b><small>{c}</small></div>
              <div className="nav"><button aria-label="Previous" onClick={() => go(i - 1)}><Ico d={paths.left} /></button><button aria-label="Next" onClick={() => go(i + 1)}><Ico d={paths.right} /></button></div></div></div>
          </div>
          <p style={{ fontSize: '.85rem', marginTop: 14 }}>Reviews shared by patients of Sri Swarupa Super Speciality Hospital.</p>
        </div>
        <div className="pic wipe rv"><img src="/img/hospital-building.jpg" alt="Sri Swarupa Super Speciality Hospital" /></div>
      </div>
    </section>
  )
}
