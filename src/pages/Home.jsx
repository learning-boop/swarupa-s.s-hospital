import Hero from '../components/Hero'
import About from '../components/About'
import Departments from '../components/Departments'
import Why from '../components/Why'
import Stats from '../components/Stats'
import Ethos from '../components/Ethos'
import Anniversary from '../components/Anniversary'
import Journey from '../components/Journey'
import Doctors from '../components/Doctors'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import Appointment from '../components/Appointment'
import Contact from '../components/Contact'
import Panel from '../components/Panel'
import { usePageMeta } from '../hooks'

export default function Home({ solidAt }) {
  usePageMeta(null, 'NABH accredited 200-bed super speciality hospital in Vijayawada since 2013. Nephrology, urology, kidney transplant, 24-hour dialysis, gynaecology, fertility & IVF, orthopaedics, neurology, cardiac clinic. Call 0866 243 3979.')
  return (
    <>
      <Panel tone="night" first><Hero solidAt={solidAt} /></Panel>
      <Panel tone="mist"><About /></Panel>
      <Panel tone="white"><Departments /><Why /><Stats /></Panel>
      <Panel tone="night"><Ethos /></Panel>
      <Panel tone="blush"><Anniversary /><Journey /></Panel>
      <Panel tone="mist"><Doctors /></Panel>
      <Panel tone="white"><Testimonials /><Faq /></Panel>
      <Panel tone="book"><Appointment /></Panel>
      <Panel tone="white"><Contact /></Panel>
    </>
  )
}
