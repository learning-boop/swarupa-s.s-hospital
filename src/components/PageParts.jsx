import { Link } from 'react-router-dom'
import { Ico, paths } from './Icons'

/** Navy page header with breadcrumbs, title and an optional right-hand photo (arch-shaped) or custom visual. */
export function PageHero({ crumbs = [], eyebrow, title, intro, img, imgAlt = '', visual, children }) {
  return (
    <section className={'phero' + (img || visual ? ' has-img' : '')}>
      <div className="wrap">
        <div className="phero-copy">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {crumbs.map(([to, label]) => <span key={label}><Ico d={paths.chev} />{to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}</span>)}
          </nav>
          {eyebrow && <span className="tag tag-dark hz" style={{ '--d': '.05s' }}>{eyebrow}</span>}
          <h1 className="hz" style={{ '--d': '.12s' }}>{title}</h1>
          {intro && <p className="lede hz" style={{ '--d': '.22s' }}>{intro}</p>}
          {children && <div className="phero-extra hz" style={{ '--d': '.3s' }}>{children}</div>}
        </div>
        {img && <div className="phero-img hz" style={{ '--d': '.2s' }}><img src={img} alt={imgAlt} /></div>}
        {visual}
      </div>
    </section>
  )
}

/** Renders content blocks: { h } heading, { p } paragraph, { ul } list (long lists flow into columns). */
export function Prose({ blocks }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => b.h ? <h2 key={i}>{b.h}</h2>
        : b.ul ? <ul key={i} className={b.ul.length > 7 ? 'cols' : ''}>{b.ul.map(t => <li key={t}><Ico d={paths.tick} />{t}</li>)}</ul>
        : <p key={i}>{b.p}</p>)}
    </div>
  )
}
