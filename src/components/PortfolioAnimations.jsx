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

        // Project card scroll animations

        gsap.utils.toArray('.project-card').forEach(card => {
          gsap.from(card, {
            opacity: 0,
            y: 25,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
            },
          })
        })

        // Section heading animations

        gsap.utils.toArray(
          '.projects-heading, .work-section, .console-heading, .footer'
        ).forEach(section => {
          gsap.from(section, {
            opacity: 0,
            y: 40,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              once: true,
            },
          })
        })
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