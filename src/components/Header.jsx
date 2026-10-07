import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav, site } from '../data/site'
import { deptPages } from '../data/pages'
import { Ico, paths } from './Icons'

export default function Header({ solidAt }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [dd, setDd] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const f = () => setSolid(scrollY > (solidAt.current ?? 40))
    addEventListener('scroll', f, { passive: true }); f()
    return () => removeEventListener('scroll', f)
  }, [solidAt, pathname])
  useEffect(() => { setOpen(false); setDd(false) }, [pathname])

  return (
    <>
      <header className={'hdr' + (solid ? ' solid' : '')}>
        <a className="ebar" href={`tel:${site.phone.tel}`}><span className="dot" /><Ico d={paths.ambulance} /><span><b>24/7 Emergency &amp; Ambulance</b><span className="sep"> · </span><span className="num">Call {site.phone.display}</span></span></a>
        <div className="wrap">
          <Link className="logo" to="/" aria-label="Sri Swarupa Super Speciality Hospital, home"><img src="/img/logo.jpg" alt="Sri Swarupa Super Speciality Hospital, NABH accredited" /></Link>
          <nav className="pill-nav" aria-label="Main">
            {nav.map(([h, l]) => h === '/departments' ? (
              <div key={h} className={'has-dd' + (dd ? ' open' : '')} onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
                <NavLink to={h} onFocus={() => setDd(true)}>{l} <Ico d={paths.chev} style={{ width: 14, height: 14, transform: 'rotate(90deg)' }} /></NavLink>
                <div className="dd" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setDd(false) }}>
                  {deptPages.map(d => <Link key={d.slug} to={`/departments/${d.slug}`}><svg viewBox="0 0 48 48" aria-hidden="true"><path d={d.icon} /></svg><span><b>{d.name}</b><small>{d.sub}</small></span></Link>)}
                  <Link className="all" to="/departments">All departments →</Link>
                </div>
              </div>
            ) : <NavLink key={h} to={h} end={h === '/'}>{l}</NavLink>)}
          </nav>
          <div className="right">
            <Link className="fert" to="/departments/fertility-and-ivf" aria-label="Swarupa Fertility & IVF Centre"><img src="/img/swarupa-fertility-logo.jpg" alt="Swarupa Fertility & IVF Centre" /></Link>
            <a className="btn btn-primary" href="#book">Book Appointment</a>
            <button className="burger" aria-label="Open menu" onClick={() => setOpen(true)}><Ico d={paths.menu} /></button>
          </div>
        </div>
      </header>
      <div className={'mmenu' + (open ? ' open' : '')}>
        <button className="x" aria-label="Close" onClick={() => setOpen(false)}>×</button>
        {nav.map(([h, l]) => <NavLink key={h} to={h} end={h === '/'}>{l}</NavLink>)}
        <a className="btn btn-primary" href="#book" onClick={() => setOpen(false)} style={{ alignSelf: 'flex-start', fontFamily: 'var(--sans)' }}>Book Appointment</a>
      </div>
    </>
  )
}
