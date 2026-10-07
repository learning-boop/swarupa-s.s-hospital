import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { departments, supportServices } from '../data/site'
import { deptSlug } from '../data/pages'
import { useReveal } from '../hooks'
import { Ico, paths } from './Icons'

// Photos live in public/img/departments/<slug>.jpg (e.g. nephrology.jpg); until one exists the card shows its icon art.

export function DeptPhoto({ d }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={'ph' + (failed ? ' fallback' : '')}>
      {!failed && <img src={d.img ?? `/img/departments/${deptSlug(d.name)}.jpg`} alt={`${d.name} at Sri Swarupa Super Speciality Hospital`} loading="lazy" onError={() => setFailed(true)} />}
      {failed && <svg className="art-ic" viewBox="0 0 48 48" aria-hidden="true"><path d={d.icon} /></svg>}
      <span className="badge-ic" aria-hidden="true"><svg viewBox="0 0 48 48"><path d={d.icon} /></svg></span>
    </div>
  )
}

const perView = () => { const w = innerWidth; return w <= 460 ? 1 : w <= 700 ? 2 : w <= 1000 ? 3 : 4 }

export default function Departments() {
  const ref = useReveal()
  const track = useRef(null)
  const [page, setPage] = useState(0)
  const [pv, setPv] = useState(4)
  useEffect(() => { const f = () => { setPv(perView()); setPage(0) }; f(); addEventListener('resize', f); return () => removeEventListener('resize', f) }, [])
  const pages = Math.ceil(departments.length / pv)
  const go = i => setPage(((i % pages) + pages) % pages)
  useEffect(() => { const id = setInterval(() => go(page + 1), 5000); return () => clearInterval(id) })
  useEffect(() => {
    const t = track.current; if (!t || !t.children[0]) return
    const step = (t.children[0].getBoundingClientRect().width + 18) * pv
    t.style.transform = `translateX(-${Math.min(page * step, t.scrollWidth - t.clientWidth)}px)`
  }, [page, pv])
  return (
    <section className="depts center" id="departments" ref={ref}>
      <div className="wrap">
        <div className="rv"><span className="tag">Medical departments</span><h2 className="sec-title" style={{ marginTop: 18 }}>Super speciality departments under one roof</h2><p className="sub">Every department is led by senior consultants with the infrastructure to handle complications on site.</p></div>
        <div className="slider rv">
          <div className="track" ref={track}>
            {departments.map(d => (
              <Link key={d.name} className={'dcard ' + d.tone} to={`/departments/${deptSlug(d.name)}`}>
                <DeptPhoto d={d} />
                <div className="body">
                  <div className="k">{d.sub}</div><h3>{d.name}</h3><p>{d.text}</p>
                  <div className="more">Explore department <Ico d={paths.arrow} /></div>
                </div>
              </Link>
            ))}
          </div>
          <div className="snav">
            <button aria-label="Previous" onClick={() => go(page - 1)}><Ico d={paths.left} /></button>
            <div className="dots">{Array.from({ length: pages }, (_, i) => <i key={i} className={i === page ? 'on' : ''} onClick={() => go(i)} />)}</div>
            <button aria-label="Next" onClick={() => go(page + 1)}><Ico d={paths.right} /></button>
          </div>
        </div>
        <div className="also rv" style={{ textAlign: 'left' }}><h4>Supportive services at Sri Swarupa</h4><div className="chips">{supportServices.map(s => <span key={s}>{s}</span>)}</div></div>
      </div>
    </section>
  )
}
