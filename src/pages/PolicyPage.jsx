import { policies } from '../data/content'
import { usePageMeta } from '../hooks'
import Panel from '../components/Panel'
import { PageHero, Prose } from '../components/PageParts'

const titles = { terms: 'Terms and conditions', privacy: 'Privacy policy', refund: 'Cancellation and refund' }

export default function PolicyPage({ kind }) {
  usePageMeta(titles[kind])
  // the first block repeats the page title on the source pages
  const blocks = policies[kind].blocks.filter((b, i) => !(i === 0 && b.h))
  return (
    <>
      <Panel tone="night" first><PageHero crumbs={[[null, titles[kind]]]} title={titles[kind]} /></Panel>
      <Panel tone="white"><section className="pbody"><div className="wrap narrow"><Prose blocks={blocks} /></div></section></Panel>
    </>
  )
}
