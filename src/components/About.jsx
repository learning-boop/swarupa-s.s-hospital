import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { useReveal } from '../hooks'
import { Ico, paths, ArrowBadge } from './Icons'
import ArchReveal from './ArchReveal'
export default function About() {
  const ref = useReveal()
  return (
    <>
      <ArchReveal />
      <section className="about" id="about" ref={ref}>
        <div className="wrap">
          <div className="collage rv">
            <div className="p1 wipe"><img src="/img/hospital-building.jpg" alt="Sri Swarupa Super Speciality Hospital building" /></div>
            <div className="p2 wipe" style={{ transitionDelay: '.2s' }}><img src="/img/operation-theatre.jpg" alt="Operation theatre" /></div>
            <div className="float"><b>10<sup style={{ fontSize: '.5em', color: '#f2a51a' }}>th</sup> anniversary</b><small>NABH accredited · serving since {site.since}</small></div>
          </div>
          <div className="rv">
            <span className="tag">Who we are</span>
            <h2 className="sec-title" style={{ marginTop: 18 }}>Individualised and holistic care, from doctors you can trust</h2>
            <p className="lede" style={{ marginTop: 16 }}>Sri Swarupa Super Speciality Hospital provides super speciality services in medicine, ENT, joint replacement surgery, cardiac surgery, neurology, nephrology and minimal access surgery. As a tertiary referral ICU we offer state-of-the-art care with excellent professionals and infrastructure.</p>
            <ul className="checks">
              {['NABH accreditation from the National Accreditation Board for Hospitals', 'Eleven departments with senior consultants under one roof', 'Emergency, ICU, dialysis, pharmacy and lab open 24 hours'].map(t => <li key={t}><Ico d={paths.check} />{t}</li>)}
            </ul>
            <p className="te">{site.taglineTelugu}</p>
            <Link className="btn btn-navy btn-arrow" to="/doctors" style={{ marginTop: 22 }}>Meet our consultants <ArrowBadge /></Link>
          </div>
        </div>
      </section>
      <section className="strip"><div className="wrap"><div className="row rv">
        {[[paths.shield, 'NABH accredited'], [paths.clock, '24/7 emergency'], [paths.pulse, 'Tertiary referral ICU'], [paths.user, 'Expert consultants'], [paths.heart, 'Affordable pricing']].map(([d, t]) => <div key={t}><span className="ic"><Ico d={d} /></span>{t}</div>)}
      </div></div></section>
    </>
  )
}
