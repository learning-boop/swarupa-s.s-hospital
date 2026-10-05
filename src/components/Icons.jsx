const P = { className: 'ico', viewBox: '0 0 24 24' }
export const Ico = ({ d, style }) => <svg {...P} style={style}><path d={d} /></svg>
export const paths = {
  phone: 'M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  pin: 'M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  ambulance: 'M3 17h2l2-9h10l2 9h2M7 17a2 2 0 1 0 4 0M13 17a2 2 0 1 0 4 0M11 8V5h4v3',
  arrow: 'M7 17L17 7M8 7h9v9',
  check: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 12l3 3 5-6',
  tick: 'M5 12l4 4 10-10',
  shield: 'M12 3l7 4v5c0 5-3 8-7 9-4-1-7-4-7-9V7z',
  pulse: 'M3 12h4l2-5 4 10 2-5h6',
  user: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21c1-4 4-6 8-6s7 2 8 6',
  heart: 'M12 21s-8-5-8-11a4 4 0 0 1 8-2 4 4 0 0 1 8 2c0 6-8 11-8 11z',
  grad: 'M3 9l9-4 9 4-9 4zM7 11v4c2 2 8 2 10 0v-4',
  left: 'M15 6l-6 6 6 6', right: 'M9 6l6 6-6 6', chev: 'M9 6l6 6-6 6',
  wa: 'M21 12a9 9 0 0 1-13 8l-5 1 1-5a9 9 0 1 1 17-4z',
  cal: 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4',
  menu: 'M4 7h16M4 12h16M4 17h16',
}
export const ArrowBadge = () => <span className="badge"><Ico d={paths.arrow} style={{ width: 16, height: 16 }} /></span>
