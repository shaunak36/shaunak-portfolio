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
            '.hero h1',
            {
              y: 80,
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

        reveal('.projects-heading h2, .projects-heading p, .console-heading h2')
        reveal('.premium-cover-label, .premium-cover-title, .premium-cover-tagline')
        reveal('.premium-project-category, .premium-project-name, .premium-project-description')
        gsap.utils.toArray('.premium-project-tags').forEach(group => {
          gsap.fromTo(group.querySelectorAll('span'),
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.09,
              ease: 'power3.out', scrollTrigger: {
                trigger: group, start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            })
        })
        gsap.utils.toArray('.project-artwork').forEach(artwork => {
          const target = artwork.querySelector('svg') || artwork
          gsap.fromTo(target,
            { opacity: 0, clipPath: 'inset(0 0 100% 0)', scale: 1.08 },
            { opacity: 1, clipPath: 'inset(0 0 0% 0)', scale: 1,
              duration: 1.15, ease: 'power3.out', scrollTrigger: {
                trigger: artwork, start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            })
        })
        reveal('#about > .eyebrow, #about > h2, .profile-intro, .profile-panel, .skill-panel')
        reveal('#contact > p, #contact > .contact-link, #contact > .contact-actions')
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
