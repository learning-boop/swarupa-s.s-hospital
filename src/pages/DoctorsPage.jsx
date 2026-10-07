import { Link } from 'react-router-dom'
import { doctors, doctorsExtra, moreDoctors, chandanaProfile } from '../data/site'
import { deptPages } from '../data/pages'
import { usePageMeta, useReveal } from '../hooks'
import Panel from '../components/Panel'
import Appointment from '../components/Appointment'
import { PageHero } from '../components/PageParts'
import { Ico, paths, ArrowBadge } from '../components/Icons'

const deptsFor = name => deptPages.filter(d => d.doctors.some(x => x.name === name))

function Profile({ p }) {
  return (
    <div className="dprofile">
      <div><h4>Education</h4><ul>{p.education.map(([y, t, w]) => <li key={t}><span>{y}</span><b>{t}</b><small>{w}</small></li>)}</ul></div>
      <div><h4>Experience</h4><ul>{p.experience.map(([y, t, w]) => <li key={w}><span>{y}</span><b>{t}</b><small>{w}</small></li>)}</ul></div>
    </div>
  )
}

export default function DoctorsPage() {
  usePageMeta('Our Doctors', 'Meet the consultants at Sri Swarupa Super Speciality Hospital, Vijayawada: nephrology, gynaecology & IVF, orthopaedics, pulmonology, urology and more.')
  const ref = useReveal()
  const lead = [...doctors, ...doctorsExtra]
  return (
    <>
      <Panel tone="night" first>
        <PageHero crumbs={[[null, 'Our Doctors']]} eyebrow="Team of consultants" title="The doctors guiding your care" intro="Our consultants have decades of experience between them and have earned the trust of patients and their families across Vijayawada and beyond." />
      </Panel>
      <Panel tone="mist">
        <section className="pbody" ref={ref}>
          <div className="wrap">
            <div className="dlead">
              {lead.map((d, i) => (
                <article key={d.name} className="dcardx rv" style={{ transitionDelay: `${(i % 2) * .08}s` }}>
                  <div className="ph"><img src={d.img} alt={d.name} /></div>
                  <div className="meta">
                    {d.telugu && <div className="te">{d.telugu}</div>}
                    <h2>{d.name}</h2>
                    <div className="q"><Ico d={paths.grad} />{d.q}</div>
                    <p>{d.text}</p>
                    {deptsFor(d.name).length > 0 && <div className="dtags">{deptsFor(d.name).map(x => <Link key={x.slug} to={`/departments/${x.slug}`}>{x.name}</Link>)}</div>}
                    {d.name.startsWith('Dr. Chandana') && <Profile p={chandanaProfile} />}
                    <a className="btn btn-navy btn-arrow" href="#book">Book a consultation <ArrowBadge /></a>
                  </div>
                </article>
              ))}
            </div>
            <div className="sub-head rv"><span className="tag">Also consulting</span><h2 className="sec-title">Surgeons and specialists</h2></div>
            <div className="dlist rv">
              {moreDoctors.map(d => <div key={d.name}><span className="av">{d.img ? <img src={d.img} alt="" /> : d.name.replace('Dr. ', '')[0]}</span><div><b>{d.name}</b><span>{d.q}</span></div></div>)}
            </div>
          </div>
        </section>
      </Panel>
      <Panel tone="book"><Appointment /></Panel>
    </>
  )
}
