import { doctors, moreDoctors } from '../data/site'
import { useReveal } from '../hooks'
import { Ico, paths, ArrowBadge } from './Icons'
export default function Doctors() {
  const ref = useReveal()
  return (
    <section className="docs center" id="doctors" ref={ref}>
      <div className="wrap">
        <div className="rv"><span className="tag">Team of consultants</span><h2 className="sec-title" style={{ marginTop: 18 }}>The doctors guiding your care</h2><p className="sub">Our consultants have decades of experience between them and have earned the trust of patients and their families.</p></div>
        <div className="dgrid" style={{ textAlign: 'left' }}>
          {doctors.map((d, i) => (
            <div key={d.name} className="doc rv" style={{ transitionDelay: `${i * .12}s` }}>
              <div className="ph wipe"><img src={d.img} alt={d.name} /></div>
              <div className="meta"><div className="te">{d.telugu}</div><h3>{d.name}</h3><div className="q"><Ico d={paths.grad} />{d.q}</div><p>{d.text}</p><a className="btn btn-ghost btn-arrow" href="#book">Book a consultation <ArrowBadge /></a></div>
            </div>
          ))}
        </div>
        <div className="dlist rv" style={{ textAlign: 'left' }}>
          {moreDoctors.map(d => <div key={d.name}><span className="av">{d.img ? <img src={d.img} alt="" /> : d.name.replace('Dr. ', '')[0]}</span><div><b>{d.name}</b><span>{d.q}</span></div></div>)}
        </div>
      </div>
    </section>
  )
}
