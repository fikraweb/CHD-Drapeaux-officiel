import { useState, type CSSProperties } from 'react'
import { Pause, Play } from 'lucide-react'

const flags = ['jp', 'it', 'de', 'gb', 'fr', 'eu', 'ma']
const slices = Array.from({ length: 18 }, (_, index) => index)

export default function HeroFlags() {
  const [paused, setPaused] = useState(false)

  return <>
    <div className="hero-flags" data-paused={paused} aria-hidden="true">
      {flags.map((code, index) =>
        <div className={`hero-flag hero-flag-${code}`} key={code} style={{
          '--flag-image': `url(/images/flags/${code}.svg)`,
          '--cycle': `${2.35 + index * .13}s`,
          '--phase': `${-index * .29}s`,
        } as CSSProperties}>
          <span className="hero-pole" />
          <span className="hero-cloth">
            {slices.map(slice => <span className="hero-cloth-slice" key={slice} style={{
              '--slice': slice,
              '--amplitude': `${slice * .53}px`,
            } as CSSProperties} />)}
          </span>
        </div>
      )}
    </div>
    <button type="button" className="hero-motion" onClick={() => setPaused(!paused)} aria-label={paused ? 'Relancer l’animation des drapeaux' : 'Mettre en pause l’animation des drapeaux'}>
      {paused ? <Play size={16} /> : <Pause size={16} />}
    </button>
  </>
}
