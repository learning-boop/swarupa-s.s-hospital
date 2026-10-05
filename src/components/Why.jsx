import { useState } from 'react'
import { why } from '../data/site'
import { useReveal } from '../hooks'
import { Ico, paths } from './Icons'
export default function Why() {
  const ref = useReveal(); const [open, setOpen] = useState(0)
  return (
    <section className="why" ref={ref}>
      <div className="wrap">
        <div className="rv">
          <span className="tag">Why choose us</span>
          <h2 className="sec-title" style={{ marginTop: 18 }}>Why families across Andhra Pradesh choose Sri Swarupa</h2>
          <p className="lede" style={{ marginTop: 14 }}>Choosing a hospital is a serious decision. These are the commitments we hold ourselves to.</p>
          <div className="acc">
            {why.map(([t, b], i) => (
              <div key={t} className={'it' + (open === i ? ' open' : '')}>
                <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span><span className="n">0{i + 1}.</span>{t}</span><Ico d={paths.chev} /></button>
                <div className="body" style={{ maxHeight: open === i ? 200 : 0 }}><p>{b}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="pic wipe rv">
          <img src="/img/operation-theatre.jpg" alt="Operation theatre" />
          <div className="over"><h3>We have the entire infrastructure to handle any complication.</h3>
            <ul>{['Kidney transplant', '24-hour dialysis', 'Joint replacement', 'Laparoscopic surgery', 'Fertility & IVF', 'CT, MRI & ultrasound'].map(t => <li key={t}><Ico d={paths.tick} />{t}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}
