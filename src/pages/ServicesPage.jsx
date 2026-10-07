import { Link } from 'react-router-dom'
import { services, clinicalPages } from '../data/pages'
import { usePageMeta, useReveal } from '../hooks'
import Panel from '../components/Panel'
import Appointment from '../components/Appointment'
import { PageHero } from '../components/PageParts'
import { Ico, paths } from '../components/Icons'

export default function ServicesPage() {
  usePageMeta('Services', 'Emergency & trauma care, 24-hour ambulance, ICU, diagnostics, pharmacy, health check-ups, insurance and clinical support services at Sri Swarupa, Vijayawada.')
  const ref = useReveal()
  return (
    <>
      <Panel tone="night" first>
        <PageHero crumbs={[[null, 'Services']]} eyebrow="Open 24 hours" title="Hospital services" intro="Emergency, intensive care, diagnostics and pharmacy run round the clock, so treatment never has to wait for a referral elsewhere." />
      </Panel>
      <Panel tone="white">
        <section className="pbody" ref={ref}>
          <div className="wrap">
            <div className="sgrid">
              {services.map((s, i) => (
                <article key={s.title} className="scard rv" style={{ transitionDelay: `${(i % 3) * .06}s` }}>
                  <div className="ph"><img src={s.img} alt="" loading="lazy" /></div>
                  <div className="body"><h3>{s.title}</h3><p>{s.text}</p></div>
                </article>
              ))}
            </div>
            <div className="sub-head rv" id="clinical"><span className="tag">Clinical support</span><h2 className="sec-title">Diagnostics, rehabilitation and support departments</h2></div>
            <div className="cgrid">
              {clinicalPages.map(c => (
                <Link key={c.slug} className="ccard rv" to={`/services/${c.slug}`}>
                  <span className="ic"><svg viewBox="0 0 48 48" aria-hidden="true"><path d={c.icon} /></svg></span>
                  <span><b>{c.title}</b><small>{c.text}</small></span><Ico d={paths.arrow} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Panel>
      <Panel tone="book"><Appointment /></Panel>
    </>
  )
}
