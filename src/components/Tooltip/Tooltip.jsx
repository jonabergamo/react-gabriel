import './styles.css'

export default function Tooltip({
  children,
  text,
  position = "bottom",
}) {
  return (
    <div className="tooltip-trigger">
      {children}
      <div className={`tooltip tooltip-${position}`}>
        {text}
      </div>
    </div>
  )
}