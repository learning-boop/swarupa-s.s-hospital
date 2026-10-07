import { Link } from 'react-router-dom'
import { deptPages, clinicalPages } from '../data/pages'
import { supportServices } from '../data/site'
import { usePageMeta, useReveal } from '../hooks'
import Panel from '../components/Panel'
import Appointment from '../components/Appointment'
import { PageHero } from '../components/PageParts'
import { DeptPhoto } from '../components/Departments'
import { Ico, paths } from '../components/Icons'

export default function DepartmentsPage() {
  usePageMeta('Departments', 'Super speciality departments at Sri Swarupa, Vijayawada: nephrology, urology, gynaecology, fertility & IVF, orthopaedics, cardiac clinic, neurology and more.')
  const ref = useReveal()
  return (
    <>
      <Panel tone="night" first>
        <PageHero crumbs={[[null, 'Departments']]} eyebrow={`${deptPages.length} super speciality departments`} title="Departments" intro="Every department is led by senior consultants, with the ICU, theatres, dialysis, lab and pharmacy on site to handle complications under one roof." />
      </Panel>
      <Panel tone="white">
        <section className="pbody" ref={ref}>
          <div className="wrap">
            <div className="dgrid-all">
              {deptPages.map((d, i) => (
                <Link key={d.slug} className={'dcard rv ' + d.tone} to={`/departments/${d.slug}`} style={{ transitionDelay: `${(i % 4) * .06}s` }}>
                  <DeptPhoto d={d} />
                  <div className="body"><div className="k">{d.sub}</div><h3>{d.name}</h3><p>{d.text}</p><div className="more">Explore department <Ico d={paths.arrow} /></div></div>
                </Link>
              ))}
            </div>
            <div className="sub-head rv" id="clinical"><span className="tag">Clinical support</span><h2 className="sec-title">Diagnostics, rehabilitation and support</h2></div>
            <div className="cgrid">
              {clinicalPages.map(c => (
                <Link key={c.slug} className="ccard rv" to={`/services/${c.slug}`}>
                  <span className="ic"><svg viewBox="0 0 48 48" aria-hidden="true"><path d={c.icon} /></svg></span>
                  <span><b>{c.title}</b><small>{c.text}</small></span><Ico d={paths.arrow} />
                </Link>
              ))}
            </div>
            <div className="also rv" style={{ marginTop: 40 }}><h4>Supportive services at Sri Swarupa</h4><div className="chips">{supportServices.map(s => <span key={s}>{s}</span>)}</div></div>
          </div>
        </section>
      </Panel>
      <Panel tone="book"><Appointment /></Panel>
    </>
  )
}
