import { useState } from 'react'
import { site, departments, doctors, moreDoctors } from '../data/site'
import { useReveal } from '../hooks'
import { Ico, paths } from './Icons'
const init = { name: '', phone: '', email: '', date: '', dept: '', doc: 'Any available', msg: '' }
export default function Appointment() {
  const ref = useReveal(); const [f, setF] = useState(init); const [err, setErr] = useState({}); const [ok, setOk] = useState(false); const [busy, setBusy] = useState(false)
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = async () => {
    const e = {}; if (!f.name.trim()) e.name = 1; if (!/^\d{10}$/.test(f.phone.replace(/\D/g, ''))) e.phone = 1
    setErr(e); if (Object.keys(e).length) return
    if (site.formEndpoint) {
      setBusy(true)
      try { await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) }); setOk(true) }
      catch { location.href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Appointment request: ${f.name}, ${f.phone}, ${f.dept}, ${f.date}`)}` }
      setBusy(false)
    } else setOk(true)
  }
  return (
    <section className="book" id="book" ref={ref}>
      <div className="wrap">
        <div className="rv"><span className="tag">Appointment</span><h2 className="sec-title" style={{ marginTop: 18 }}>Quality healthcare at affordable prices</h2><p className="lede" style={{ marginTop: 14 }}>Tell us a little about yourself and choose a day that suits you. The front desk will call you to confirm the appointment time.</p>
          <a className="btn" href={`https://wa.me/${site.whatsapp}`} style={{ background: '#25d366', color: '#fff', marginTop: 24 }}><Ico d={paths.wa} />Chat on WhatsApp</a>
          <a className="btn btn-light" href={`tel:${site.phone.tel}`}><Ico d={paths.phone} />Call {site.phone.display}</a>
        </div>
        <div className="form rv">
          <div className="f"><label htmlFor="name">Full name</label><input className={'field' + (err.name ? ' field-error' : '')} id="name" placeholder="Patient name" value={f.name} onChange={set('name')} /></div>
          <div className="r2"><div className="f"><label htmlFor="phone">Phone number</label><input className={'field' + (err.phone ? ' field-error' : '')} id="phone" inputMode="tel" placeholder="10-digit mobile" value={f.phone} onChange={set('phone')} /></div><div className="f"><label htmlFor="email">Email <em>(optional)</em></label><input className="field" id="email" type="email" value={f.email} onChange={set('email')} /></div></div>
          <div className="r2"><div className="f"><label htmlFor="date">Preferred appointment date</label><input className="field" id="date" type="date" value={f.date} onChange={set('date')} /></div><div className="f"><label htmlFor="dept">Department</label><select className="field" id="dept" value={f.dept} onChange={set('dept')}><option value="">Choose one</option>{departments.map(d => <option key={d.name}>{d.name}</option>)}<option>Laboratory</option></select></div></div>
          <div className="f"><label htmlFor="doc">Preferred doctor <em>(optional)</em></label><select className="field" id="doc" value={f.doc} onChange={set('doc')}><option>Any available</option>{[...doctors, ...moreDoctors].map(d => <option key={d.name}>{d.name}</option>)}</select></div>
          <div className="f"><label htmlFor="msg">Message <em>(optional)</em></label><textarea className="field" id="msg" rows="3" placeholder="Anything you would like the doctor to know before your visit" value={f.msg} onChange={set('msg')} /></div>
          <button className="btn btn-primary" onClick={submit} disabled={busy}><Ico d={paths.cal} />{busy ? 'Sending…' : 'Book an Appointment'}</button>
          <p className="fine">Your details are used only to arrange your appointment.</p>
          {ok && <div className="ok" style={{ display: 'block' }}>Request received. We'll call to confirm.</div>}
        </div>
      </div>
    </section>
  )
}
