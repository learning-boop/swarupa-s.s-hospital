import { useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Departments from './components/Departments'
import Why from './components/Why'
import Stats from './components/Stats'
import Anniversary from './components/Anniversary'
import Journey from './components/Journey'
import Doctors from './components/Doctors'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Appointment from './components/Appointment'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Ethos from './components/Ethos'
import { useSmoothScroll, usePanelCurves } from './hooks'

// Sections are grouped into panels of alternating tone; each panel after the first
// rises over the previous one with a curved top edge (see usePanelCurves + .panel CSS).
const Panel = ({ tone, first, children }) => <div className={`panel tone-${tone}${first ? '' : ' curve'}`}>{children}</div>

export default function App() {
  const solidAt = useRef(40) // scroll position after which the header turns solid (set by Hero)
  useSmoothScroll()
  usePanelCurves()
  return (
    <>
      <Header solidAt={solidAt} />
      <main id="top">
        <Panel tone="night" first><Hero solidAt={solidAt} /></Panel>
        <Panel tone="mist"><About /></Panel>
        <Panel tone="white"><Departments /><Why /><Stats /></Panel>
        <Panel tone="night"><Ethos /></Panel>
        <Panel tone="blush"><Anniversary /><Journey /></Panel>
        <Panel tone="mist"><Doctors /></Panel>
        <Panel tone="white"><Testimonials /><Faq /></Panel>
        <Panel tone="book"><Appointment /></Panel>
        <Panel tone="white"><Contact /></Panel>
      </main>
      <Panel tone="night"><Footer /></Panel>
    </>
  )
}
