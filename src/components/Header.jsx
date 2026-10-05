import { useEffect, useState } from 'react'
import { nav, site } from '../data/site'
import { Ico, paths } from './Icons'

export default function Header({ solidAt }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setSolid(scrollY > (solidAt.current ?? 40))
    addEventListener('scroll', f, { passive: true }); f()
    return () => removeEventListener('scroll', f)
  }, [solidAt])
  return (
    <>
      <header className={'hdr' + (solid ? ' solid' : '')}>
        <a className="ebar" href={`tel:${site.phone.tel}`}><span className="dot" /><Ico d={paths.ambulance} /><span><b>24/7 Emergency &amp; Ambulance</b><span className="sep"> · </span><span className="num">Call {site.phone.display}</span></span></a>
        <div className="wrap">
          <a className="logo" href="#top" aria-label="Sri Swarupa Super Speciality Hospital"><img src="/img/logo.jpg" alt="Sri Swarupa Super Speciality Hospital, NABH accredited" /></a>
          <nav className="pill-nav" aria-label="Main">{nav.map(([h, l]) => <a key={h} href={h}>{l}</a>)}</nav>
          <div className="right">
            <a className="fert" href="#departments" aria-label="Swarupa Fertility & IVF Centre"><img src="/img/swarupa-fertility-logo.jpg" alt="Swarupa Fertility & IVF Centre" /></a>
            <a className="btn btn-primary" href="#book">Book Appointment</a>
            <button className="burger" aria-label="Open menu" onClick={() => setOpen(true)}><Ico d={paths.menu} /></button>
          </div>
        </div>
      </header>
      <div className={'mmenu' + (open ? ' open' : '')}>
        <button className="x" aria-label="Close" onClick={() => setOpen(false)}>×</button>
        {nav.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
        <a className="btn btn-primary" href="#book" onClick={() => setOpen(false)} style={{ alignSelf: 'flex-start', fontFamily: 'var(--sans)' }}>Book Appointment</a>
      </div>
    </>
  )
}
