import { site, nav } from '../data/site'
import { Ico, paths } from './Icons'
const useful = ['Best Nephrologist in Vijayawada', 'Best Urologist in Vijayawada', 'Best IVF Centre in Vijayawada', 'Best Gynecologist in Vijayawada', 'Best Orthopedics in Vijayawada', 'Best Neurologist in Vijayawada']
export default function Footer() {
  return (
    <>
      <footer>
        <div className="wrap">
          <div className="cta"><h2 className="script" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>{site.tagline}</h2><a className="btn btn-primary" href="#book">Book an Appointment</a></div>
          <div className="fcols">
            <div><span className="logo"><img src="/img/logo.jpg" alt={site.name} /></span><p>One of the best super speciality hospitals in Vijayawada, using advanced facilities and treatment options. NABH accredited, in operation since {site.since}.</p></div>
            <div><h4>Quick links</h4><ul>{nav.slice(1).map(([h, l]) => <li key={h}><a href={h}>{l}</a></li>)}</ul></div>
            <div><h4>Useful links</h4><ul>{useful.map(u => <li key={u}><a href="#departments">{u}</a></li>)}</ul></div>
            <div><h4>Contact</h4><ul><li><Ico d={paths.pin} />{site.address}</li><li><Ico d={paths.phone} /><a href={`tel:${site.phone.tel}`}>{site.phone.display}</a></li><li><Ico d={paths.mail} />{site.email}</li></ul><a className="em" href={`tel:${site.phone.tel}`}>24/7 Emergency · {site.phone.display}</a></div>
          </div>
          <div className="fbot"><span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span><span>Terms and Conditions · Privacy Policy · Cancellation &amp; Refund</span></div>
        </div>
      </footer>
      <a className="wa" href={`https://wa.me/${site.whatsapp}`} aria-label="WhatsApp"><Ico d={paths.wa} style={{ width: 26, height: 26 }} /></a>
      <div className="sticky"><a className="c" href={`tel:${site.phone.tel}`}>Call</a><a className="e" href={`tel:${site.phone.tel}`}>Emergency</a><a className="b" href="#book">Book</a></div>
    </>
  )
}
