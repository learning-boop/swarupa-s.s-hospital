import { site } from '../data/site'
import { usePageMeta } from '../hooks'
import Panel from '../components/Panel'
import Contact from '../components/Contact'
import Appointment from '../components/Appointment'
import { PageHero } from '../components/PageParts'
import { Ico, paths } from '../components/Icons'

export default function ContactPage() {
  usePageMeta('Contact Us', `Contact Sri Swarupa Super Speciality Hospital: ${site.address}. Phone ${site.phone.display}, 24/7 emergency and ambulance.`)
  return (
    <>
      <Panel tone="night" first>
        <PageHero crumbs={[[null, 'Contact']]} eyebrow="Open 24 hours for emergencies" title="Contact us" intro="Call, visit or send us your details and our front desk will confirm an appointment time with you.">
          <a className="btn btn-primary" href={`tel:${site.phone.tel}`}><Ico d={paths.phone} /> {site.phone.display}</a>
          <a className="btn btn-ghost light" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener"><Ico d={paths.wa} /> WhatsApp</a>
        </PageHero>
      </Panel>
      <Panel tone="white"><Contact /></Panel>
      <Panel tone="book"><Appointment /></Panel>
    </>
  )
}
