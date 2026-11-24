import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'
import './InteractiveEffects.css'

gsap.registerPlugin(ScrollTrigger)

export default function InteractiveEffects() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let cleanup = () => {}

    function configure() {
      cleanup()
      cleanup = () => {}
      if (preference.matches) return

      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        prevent: node => Boolean(node.closest?.('dialog, [data-lenis-prevent]')),
      })

      const update = time => lenis.raf(time * 1000)
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(update)
      document.documentElement.classList.add('portfolio-smooth-scroll')

      cleanup = () => {
        gsap.ticker.remove(update)
        lenis.off('scroll', ScrollTrigger.update)
        lenis.destroy()
        document.documentElement.classList.remove('portfolio-smooth-scroll')
      }
    }

    configure()
    preference.addEventListener('change', configure)
    return () => {
      preference.removeEventListener('change', configure)
      cleanup()
    }
  }, [])

  const progressRef = useRef(null)

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(progressRef.current, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: true },
      })
    })
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const cleanups = []
      document.querySelectorAll('.profile-link, .project-action').forEach(button => {
        const x = gsap.quickTo(button, 'x', { duration: 0.35, ease: 'power3.out' })
        const y = gsap.quickTo(button, 'y', { duration: 0.35, ease: 'power3.out' })
        const move = event => {
          const rect = button.getBoundingClientRect()
          x(Math.max(-6, Math.min(6, (event.clientX - rect.left - rect.width / 2) * 0.12)))
          y(Math.max(-5, Math.min(5, (event.clientY - rect.top - rect.height / 2) * 0.15)))
        }
        const reset = () => { x(0); y(0) }
        button.addEventListener('pointermove', move)
        button.addEventListener('pointerleave', reset)
        button.addEventListener('blur', reset)
        cleanups.push(() => {
          button.removeEventListener('pointermove', move)
          button.removeEventListener('pointerleave', reset)
          button.removeEventListener('blur', reset)
          x.tween.kill(); y.tween.kill()
          gsap.set(button, { clearProps: 'transform' })
        })
      })
      return () => cleanups.forEach(fn => fn())
    })
    return () => media.revert()
  }, [])

  return <div ref={progressRef} className="portfolio-scroll-progress" aria-hidden="true" />
}
