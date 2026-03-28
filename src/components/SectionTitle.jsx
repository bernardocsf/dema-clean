export default function SectionTitle({ eyebrow, title, text, center = false }) {
  return (
    <div className={`section-title ${center ? 'center' : ''}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p className="section-copy">{text}</p> : null}
    </div>
  )
}
