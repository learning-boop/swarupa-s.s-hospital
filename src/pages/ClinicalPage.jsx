import { Link, useParams } from 'react-router-dom'
import { clinicalBySlug, clinicalPages } from '../data/pages'
import { site } from '../data/site'
import { clinical } from '../data/content'
import { usePageMeta } from '../hooks'
import Panel from '../components/Panel'
import Appointment from '../components/Appointment'
import { PageHero, Prose } from '../components/PageParts'
import { Ico, paths, ArrowBadge } from '../components/Icons'
import NotFound from './NotFound'

export default function ClinicalPage() {
  const { slug } = useParams()
  const c = clinicalBySlug(slug)
  usePageMeta(c ? c.title : 'Page not found', c && `${c.title} at Sri Swarupa Super Speciality Hospital, Vijayawada. ${c.text}`)
  if (!c) return <NotFound />
  // the first paragraph becomes the intro; the rest is the body
  const blocks = clinical[slug]?.blocks ?? []
  const [first, ...rest] = blocks[0]?.p ? blocks : [{ p: c.text }, ...blocks]
  return (
    <>
      <Panel tone="night" first>
        <PageHero crumbs={[['/services', 'Services'], [null, c.title]]} eyebrow="Clinical support" title={c.title} intro={first.p} />
      </Panel>
      <Panel tone="white">
        <section className="pbody">
          <div className="wrap split">
            <article><Prose blocks={rest} /></article>
            <aside className="side">
              <div className="sbox navy">
                <h3>Questions or appointments</h3>
                <p>Our front desk can help with tests, reports and referrals.</p>
                <a className="btn btn-primary btn-arrow" href="#book">Book an appointment <ArrowBadge /></a>
                <a className="sphone" href={`tel:${site.phone.tel}`}><Ico d={paths.phone} /> {site.phone.display}</a>
              </div>
              <div className="sbox">
                <h3>Other support services</h3>
                <ul className="slinks">{clinicalPages.filter(x => x.slug !== slug).map(o => <li key={o.slug}><Link to={`/services/${o.slug}`}>{o.title}<Ico d={paths.chev} /></Link></li>)}</ul>
              </div>
            </aside>
          </div>
        </section>
      </Panel>
      <Panel tone="book"><Appointment /></Panel>
    </>
  )
}
