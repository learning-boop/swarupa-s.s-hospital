import { Suspense, lazy, useEffect, useRef } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Panel from './components/Panel'
import Home from './pages/Home'
import { useSmoothScroll, usePanelCurves, useRouteScroll } from './hooks'

// inner pages load on demand so the home page stays light
const AboutPage = lazy(() => import('./pages/AboutPage'))
const DepartmentsPage = lazy(() => import('./pages/DepartmentsPage'))
const DepartmentPage = lazy(() => import('./pages/DepartmentPage'))
const DoctorsPage = lazy(() => import('./pages/DoctorsPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ClinicalPage = lazy(() => import('./pages/ClinicalPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const VideosPage = lazy(() => import('./pages/VideosPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PolicyPage = lazy(() => import('./pages/PolicyPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const solidAt = useRef(40) // scroll position after which the header turns solid (the home Hero raises it)
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  useSmoothScroll()
  useRouteScroll(pathname, hash)
  usePanelCurves(pathname)
  // "#book" links (header, footer, sticky bar) go to the Contact page's form on pages without one
  useEffect(() => {
    const f = e => {
      const a = e.target.closest('a[href="#book"]')
      if (a && !document.getElementById('book')) { e.preventDefault(); navigate('/contact#book') }
    }
    document.addEventListener('click', f, true)
    return () => document.removeEventListener('click', f, true)
  }, [navigate])
  return (
    <>
      <Header solidAt={solidAt} />
      <main id="top">
        <Suspense fallback={<div className="page-loading" />}>
        <Routes>
          <Route path="/" element={<Home solidAt={solidAt} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/departments/:slug" element={<DepartmentPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ClinicalPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<PolicyPage kind="terms" />} />
          <Route path="/privacy" element={<PolicyPage kind="privacy" />} />
          <Route path="/refund" element={<PolicyPage kind="refund" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Panel tone="night"><Footer /></Panel>
    </>
  )
}
