import { useEffect } from 'react'

export default function ArchiveMotion() {
  useEffect(() => {
    const media = window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const cards = [...document.querySelectorAll('.archive-about :is(.archive-photo,.archive-travel,.archive-contact,.archive-intro,.archive-record)')]
    let observer
    const reset = () => {
      observer?.disconnect()
      cards.forEach(card => {
        card.classList.remove('archive-pending', 'archive-arrived')
        card.style.removeProperty('animation-delay')
      })
    }
    const configure = () => {
      reset()
      if (!media.matches || !('IntersectionObserver' in window)) return
      observer = new IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
          const card = entry.target
          card.style.animationDelay = `${index * 130}ms`
          card.classList.remove('archive-pending')
          card.classList.add('archive-arrived')
          observer.unobserve(card)
        })
      }, { threshold: 0, rootMargin: '0px 0px -12% 0px' })
      cards.forEach(card => {
        card.classList.add('archive-pending')
        observer.observe(card)
      })
    }
    configure()
    media.addEventListener('change', configure)
    return () => {
      media.removeEventListener('change', configure)
      reset()
    }
  }, [])
  return null
}
