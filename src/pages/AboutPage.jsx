import { Link } from 'react-router-dom'
import { site, departments } from '../data/site'
import { usePageMeta, useReveal } from '../hooks'
import Panel from '../components/Panel'
import Why from '../components/Why'
import Testimonials from '../components/Testimonials'
import Appointment from '../components/Appointment'
import { PageHero } from '../components/PageParts'
import { Ico, paths, ArrowBadge } from '../components/Icons'

const facilities = [
  [paths.ambulance, '24-hour ambulance', 'Open 24 hours a day, 365 days a year, reaching patients in and around Vijayawada quickly.'],
  [paths.pulse, 'Intensive care unit', 'A tertiary referral ICU providing intensive medicine and critical care.'],
  [paths.check, 'Laboratory', 'CT, MRI, ultrasound and a full range of blood, kidney, vitamin, thyroid, lipid and sugar tests.'],
  [paths.heart, 'Pharmacy', 'Pharmacists advise patients and caregivers on dosage, administration and precautions.'],
  [paths.user, 'Ultrasonography', 'Diagnostic imaging of tendons, muscles, joints, blood vessels and internal organs.'],
  [paths.shield, 'Pathology lab', 'Laboratory medicine for blood, urine and tissue, led by experienced specialists.'],
]

export default function AboutPage() {
  usePageMeta('About Us', `Sri Swarupa Super Speciality Hospital is a NABH accredited ${site.beds}-bed hospital in Vijayawada, in operation since ${site.since}.`)
  const ref = useReveal()
  return (
    <>
      <Panel tone="night" first>
        <PageHero crumbs={[[null, 'About Us']]} eyebrow={`NABH accredited · since ${site.since}`} title="Individualised, holistic care in Vijayawada" intro={`A ${site.beds}-bed super speciality hospital using advanced facilities and treatment options, with senior consultants across ${departments.length} departments under one roof.`} img="/img/hospital-building-wide.jpg" imgAlt="Sri Swarupa Super Speciality Hospital building, Labbipet, Vijayawada" />
      </Panel>
      <Panel tone="white">
        <section className="pbody" ref={ref}>
          <div className="wrap">
            <div className="about2">
              <div className="pic rv"><img src="/img/operation-theatre.jpg" alt="Operation theatre at Sri Swarupa" /></div>
              <div className="rv">
                <span className="tag">Who we are</span>
                <h2 className="sec-title" style={{ marginTop: 16 }}>Super speciality care, close to home</h2>
                <p className="lede" style={{ marginTop: 14 }}>Sri Swarupa Super Speciality Hospital provides super speciality services in medicine, ENT, joint replacement surgery, cardiac surgery, neurology, nephrology and minimal access surgery. As an integral part of clinical treatment, we provide every patient with individualised and holistic care.</p>
                <p className="te" style={{ marginTop: 14, color: 'var(--accent-deep)' }}>{site.taglineTelugu}</p>
                <div className="nums">
                  <div><b>{site.beds}</b><span>beds</span></div>
                  <div><b>{departments.length}</b><span>departments</span></div>
                  <div><b>24/7</b><span>emergency</span></div>
                  <div><b>{site.since}</b><span>established</span></div>
                </div>
              </div>
            </div>
            <div className="mv">
              <div className="rv"><span className="ic"><Ico d={paths.heart} /></span><h3>Our mission</h3><p>To establish a high-quality healthcare facility that provides the best practices through compassionate care, while adhering to the culture and values of true professionalism with a human touch.</p></div>
              <div className="rv" style={{ transitionDelay: '.1s' }}><span className="ic"><Ico d={paths.check} /></span><h3>Our vision</h3><p>To bring compassionate healthcare up to international standards: a patient-centred system that transforms lives through exceptional clinical quality and unrivalled dedication from our physicians and staff.</p></div>
            </div>
            <div className="sub-head rv"><span className="tag">Facilities</span><h2 className="sec-title">Everything you need, on site</h2></div>
            <div className="fgrid">
              {facilities.map(([d, t, x], i) => <div key={t} className="rv" style={{ transitionDelay: `${(i % 3) * .06}s` }}><span className="ic"><Ico d={d} /></span><h3>{t}</h3><p>{x}</p></div>)}
            </div>
            <div className="rv" style={{ marginTop: 34, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link className="btn btn-navy btn-arrow" to="/departments">Explore departments <ArrowBadge /></Link>
              <Link className="btn btn-ghost" to="/gallery">See the hospital</Link>
            </div>
          </div>
        </section>
      </Panel>
      <Panel tone="mist"><Why /></Panel>
      <Panel tone="white"><Testimonials /></Panel>
      <Panel tone="book"><Appointment /></Panel>
    </>
  )
}
