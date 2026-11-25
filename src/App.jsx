import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Github, ArrowUpRight, Image } from 'lucide-react'
import './App.css'
import './components/ProjectShowcase.css'
import './components/AboutSection.css'
import ArchiveMotion from './components/ArchiveMotion'
import './components/FinalPolish.css'
import './components/HorizontalProjects.css'
import PortfolioAnimations from './components/PortfolioAnimations'
import InteractiveEffects from './components/InteractiveEffects'
import ProjectDisc from './components/ProjectDisc'
import ckdImage from './assets/projects/ckd-one.png'
import rosterImage from './assets/projects/smart-roster.png'
import schoolImage from './assets/projects/school-management.png'

const DeveloperConsole = lazy(() => import('./components/DeveloperConsole'))
const NeuralCore = lazy(() => import('./components/NeuralCore'))

const github = 'https://github.com/shaunak36'
const linkedin = 'https://www.linkedin.com/in/shaunak-paul-000907321/'
const resume = `${import.meta.env.BASE_URL}Shaunak_Paul_GenAI_Resume.pdf`
const projects = [
  { number: '01', name: 'KrishiAI', category: 'AI / MOBILE APPLICATION', tagline: 'Offline intelligence for agriculture.', description: 'Offline crop disease detection with MobileNetV2 and TensorFlow Lite inference, paired with multilingual agricultural assistance.', technologies: ['Flutter', 'MobileNetV2', 'TensorFlow Lite', 'Firebase', 'Gemini'], visual: 'krishi', image: null, github: `${github}/Krishi-Ai`, demo: null },
  { number: '02', name: 'CKD One', category: 'MACHINE LEARNING / FULL STACK', tagline: 'Explainable intelligence for healthcare.', description: 'Explainable CKD risk prediction with XGBoost and SHAP, a FastAPI backend, Supabase data layer and AI-powered lab report extraction.', technologies: ['Python', 'XGBoost', 'SHAP', 'FastAPI', 'Supabase', 'Next.js'], visual: 'ckd', image: ckdImage, github: `${github}/ckd-frontend`, demo: 'https://ckd-frontend-iota.vercel.app/en' },
  { number: '03', name: 'SmartRoster AI', category: 'FULL STACK / OPTIMIZATION', tagline: 'Complex scheduling. Simplified.', description: 'Constraint-based workforce scheduling with OR-Tools, employee availability and workload balancing, with multi-tenant data isolation and independently validated roster versions.', technologies: ['React', 'FastAPI', 'OR-Tools', 'Supabase'], visual: 'roster', image: rosterImage, github: `${github}/smartroster-ai`, demo: 'https://smartroster-ai.onrender.com' },
  { number: '04', name: 'School Management AI', category: 'FULL STACK / AI INTEGRATION', tagline: 'A smarter learning experience.', description: 'AI-powered grading, attendance analytics and student performance prediction in a React application with a Node.js / Express integration layer.', technologies: ['React', 'Node.js', 'Express', 'Groq', 'LLaMA'], visual: 'school', image: schoolImage, github: `${github}/shaunak36-school-management-frontend`, demo: 'https://school-management-ai.netlify.app' },
]
const highlights = {
  krishi: ['Offline crop disease detection using MobileNetV2.', 'On-device inference with TensorFlow Lite.', 'Multilingual assistance with Firebase and Gemini.'],
  ckd: ['CKD risk prediction using XGBoost and SHAP explanations.', 'FastAPI backend and Supabase relational database.', 'AI-powered lab report extraction.'],
  roster: ['Constraint-based scheduling with OR-Tools.', 'Employee availability and workload balancing.', 'Multi-tenant isolation and roster versioning.'],
  school: ['AI-powered grading and attendance analysis.', 'Student performance prediction.', 'React frontend and Node.js / Express REST backend.'],
}
const skills = [
  ['01', 'Generative AI', ['Gemini API', 'Groq API', 'LLaMA', 'LLM integration']],
  ['02', 'Machine learning', ['XGBoost', 'MobileNetV2', 'SHAP', 'TensorFlow Lite']],
  ['03', 'Python & data', ['Python', 'SQL', 'Pandas', 'NumPy', 'Data cleaning']],
  ['04', 'Tools & integration', ['REST APIs', 'FastAPI', 'Supabase', 'Firebase', 'Git', 'GitHub']],
]

function SocialLink({ href, children }) { return <a className="profile-link" href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16} /></a> }
function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const dialogRef = useRef(null)
  useEffect(() => { const dialog = dialogRef.current; const previousOverflow = document.body.style.overflow; if (selectedProject && dialog) { if (!dialog.open) dialog.showModal(); document.body.style.overflow = 'hidden' } return () => { document.body.style.overflow = previousOverflow } }, [selectedProject])
  const closePreview = () => { dialogRef.current?.close(); setSelectedProject(null) }
  return <main className="portfolio">
    <a className="skip-link" href="#work">Skip to projects</a><PortfolioAnimations /><InteractiveEffects />
    <nav className="navbar" aria-label="Main navigation"><a href="#" className="logo" aria-label="Shaunak Paul — home">SP<span>®</span></a><div className="nav-links"><a href="#work">WORK</a><a href="#about">ABOUT</a><a href="#contact">CONTACT</a></div><div className="availability"><span className="status-dot" />OPEN TO WORK &amp; FREELANCE</div></nav>
    <section className="hero"><p className="eyebrow">PORTFOLIO / 2026</p><h1 aria-label="Shaunak Paul"><span className="hero-line"><span>SHAUNAK</span></span><span className="hero-line hero-accent"><span>PAUL.</span></span></h1><Suspense fallback={<div className="neural-core neural-core-loading" aria-hidden="true" />}><NeuralCore /></Suspense><div className="hero-bottom"><div className="hero-introduction"><p className="hero-role">AI &amp; Machine Learning Student</p><p className="intro">Exploring Generative AI, machine learning<br className="hero-copy-break" /> and intelligent applications.</p></div><div className="hero-actions"><a href="#work" className="profile-link resume-link">VIEW PROJECTS <span>↘</span></a><a href={resume} download="Shaunak_Paul_GenAI_Resume.pdf" className="profile-link">DOWNLOAD RESUME <span>↓</span></a></div></div><div className="hero-index"><span>01 — INTRODUCTION</span><span>INDIA / 2026</span></div></section>
    <Suspense fallback={<section className="developer-console console-loading" aria-hidden="true" />}><DeveloperConsole /></Suspense>
    <section id="work" className="projects-section horizontal-projects"><div className="horizontal-stage"><div className="projects-heading"><p className="eyebrow">02 — SELECTED WORK</p><h2>Things I've built<span>.</span></h2><p className="projects-subtitle horizontal-hint">Scroll to explore <span>→</span></p></div><div className="horizontal-viewport" tabIndex={0} aria-label="Project cards, scroll to explore"><div className="horizontal-track">{projects.map(project => <article key={project.number} className={`horizontal-card ${project.visual}`}><div className="horizontal-card-top"><span className="horizontal-number">{project.number}</span><span className="horizontal-category">{project.category}</span></div><div className="horizontal-art"><ProjectDisc project={project} /></div><h3>{project.name}<span>.</span></h3><ul className="horizontal-highlights">{highlights[project.visual].map(point => <li key={point}>{point}</li>)}</ul><div className="horizontal-tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><div className="horizontal-actions">{project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">LIVE DEMO <ArrowUpRight size={14} /></a>}<a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={14} /> {project.visual === 'krishi' ? 'VIEW SOURCE' : 'GITHUB'}</a>{project.visual === 'krishi' && <span className="horizontal-project-status">Mobile app · Source available</span>}{project.image && <button type="button" onClick={() => setSelectedProject(project)}><Image size={14} /> PREVIEW</button>}</div></article>)}<article className="horizontal-card github-card"><div className="horizontal-card-top"><span className="horizontal-number">05</span><Github size={36} aria-hidden="true" /></div><div className="github-card-content"><p className="horizontal-category">THE WORK CONTINUES</p><h3>More on GitHub<span>.</span></h3><p>Explore my other projects, experiments and ongoing work.</p><a className="github-card-link" href={github} target="_blank" rel="noopener noreferrer"><Github size={18} /> github.com/shaunak36 <ArrowUpRight size={18} /></a></div></article></div></div><div className="horizontal-meter" aria-hidden="true"><span /></div></div></section>
    <section id="about" className="work-section profile-section archive-about" aria-labelledby="archive-title">
      <ArchiveMotion />
      <p className="eyebrow">03 — ABOUT / PERSONAL ARCHIVE</p>
      <h2 id="archive-title" className="archive-title">About me<span>.</span></h2>
      <div className="archive-layout">
        <aside className="archive-side">
          <figure className="archive-photo">
            <div className="archive-photo-window"><img src={`${import.meta.env.BASE_URL}images/about-portrait.webp`} alt="Shaunak wearing glasses and a dark jacket" loading="lazy" width="600" height="720" /></div>
            <figcaption>the human behind the screen.</figcaption>
          </figure>
          <figure className="archive-travel">
            <img src={`${import.meta.env.BASE_URL}images/about-travel.webp`} alt="Shaunak looking towards the mountains" loading="lazy" width="600" height="650" />
            <figcaption>away from the screen <span>↗</span></figcaption>
          </figure>
          <div className="archive-contact archive-paper">
            <p className="archive-kicker">CONTACT / 01</p>
            <a href="mailto:paulshaunak5@gmail.com">Email <ArrowUpRight size={14} /></a>
            <SocialLink href={github}>GitHub</SocialLink>
            <SocialLink href={linkedin}>LinkedIn</SocialLink>
            <a href={resume} download="Shaunak_Paul_GenAI_Resume.pdf">Resume <span>↓</span></a>
          </div>
        </aside>
        <div className="archive-documents">
          <article className="archive-intro archive-paper">
            <p className="archive-kicker">A LITTLE INTRODUCTION / 2026</p>
            <h3>hi, i'm Shaunak.</h3>
            <p>I'm an Artificial Intelligence and Machine Learning student interested in Generative AI, creative technology and data analytics. I enjoy experimenting with AI and turning ideas into practical applications.</p>
          </article>
          <article className="archive-record archive-paper">
            <span className="archive-eyelet" aria-hidden="true" />
            <svg className="archive-wire" viewBox="0 0 320 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <defs><linearGradient id="cord-tone" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d9e3df"/><stop offset=".5" stopColor="#788d89"/><stop offset="1" stopColor="#435451"/></linearGradient></defs>
              {['M9 91 C-2 65 30 42 86 35 S225 27 320 0','M14 91 C5 69 35 49 90 42 S225 34 320 7'].map(d => <g key={d}><path d={d} stroke="#101716" strokeWidth="7" strokeLinecap="round"/><path d={d} stroke="url(#cord-tone)" strokeWidth="5" strokeLinecap="round"/><path d={d} stroke="#e1eee8" strokeOpacity=".65" strokeWidth="1.2" strokeLinecap="round"/></g>)}
              <g strokeLinecap="round" strokeLinejoin="round">
                {['M8 77 C19 73 22 82 13 85 S2 82 8 79 C15 76 20 86 11 89 L9 94','M14 79 C5 83 5 88 13 90 L14 94'].map(d => <g key={d}><path d={d} stroke="#17201e" strokeWidth="4.5"/><path d={d} stroke="#8b9e97" strokeWidth="3"/><path d={d} stroke="#dce8df" strokeWidth="0.8"/></g>)}
              </g>
            </svg>
            <p className="archive-kicker">PERSONAL RECORD — SP / 001</p>
            <div className="archive-record-grid">
              <div><h3>Where I started</h3><h4>B.E. Artificial Intelligence &amp; Machine Learning</h4><p>St. John College of Engineering and Management, Palghar · University of Mumbai</p><p className="archive-small">2023–2027 (expected) · SGPI 8.45 (Sem 5)</p></div>
              <div><h3>Where I've worked</h3><h4>AI Engineering Intern</h4><p>Branding Catalyst Pvt. Ltd.</p><p>Structured student records for attendance and performance analytics and collaborated on API integrations.</p></div>
            </div>
            <div className="archive-toolkit"><h3>What I explore</h3><div className="archive-skills">{skills.map(([number,title,items]) => <div key={number}><h4>{title}</h4><p>{items.join(' · ')}</p></div>)}</div></div>
            <p className="archive-stamp">ALWAYS LEARNING / SP.</p>
          </article>
        </div>
      </div>
    </section>
    <footer id="contact" className="footer"><p>04 — CONTACT / INTERNSHIPS &amp; FREELANCE</p><a href="mailto:paulshaunak5@gmail.com" className="contact-link">LET'S TALK<span>↗</span></a><p className="contact-email"><a href="mailto:paulshaunak5@gmail.com">paulshaunak5@gmail.com</a></p><p className="contact-note">Interested in internships, freelance projects and
  collaborations in Generative AI, Machine Learning
  and Data Analytics.</p><div className="profile-actions contact-actions"><a className="profile-link resume-link" href={resume} download="Shaunak_Paul_GenAI_Resume.pdf">DOWNLOAD RESUME <span>↓</span></a><SocialLink href={linkedin}>LINKEDIN</SocialLink><SocialLink href={github}>GITHUB</SocialLink></div><div className="footer-bottom"><p>© 2026 SHAUNAK PAUL</p><p>DESIGNED &amp; BUILT WITH CURIOSITY.</p></div></footer>
    <dialog ref={dialogRef} className="lightbox" aria-labelledby="lightbox-title" onClose={() => setSelectedProject(null)} onClick={event => { if (event.target === event.currentTarget) closePreview() }}>{selectedProject && <div className="lightbox-content"><div className="lightbox-header"><div><p className="lightbox-label">PROJECT / {selectedProject.number}</p><h2 id="lightbox-title">{selectedProject.name}</h2></div><button type="button" className="lightbox-close" onClick={closePreview} aria-label="Close image preview">×</button></div><img src={selectedProject.image} alt={`${selectedProject.name} application screenshot`} className="lightbox-image" loading="lazy" decoding="async" /><div className="lightbox-footer"><span>PROJECT PREVIEW / 2026</span><span>PRESS ESC TO CLOSE</span></div></div>}</dialog>
  </main>
}
export default App
