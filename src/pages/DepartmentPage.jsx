import { Link, useParams } from 'react-router-dom'
import { deptBySlug, deptPages } from '../data/pages'
import { site } from '../data/site'
import { departments as deptContent } from '../data/content'
import { usePageMeta } from '../hooks'
import Panel from '../components/Panel'
import Appointment from '../components/Appointment'
import { PageHero, Prose } from '../components/PageParts'
import { Ico, paths, ArrowBadge } from '../components/Icons'
import NotFound from './NotFound'

export default function DepartmentPage() {
  const { slug } = useParams()
  const d = deptBySlug(slug)
  usePageMeta(d ? `${d.name} in Vijayawada` : 'Page not found', d && `${d.name} at Sri Swarupa Super Speciality Hospital, Vijayawada. ${d.text}`)
  if (!d) return <NotFound />
  const others = deptPages.filter(x => x.slug !== d.slug)
  return (
    <>
      <Panel tone="night" first>
        <PageHero crumbs={[['/departments', 'Departments'], [null, d.name]]} eyebrow={d.sub} title={d.name} intro={d.text} img={d.img} imgAlt={`${d.name} at Sri Swarupa`}>
          <a className="btn btn-primary btn-arrow" href="#book">Book a consultation <ArrowBadge /></a>
          <a className="btn btn-ghost light" href={`tel:${site.phone.tel}`}><Ico d={paths.phone} /> {site.phone.display}</a>
        </PageHero>
      </Panel>
      <Panel tone="white">
        <section className="pbody">
          <div className="wrap split">
            <article>
              {deptContent[d.slug]?.length ? <Prose blocks={deptContent[d.slug]} /> : <p className="lede">{d.text}</p>}
            </article>
            <aside className="side">
              {d.doctors.length > 0 && (
                <div className="sbox">
                  <h3>{d.doctors.length > 1 ? 'Consultants' : 'Consultant'}</h3>
                  {d.doctors.map(doc => (
                    <Link key={doc.name} className="sdoc" to="/doctors">
                      <span className="av">{doc.img ? <img src={doc.img} alt="" /> : doc.name.replace('Dr. ', '')[0]}</span>
                      <span><b>{doc.name}</b><small>{doc.q}</small></span>
                    </Link>
                  ))}
                </div>
              )}
              <div className="sbox navy">
                <h3>Book or ask a question</h3>
                <p>Mon–Sat, 9 am to 6 pm. Emergency and ambulance 24 hours.</p>
                <a className="btn btn-primary btn-arrow" href="#book">Book a consultation <ArrowBadge /></a>
                <a className="sphone" href={`tel:${site.phone.tel}`}><Ico d={paths.phone} /> {site.phone.display}</a>
              </div>
              <div className="sbox">
                <h3>Other departments</h3>
                <ul className="slinks">{others.map(o => <li key={o.slug}><Link to={`/departments/${o.slug}`}>{o.name}<Ico d={paths.chev} /></Link></li>)}</ul>
              </div>
            </aside>
          </div>
        </section>
      </Panel>
      <Panel tone="book"><Appointment /></Panel>
    </>
  )
}
