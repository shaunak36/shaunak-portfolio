import ProjectArtwork from './ProjectArtwork'
import './ProjectDisc.css'

export default function ProjectDisc({ project }) {
  return (
    <div className="pd-display" aria-hidden="true">
      <div className="pd-record"><div className="pd-label"><span>SP / {project.number}</span><i /></div></div>
      <div className="pd-sleeve">
        <div className="pd-art"><ProjectArtwork type={project.visual} /></div>
        <div className="pd-print"><span>PROJECT / {project.number}</span><strong>{project.name}</strong><small>SP® — DIGITAL ARCHIVE</small></div>
      </div>
    </div>
  )
}
