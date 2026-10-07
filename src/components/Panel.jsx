// Sections are grouped into panels of alternating tone; each panel after the first
// rises over the previous one with a curved top edge (see usePanelCurves + .panel CSS).
export default function Panel({ tone, first, children }) {
  return <div className={`panel tone-${tone}${first ? '' : ' curve'}`}>{children}</div>
}
