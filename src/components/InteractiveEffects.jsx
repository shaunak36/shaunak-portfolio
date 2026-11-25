
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'
import './InteractiveEffects.css'

gsap.registerPlugin(ScrollTrigger)

export default function InteractiveEffects() {

  // Desktop-only smooth scrolling
  useEffect(() => {
    const preference = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const desktop = window.matchMedia(
      '(min-width: 900px) and (hover: hover) and (pointer: fine)'
    )

    let cleanup = () => {}

    function configure() {
      cleanup()
      cleanup = () => {}

      // Use native browser scrolling on mobile
      if (preference.matches || !desktop.matches) return

      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.15,
        smoothWheel: false,
        syncTouch: false,
        anchors: true,
        prevent: node => Boolean(
          node.closest?.(
            'dialog, [data-lenis-prevent], [data-lenis-prevent-touch]'
          )
        ),
      })

      gsap.ticker.lagSmoothing(0)

      const update = time => lenis.raf(time * 1000)

      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(update)

      document.documentElement.classList.add(
        'portfolio-smooth-scroll'
      )

      cleanup = () => {
        gsap.ticker.remove(update)
        lenis.off('scroll', ScrollTrigger.update)
        lenis.destroy()

        document.documentElement.classList.remove(
          'portfolio-smooth-scroll'
        )
      }
    }

    configure()

    preference.addEventListener('change', configure)
    desktop.addEventListener('change', configure)

    return () => {
      preference.removeEventListener('change', configure)
      desktop.removeEventListener('change', configure)
      cleanup()
    }
  }, [])

  const progressRef = useRef(null)

  // Scroll progress and magnetic buttons
  useEffect(() => {
    const media = gsap.matchMedia()

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            start: 0,
            end: 'max',
            scrub: true,
          },
        })
      }
    )

    media.add(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        const cleanups = []

        document
          .querySelectorAll('.profile-link, .project-action')
          .forEach(button => {
            const x = gsap.quickTo(button, 'x', {
              duration: 0.35,
              ease: 'power3.out',
            })

            const y = gsap.quickTo(button, 'y', {
              duration: 0.35,
              ease: 'power3.out',
            })

            const move = event => {
              const rect = button.getBoundingClientRect()

              x(
                Math.max(
                  -6,
                  Math.min(
                    6,
                    (
                      event.clientX -
                      rect.left -
                      rect.width / 2
                    ) * 0.12
                  )
                )
              )

              y(
                Math.max(
                  -5,
                  Math.min(
                    5,
                    (
                      event.clientY -
                      rect.top -
                      rect.height / 2
                    ) * 0.15
                  )
                )
              )
            }

            const reset = () => {
              x(0)
              y(0)
            }

            button.addEventListener('pointermove', move)
            button.addEventListener('pointerleave', reset)
            button.addEventListener('blur', reset)

            cleanups.push(() => {
              button.removeEventListener('pointermove', move)
              button.removeEventListener('pointerleave', reset)
              button.removeEventListener('blur', reset)

              x.tween.kill()
              y.tween.kill()

              gsap.set(button, {
                clearProps: 'transform',
              })
            })
          })

        return () => cleanups.forEach(fn => fn())
      }
    )

    return () => media.revert()
  }, [])

  // Custom desktop cursor
  useEffect(() => {
    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    )

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    if (!finePointer.matches || reduced.matches) {
      return undefined
    }

    const dot = document.createElement('span')
    const follower = document.createElement('span')

    dot.className = 'cursor-dot'
    follower.className = 'cursor-follower'

    document.body.append(dot, follower)

    document.documentElement.classList.add(
      'has-custom-cursor'
    )

    let frame = 0
    let x = -20
    let y = -20

    const isInteractive = target =>
      target instanceof Element &&
      target.closest('a, button, [role="button"]')

    const move = event => {
      x = event.clientX
      y = event.clientY

      follower.classList.toggle(
        'is-active',
        Boolean(isInteractive(event.target))
      )

      if (!frame) {
        frame = requestAnimationFrame(() => {
          dot.style.transform =
            `translate3d(${x}px, ${y}px, 0)`

          follower.style.transform =
            `translate3d(${x}px, ${y}px, 0)`

          frame = 0
        })
      }
    }

    const enter = event => {
      if (isInteractive(event.target)) {
        follower.classList.add('is-active')
      }
    }

    const leave = event => {
      if (isInteractive(event.target)) {
        follower.classList.remove('is-active')
      }
    }

    window.addEventListener('pointermove', move, {
      passive: true,
    })

    document.addEventListener('pointerover', enter)
    document.addEventListener('pointerout', leave)

    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', enter)
      document.removeEventListener('pointerout', leave)

      if (frame) cancelAnimationFrame(frame)

      dot.remove()
      follower.remove()

      document.documentElement.classList.remove(
        'has-custom-cursor'
      )
    }
  }, [])

  return (
    <div
      ref={progressRef}
      className="portfolio-scroll-progress"
      aria-hidden="true"
    />
  )
}
