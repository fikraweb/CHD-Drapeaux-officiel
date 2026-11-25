import { useRef, useState } from 'react'
import { ZoomIn, ZoomOut } from 'lucide-react'

export default function ProductZoom({ src, title }: { src: string; title: string }) {
  const [zoomed, setZoomed] = useState(false)
  const frame = useRef<HTMLSpanElement>(null)

  function pan(x: number, y: number) {
    const imageFrame = frame.current
    if (!imageFrame) return
    const bounds = imageFrame.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return
    const percent = (value: number) => Math.max(0, Math.min(100, value))
    imageFrame.style.setProperty('--zoom-x', `${percent((x - bounds.left) / bounds.width * 100)}%`)
    imageFrame.style.setProperty('--zoom-y', `${percent((y - bounds.top) / bounds.height * 100)}%`)
  }

  return <button
    type="button"
    className="product-page-image product-zoom"
    aria-label={`Zoom sur la photo : ${title}`}
    aria-pressed={zoomed}
    onPointerEnter={event => {
      if (event.pointerType !== 'mouse') return
      pan(event.clientX, event.clientY)
      setZoomed(true)
    }}
    onPointerMove={event => {
      if (event.pointerType === 'mouse') pan(event.clientX, event.clientY)
    }}
    onPointerLeave={event => { if (event.pointerType === 'mouse') setZoomed(false) }}
    onClick={event => {
      if (event.detail) pan(event.clientX, event.clientY)
      else {
        frame.current?.style.removeProperty('--zoom-x')
        frame.current?.style.removeProperty('--zoom-y')
      }
      setZoomed(!zoomed)
    }}
    onKeyDown={event => { if (event.key === 'Escape') setZoomed(false) }}
  >
    <span className="product-zoom-frame" ref={frame}><img src={src} alt={title} fetchPriority="high" draggable={false} /></span>
    <span className="product-zoom-icon" aria-hidden="true">{zoomed ? <ZoomOut size={19} /> : <ZoomIn size={19} />}</span>
  </button>
}
