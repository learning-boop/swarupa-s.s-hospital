import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { gallery } from '../data/pages'
import { usePageMeta } from '../hooks'
import Panel from '../components/Panel'
import Appointment from '../components/Appointment'
import { PageHero } from '../components/PageParts'
import { Ico, paths } from '../components/Icons'

const cats = ['All', ...new Set(gallery.map(g => g.cat))]

export default function GalleryPage() {
  usePageMeta('Gallery', 'Photos of Sri Swarupa Super Speciality Hospital, Vijayawada: the building, reception, dialysis unit, operation theatre, lab, pharmacy and rooms.')
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(-1)
  const shown = gallery.filter(g => cat === 'All' || g.cat === cat)
  const step = n => setOpen(i => (i + n + shown.length) % shown.length)

  useEffect(() => {
    if (open < 0) return
    const k = e => { if (e.key === 'Escape') setOpen(-1); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  })

  return (
    <>
      <Panel tone="night" first>
        <PageHero crumbs={[[null, 'Gallery']]} eyebrow="Inside Sri Swarupa" title="Gallery" intro="A look around the hospital: our building in Labbipet, the reception, dialysis unit, operation theatre, lab, pharmacy and patient rooms.">
          <Link className="btn btn-ghost light" to="/videos">Watch our videos</Link>
        </PageHero>
      </Panel>
      <Panel tone="white">
        <section className="pbody">
          <div className="wrap">
            <div className="filters" role="tablist" aria-label="Filter photos">
              {cats.map(c => <button key={c} role="tab" aria-selected={c === cat} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}
            </div>
            <div className="ggrid">
              {shown.map((g, i) => (
                <button key={g.src} className="gitem" onClick={() => setOpen(i)} aria-label={`Open photo: ${g.alt}`}>
                  <img src={g.src} alt={g.alt} loading="lazy" /><span>{g.alt}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </Panel>
      <Panel tone="book"><Appointment /></Panel>
      {open >= 0 && shown[open] && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={shown[open].alt} onClick={() => setOpen(-1)}>
          <figure onClick={e => e.stopPropagation()}>
            <img src={shown[open].src} alt={shown[open].alt} />
            <figcaption>{shown[open].alt}<span>{open + 1} / {shown.length}</span></figcaption>
          </figure>
          <button className="lb-x" aria-label="Close" onClick={() => setOpen(-1)}>×</button>
          <button className="lb-nav prev" aria-label="Previous photo" onClick={e => { e.stopPropagation(); step(-1) }}><Ico d={paths.left} /></button>
          <button className="lb-nav next" aria-label="Next photo" onClick={e => { e.stopPropagation(); step(1) }}><Ico d={paths.right} /></button>
        </div>
      )}
    </>
  )
}
