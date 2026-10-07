import { Link, Navigate, useLocation } from 'react-router-dom'
import { legacyRedirects } from '../data/pages'
import { usePageMeta } from '../hooks'
import Panel from '../components/Panel'
import { PageHero } from '../components/PageParts'

export default function NotFound() {
  const { pathname } = useLocation()
  usePageMeta('Page not found')
  // links to the previous site's .html pages are sent to their new home
  const legacy = legacyRedirects[decodeURIComponent(pathname.split('/').pop()).toLowerCase()]
  if (legacy) return <Navigate to={legacy} replace />
  return (
    <Panel tone="night" first>
      <PageHero title="Page not found" intro="The page you were looking for has moved or no longer exists.">
        <Link className="btn btn-primary" to="/">Go to the home page</Link>
        <Link className="btn btn-ghost light" to="/departments">Browse departments</Link>
      </PageHero>
    </Panel>
  )
}
