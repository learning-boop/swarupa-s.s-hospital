import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { doctors, doctorsExtra, moreDoctors, chandanaProfile } from '../data/site'
import { deptPages } from '../data/pages'
import { usePageMeta, useReveal, reduceMotion } from '../hooks'
import Panel from '../components/Panel'
import Appointment from '../components/Appointment'
import { PageHero } from '../components/PageParts'
import { Ico, paths, ArrowBadge } from '../components/Icons'

const lead = [...doctors, ...doctorsExtra]
const deptsFor = name => deptPages.filter(d => d.doctors.some(x => x.name === name))
const specialities = ['Nephrology', 'Kidney transplant', '24-hour dialysis', 'Gynaecology', 'Fertility & IVF', 'Orthopaedics', 'Joint replacement', 'Pulmonology', 'Urology', 'Critical care', 'General surgery']

// Hero visual: arch portraits fanned out; they rise in on load and drift with the pointer
function PortraitFan() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion()) return
    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.from('.fan-card', { y: 160, rotate: 0, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.25 })
    }, el)
    const movers = [...el.querySelectorAll('.fan-in')].map((n, i) => ({ x: gsap.quickTo(n, 'x', { duration: 0.8, ease: 'power3' }), y: gsap.quickTo(n, 'y', { duration: 0.8, ease: 'power3' }), k: (i % 2 ? -1 : 1) * (6 + i * 3) }))
    const hero = el.closest('.phero')
    const move = e => {
      const r = hero.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5
      movers.forEach(m => { m.x(dx * m.k * 2); m.y(dy * m.k) })
    }
    hero.addEventListener('pointermove', move)
    return () => { hero.removeEventListener('pointermove', move); ctx.revert() }
  }, [])
  return (
    <div className="dfan" ref={ref} aria-hidden="true">
      {lead.map((d, i) => (
        <div key={d.name} className="fan-card" style={{ '--o': i - (lead.length - 1) / 2 }}>
          <div className="fan-in"><img src={d.img} alt="" /><span>{d.name.replace('Dr. ', '')}</span></div>
        </div>
      ))}
    </div>
  )
}

// Portrait that tilts slightly toward the pointer
function TiltPhoto({ src, alt }) {
  const move = e => {
    if (e.pointerType !== 'mouse' || reduceMotion()) return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`)
    e.currentTarget.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -12}deg`)
  }
  const leave = e => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg') }
  return <div className="ph" onPointerMove={move} onPointerLeave={leave}><div className="ph-in"><img src={src} alt={alt} /></div></div>
}

function Profile({ p }) {
  return (
    <div className="dprofile">
      <div><h4>Education</h4><ul>{p.education.map(([y, t, w]) => <li key={t}><span>{y}</span><b>{t}</b><small>{w}</small></li>)}</ul></div>
      <div><h4>Experience</h4><ul>{p.experience.map(([y, t, w]) => <li key={w}><span>{y}</span><b>{t}</b><small>{w}</small></li>)}</ul></div>
    </div>
  )
}

export default function DoctorsPage() {
  usePageMeta('Our Doctors', 'Meet the consultants at Sri Swarupa Super Speciality Hospital, Vijayawada: nephrology, gynaecology & IVF, orthopaedics, pulmonology, urology and more.')
  const ref = useReveal()

  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.dstack .dcardx')
      // each portrait rises up inside its arch as the card arrives
      cards.forEach(card => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 85%', once: true } })
        tl.fromTo(card.querySelector('.ph-in'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut' })
          .fromTo(card.querySelector('.ph-in img'), { scale: 1.3 }, { scale: 1, duration: 1.4, ease: 'power3.out' }, 0)
          .fromTo(card.querySelectorAll('.meta > *'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out' }, 0.2)
      })
      // education / experience timeline draws itself
      gsap.utils.toArray('.dprofile ul').forEach(ul => {
        gsap.timeline({ scrollTrigger: { trigger: ul, start: 'top 85%', once: true } })
          .fromTo(ul, { '--line': 0 }, { '--line': 1, duration: 0.9, ease: 'power2.out' })
          .fromTo(ul.children, { opacity: 0, x: -12 }, { opacity: 1, x: 0, stagger: 0.12, duration: 0.5 }, 0.2)
      })
      // desktop: cards are sticky and stack; the one underneath shrinks back as the next slides over it
      gsap.matchMedia().add('(min-width: 1000px)', () => {
        cards.forEach((card, i) => {
          const next = cards[i + 1]
          if (!next) return
          gsap.to(card, { scale: 0.94, filter: 'brightness(0.97)', ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: `top ${140 + (i + 1) * 18}px`, scrub: true } })
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [ref])

  return (
    <>
      <Panel tone="night" first>
        <PageHero crumbs={[[null, 'Our Doctors']]} eyebrow="Team of consultants" title="The doctors guiding your care" intro="Our consultants have decades of experience between them and have earned the trust of patients and their families across Vijayawada and beyond." visual={<PortraitFan />}>
          <a className="btn btn-primary btn-arrow" href="#book">Book a consultation <ArrowBadge /></a>
        </PageHero>
      </Panel>
      <Panel tone="mist">
        <section className="pbody" ref={ref}>
          <div className="wrap">
            <div className="dstack">
              {lead.map((d, i) => (
                <article key={d.name} className="dcardx" style={{ '--i': i }}>
                  <TiltPhoto src={d.img} alt={d.name} />
                  <div className="meta">
                    <span className="num">{String(i + 1).padStart(2, '0')}</span>
                    {d.telugu && <div className="te">{d.telugu}</div>}
                    <h2>{d.name}</h2>
                    <div className="q"><Ico d={paths.grad} />{d.q}</div>
                    <p>{d.text}</p>
                    {deptsFor(d.name).length > 0 && <div className="dtags">{deptsFor(d.name).map(x => <Link key={x.slug} to={`/departments/${x.slug}`}>{x.name}</Link>)}</div>}
                    {d.name.startsWith('Dr. Chandana') && <Profile p={chandanaProfile} />}
                    <a className="btn btn-navy btn-arrow" href="#book">Book a consultation <ArrowBadge /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="marquee" aria-hidden="true">
            <div className="mq-track">{[0, 1].map(k => <span key={k}>{specialities.map(s => <em key={s}>{s}<i>✦</i></em>)}</span>)}</div>
          </div>
          <div className="wrap">
            <div className="sub-head rv"><span className="tag">Also consulting</span><h2 className="sec-title">Surgeons and specialists</h2></div>
            <div className="dlist rv">
              {moreDoctors.map(d => <div key={d.name}><span className="av">{d.img ? <img src={d.img} alt="" /> : d.name.replace('Dr. ', '')[0]}</span><div><b>{d.name}</b><span>{d.q}</span></div></div>)}
            </div>
          </div>
        </section>
      </Panel>
      <Panel tone="book"><Appointment /></Panel>
    </>
  )
}
