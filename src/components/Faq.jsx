import { useState } from 'react'
import { site, faq } from '../data/site'
import { useReveal } from '../hooks'
import { Ico, paths } from './Icons'
export default function Faq() {
  const ref = useReveal(); const [open, setOpen] = useState(0)
  return (
    <section className="faq" ref={ref}><div className="wrap"><div className="fbox rv">
      <div><span className="tag tag-dark">Questions</span><h2>Questions patients often ask</h2><p className="l">Not finding your answer here? Call or message us and the front desk will help.</p>
        <div className="fcontact">
          <a href={`tel:${site.phone.tel}`}><span className="ic"><Ico d={paths.phone} /></span><div><small>Call the hospital</small><b>{site.phone.display}</b></div></a>
          <a href={`mailto:${site.email}`}><span className="ic g"><Ico d={paths.mail} /></span><div><small>Email</small><b>{site.email}</b></div></a>
        </div>
      </div>
      <div className="qs">
        {faq.map(([q, a], i) => (
          <div key={q} className={'q' + (open === i ? ' open' : '')}>
            <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{q}<i>+</i></button>
            <div className="a" style={{ maxHeight: open === i ? 220 : 0 }}><p>{a}</p></div>
          </div>
        ))}
      </div>
    </div></div></section>
  )
}
