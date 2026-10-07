import { useState } from 'react'
import { videos } from '../data/pages'
import { usePageMeta } from '../hooks'
import Panel from '../components/Panel'
import Appointment from '../components/Appointment'
import { PageHero } from '../components/PageParts'

// YouTube loads only after a click (thumbnail facade), using the privacy-enhanced domain
function YouTube({ id, title }) {
  const [on, setOn] = useState(false)
  return on
    ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
    : <button className="yt" onClick={() => setOn(true)} aria-label={`Play video: ${title}`}><img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" /><span className="ring"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span></button>
}

export default function VideosPage() {
  usePageMeta('Videos', 'Videos of Sri Swarupa Super Speciality Hospital, Vijayawada.')
  return (
    <>
      <Panel tone="night" first>
        <PageHero crumbs={[[null, 'Videos']]} eyebrow="Watch" title="Videos" intro="Meet our consultants and see the care available at Sri Swarupa Super Speciality Hospital." />
      </Panel>
      <Panel tone="white">
        <section className="pbody">
          <div className="wrap vgrid">
            {videos.map(v => (
              <figure key={v.id ?? v.src} className="vcard">
                <div className="vbox16">{v.kind === 'youtube' ? <YouTube id={v.id} title={v.title} /> : <video src={v.src} poster={v.poster} controls preload="none" playsInline />}</div>
                <figcaption>{v.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </Panel>
      <Panel tone="book"><Appointment /></Panel>
    </>
  )
}
