import { useReveal } from '../hooks'
import { ArrowBadge } from './Icons'
import VideoSection from './VideoSection'
const steps = ['Call or book online', 'Consultation', 'Diagnostics & lab', 'Treatment & care', 'Follow-up & support']
export default function Journey() {
  const ref = useReveal()
  return (
    <>
      <section className="journey" ref={ref}><div className="wrap"><div className="jbox rv">
        <div><span className="tag tag-dark">Your visit, step by step</span><h2>Five steps, each explained before it begins</h2><p>A hospital visit can feel overwhelming. We map it out at the start so you always know where you are and what comes next.</p><a className="btn btn-light btn-arrow" href="#book" style={{ marginTop: 24 }}>Book an appointment <ArrowBadge /></a></div>
        <div className="bars">{steps.map((s, i) => <div key={s} className="bar"><div className="pill"><b>{i + 1}</b><i style={{ '--h': `${40 + i * 15}%`, '--d': `${i * .15}s` }} /></div><span>{s}</span></div>)}</div>
      </div></div></section>
      <VideoSection />
    </>
  )
}
