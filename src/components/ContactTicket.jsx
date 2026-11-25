import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Download, Mail, Github, Linkedin, Copy } from 'lucide-react'
import './ContactTicket.css'

export default function ContactTicket({ github, linkedin, resume }) {
  const email = 'paulshaunak5@gmail.com'
  const [copyStatus, setCopyStatus] = useState('')
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  async function copyEmail(event) {
    event.preventDefault()
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(email)
      setCopyStatus('Copied!')
    } catch {
      setCopyStatus('Select and copy the email manually.')
    }
    timer.current = setTimeout(() => setCopyStatus(''), 3000)
  }

  async function tearTab(event, { href, external, download }) {
    const tab = event.currentTarget
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        typeof tab.animate !== 'function') return
    event.preventDefault()
    if (tab.dataset.tearing === 'true') return
    tab.dataset.tearing = 'true'
    tab.style.zIndex = '3'
    tab.style.translate = 'none'
    tab.style.transformOrigin = 'top left'
    try {
      const shape = (top) => `polygon(0 0, ${top}, 100% 96%, ${Array.from({length:19}, (_, i) => `${95-i*5}% ${i%2===0?100:96}%`).join(', ')}, 0 96%)`
      const motion = tab.animate([
        { transform: 'perspective(450px) rotateX(0deg)', opacity: 1, clipPath: shape('100% 0'), offset: 0 },
        { transform: 'perspective(450px) rotateX(-22deg) rotate(-2deg)', opacity: 1, clipPath: shape('65% 0, 100% 12%'), offset: .22 },
        { transform: 'perspective(450px) translateY(12px) rotateX(-35deg) rotate(7deg)', opacity: 1, clipPath: shape('25% 0, 100% 12%'), offset: .43 },
        { transform: 'translate(14px, 42px) rotate(15deg)', opacity: 1, clipPath: shape('100% 8%'), offset: .58 },
        { transform: 'translate(30px, 100px) rotate(28deg)', opacity: 0, clipPath: shape('100% 8%'), offset: .83 },
        { transform: 'translate(30px, 100px) rotate(28deg)', opacity: 0, clipPath: shape('100% 8%'), offset: 1 },
      ], { duration: 1050, easing: 'linear', fill: 'forwards' })
      try { await motion.finished } catch { /* Continue if interrupted. */ }
      motion.cancel()
      tab.animate([{opacity:0},{opacity:1}], {duration:450, easing:'ease-out'})
      if (external) {
        const opened = window.open('about:blank', '_blank')
        if (opened) {
          opened.opener = null
          opened.location.replace(href)
        } else {
          window.location.assign(href)
        }
      } else if (download) {
        const link = document.createElement('a')
        link.href = href
        link.download = download
        document.body.appendChild(link)
        link.click()
        link.remove()
      }
    } finally {
      tab.style.removeProperty('z-index')
      tab.style.removeProperty('translate')
      tab.style.removeProperty('transform-origin')
      delete tab.dataset.tearing
    }
  }

  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`
  const tabs = [
    { label: 'Email', href: gmail, Icon: Mail, external: true },
    { label: 'LinkedIn', href: linkedin, Icon: Linkedin, external: true },
    { label: 'GitHub', href: github, Icon: Github, external: true },
    { label: 'Resume', href: resume, Icon: Download, download: 'Shaunak_Paul_GenAI_Resume.pdf' },
  ]
  return (
    <footer id="contact" className="ticket-footer">
      <p className="ticket-section-label">04 — CONTACT / INTERNSHIPS &amp; FREELANCE</p>
      <div className="contact-ticket">
        <div className="ticket-main">
          <div className="ticket-meta"><span>SP® / CONNECTION PASS</span><span>NO. 001 — 2026</span></div>
          <div className="ticket-copy"><h2>LET'S MAKE<br/>SOMETHING<span>.</span></h2><p>Interested in internships, freelance projects and collaborations in Generative AI, Machine Learning and Data Analytics.</p><a href={gmail} onClick={copyEmail} aria-label={`Copy email address ${email}`} title="Copy email address">{email} <Copy size={16}/></a><span role="status" aria-live="polite" style={{ marginLeft: 10, fontSize: '0.8rem', color: '#c7ff54' }}>{copyStatus}</span></div>
          <div className="ticket-meta ticket-bottom"><span className="ticket-barcode" aria-hidden="true"/><span>INDIA / OPEN TO WORK</span></div>
        </div>
        <div className="ticket-tabs">
          {tabs.map(({label,href,Icon,external,download},i) => <a key={label} className="ticket-tab" href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} download={download} onClick={e => tearTab(e, { href, external, download })}><span className="ticket-tab-index">0{i+1} / TAKE ONE</span><Icon size={23}/><strong>{label}</strong>{download ? <Download size={14}/> : <ArrowUpRight size={14}/>}</a>)}
        </div>
      </div>
      <div className="ticket-credit"><span>© 2026 SHAUNAK PAUL</span><span>DESIGNED &amp; BUILT WITH CURIOSITY.</span></div>
    </footer>
  )
}
