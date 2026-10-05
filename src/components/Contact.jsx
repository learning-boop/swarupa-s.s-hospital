import { site } from '../data/site'
import { useReveal } from '../hooks'
import { Ico, paths } from './Icons'
export default function Contact() {
  const ref = useReveal()
  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="wrap">
        <div className="rv"><span className="tag">Contact</span><h2 className="sec-title" style={{ marginTop: 18 }}>Visit or call us</h2>
          <div className="cinfo">
            <div><span className="ic"><Ico d={paths.pin} /></span><div><b>Address</b><span>{site.address}</span></div></div>
            <div><span className="ic"><Ico d={paths.phone} /></span><div><b>Phone</b><a className="big" href={`tel:${site.phone.tel}`}>{site.phone.display}</a></div></div>
            <div><span className="ic"><Ico d={paths.mail} /></span><div><b>Email</b><span>{site.email}</span></div></div>
            <div><span className="ic"><Ico d={paths.clock} /></span><div><b>Hours</b><span>{site.hours}</span></div></div>
          </div>
        </div>
        <div className="map rv"><iframe title="Map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={site.mapEmbed} /></div>
      </div>
    </section>
  )
}
