import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PortfolioAnimations.css'

gsap.registerPlugin(ScrollTrigger)

export default function PortfolioAnimations() {
  const loaderRef = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const timeline = gsap.timeline()

        timeline
          .fromTo(
            '.loader-logo',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7 }
          )
          .fromTo(
            '.loader-progress',
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1,
              ease: 'power2.inOut',
            }
          )
          .to(loaderRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
          })
          .set(loaderRef.current, {
            display: 'none',
          })
          .from(
            '.navbar',
            {
              opacity: 0,
              y: -30,
              duration: 0.7,
            },
            '-=0.4'
          )
          .from(
            '.hero-line > span',
            {
              y: 110,
              opacity: 0,
              duration: 1.2,
              ease: 'power4.out',
            },
            '-=0.5'
          )
          .from(
            '.hero .eyebrow, .hero-bottom, .hero-index',
            {
              opacity: 0,
              y: 25,
              stagger: 0.15,
              duration: 0.8,
            },
            '-=0.6'
          )

        // Use each visible element as its own trigger, not the tall card.
        function reveal(elements, distance = 42) {
          gsap.utils.toArray(elements).forEach(element => {
            gsap.fromTo(element,
              { opacity: 0, y: distance },
              { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
                scrollTrigger: {
                  trigger: element, start: 'top 82%',
                  toggleActions: 'play none none reverse',
                },
              })
          })
        }

        reveal('.projects-heading h2, .projects-heading p, .console-heading h2, .profile-section h2')
        // Pin only when cards fit vertically; otherwise use native horizontal scrolling.
        media.add('(min-width: 900px) and (min-height: 600px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
          if (window.innerWidth < 900 || window.innerHeight < 600 || !window.matchMedia('(pointer: fine)').matches) return
          const stage = document.querySelector('.horizontal-stage')
          const section = stage?.closest('.horizontal-projects')
          const viewport = stage?.querySelector('.horizontal-viewport')
          const track = stage?.querySelector('.horizontal-track')
          if (!section || !track || !viewport) return
          let travel = Math.max(0, track.scrollWidth + 72 - viewport.clientWidth)
          if (!travel) return
          section.classList.add('is-sticky-horizontal')
          const cards = [...track.querySelectorAll('.horizontal-card')]
          const meter = stage.querySelector('.horizontal-meter span')
          gsap.set(cards, { transformPerspective: 1100 })
          const setters = cards.map(card => ({
            card,
            ry: gsap.quickSetter(card, 'rotationY', 'deg'),
            rz: gsap.quickSetter(card, 'rotationZ', 'deg'),
            z: gsap.quickSetter(card, 'z', 'px'),
            scale: gsap.quickSetter(card, 'scale'),
            y: gsap.quickSetter(card, 'y', 'px'),
          }))
          const measure = () => {
            travel = Math.max(0, track.scrollWidth + 72 - viewport.clientWidth)
            section.style.height = `${stage.offsetHeight + travel}px`
            section.style.setProperty('--horizontal-scroll-distance', `${travel}px`)
          }
          measure()
          const updateDepth = progress => {
            // Anchor depth to the project sequence, not the viewport center.
            // Both endpoints are exactly flat for their respective active cards.
            const active = gsap.utils.clamp(0, 1, progress) * (cards.length - 1)
            setters.forEach(({ry, rz, z, scale, y}, index) => {
              const offset = gsap.utils.clamp(-1, 1, index - active)
              const depth = Math.abs(offset)
              ry(-offset * 23)
              rz(offset * 3)
              z(-depth * 100)
              scale(1 - depth * 0.10)
              y(depth * 15)
            })
            if (meter) gsap.set(meter, {scaleX: progress})
          }
          const tween = gsap.to(track, {
            x: () => -travel, ease: 'none',
            onUpdate() { updateDepth(this.progress()) },
            scrollTrigger: { trigger: section, start: 'top top', end: () => '+=' + travel, pin: false, scrub: true, invalidateOnRefresh: true,
              onRefreshInit: measure,
              onRefresh: self => updateDepth(self.animation?.progress() ?? self.progress) }
          })
          // Keyboard focus must bring offscreen links into view.
          const focus = event => {
            const card = event.target.closest('.horizontal-card')
            if (!card || !tween.scrollTrigger) return
            const bounds = card.getBoundingClientRect(), frame = viewport.getBoundingClientRect()
            if (bounds.left < frame.left || bounds.right > frame.right) {
              const ratio = Math.min(1, Math.max(0, card.offsetLeft / Math.max(1, travel)))
              tween.scrollTrigger.scroll(tween.scrollTrigger.start + ratio * (tween.scrollTrigger.end - tween.scrollTrigger.start))
            }
          }
          viewport.addEventListener('focusin', focus)
          updateDepth(0)
          return () => {
            viewport.removeEventListener('focusin', focus)
            section.classList.remove('is-sticky-horizontal')
            section.style.removeProperty('height')
            section.style.removeProperty('--horizontal-scroll-distance')
            gsap.set(track, {clearProps:'transform'})
            gsap.set(cards, {clearProps:'transform'})
          }
        })
        reveal('#about > .eyebrow, #about > h2, .profile-panel, .skill-panel')
        reveal('#contact > p:not(.contact-email), #contact > .contact-link')
        // Keep recruiter contact actions visible at every scroll position.
        timeline.eventCallback('onComplete', () => ScrollTrigger.refresh())

      }
    )

    return () => media.revert()
  }, [])

  return (
    <div
      className="portfolio-loader"
      ref={loaderRef}
      aria-hidden="true"
    >
      <div className="loader-content">

        <p className="loader-caption">
          INITIALIZING PORTFOLIO
        </p>

        <h1 className="loader-logo">
          SP<span>.</span>
        </h1>

        <div className="loader-track">
          <div className="loader-progress" />
        </div>

        <p className="loader-footer">
          PERSONAL INTERFACE / 2026
        </p>

      </div>
    </div>
  )
}
