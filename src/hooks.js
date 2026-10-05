import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/** Adds .in when the element scrolls into view (drives .rv and .wipe CSS). */
export function useReveal(selector = '.rv,.wipe') {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current; if (!root) return
    const els = root.matches(selector) ? [root, ...root.querySelectorAll(selector)] : [...root.querySelectorAll(selector)]
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -10% 0px', threshold: .1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [selector])
  return ref
}

export const reduceMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

/** Site-wide smooth scrolling (Lenis) driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll() {
  useEffect(() => {
    if (reduceMotion()) return
    document.documentElement.classList.add('lenis')
    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -90 } })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = t => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis.destroy(); document.documentElement.classList.remove('lenis') }
  }, [])
}

/** Each .panel.curve rises over the previous panel with a domed top that flattens as it scrolls up. */
export function usePanelCurves() {
  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.panel.curve').forEach(p => {
        const depth = parseFloat(getComputedStyle(p).getPropertyValue('--ov')) || 120
        gsap.fromTo(p, { '--ry': `${depth}px` }, { '--ry': '0px', ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'top 20%', scrub: true } })
      })
    })
    return () => ctx.revert()
  }, [])
}
