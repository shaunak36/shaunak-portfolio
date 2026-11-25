import { ArrowUpRight, Download, Mail, Github, Linkedin } from 'lucide-react'
import './ContactTicket.css'

export default function ContactTicket({ github, linkedin, resume }) {
  const email = 'paulshaunak5@gmail.com'
  const tabs = [
    { label: 'Email', href: `mailto:${email}`, Icon: Mail },
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
          <div className="ticket-copy"><h2>LET'S MAKE<br/>SOMETHING<span>.</span></h2><p>Interested in internships, freelance projects and collaborations in Generative AI, Machine Learning and Data Analytics.</p><a href={`mailto:${email}`}>{email} <ArrowUpRight size={16}/></a></div>
          <div className="ticket-meta ticket-bottom"><span className="ticket-barcode" aria-hidden="true"/><span>INDIA / OPEN TO WORK</span></div>
        </div>
        <div className="ticket-tabs">
          {tabs.map(({label,href,Icon,external,download},i) => <a key={label} className="ticket-tab" href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} download={download} onClick={e => { const tab=e.currentTarget; if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) tab.animate([{transform:'translateY(0)'},{transform:'translateY(12px) rotate(2deg)',opacity:.65},{transform:'translateY(0)',opacity:1}],{duration:480,easing:'ease-out'}) }}><span className="ticket-tab-index">0{i+1} / TAKE ONE</span><Icon size={23}/><strong>{label}</strong>{download ? <Download size={14}/> : <ArrowUpRight size={14}/>}</a>)}
        </div>
      </div>
      <div className="ticket-credit"><span>© 2026 SHAUNAK PAUL</span><span>DESIGNED &amp; BUILT WITH CURIOSITY.</span></div>
    </footer>
  )
}
