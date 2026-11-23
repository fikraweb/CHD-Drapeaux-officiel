import { Eyebrow } from './ui'

const images = [
  ['hero', 'Drapeaux devant un bâtiment institutionnel'],
  ['photo-0', 'Drapeau marocain sur mât'],
  ['photo-2', 'Drapeaux dans une salle de réunion'],
  ['photo-4', 'Installation pour une cérémonie officielle'],
  ['photo-1', 'Drapeaux de plusieurs pays'],
  ['photo-5', 'Détail de la confection textile'],
]

export default function Gallery() {
  return <section id="realisations" className="section"><div className="wrap">
    <div className="intro"><Eyebrow>GALERIE</Eyebrow><h2>Nos réalisations</h2><p>Visuels illustratifs de configurations et d’usages professionnels.</p></div>
    <div className="gallery">{images.map(([src, caption]) => <figure key={src}><div className="image-frame"><img src={`/images/${src}.webp`} alt={caption} loading="lazy" /></div><figcaption>{caption}</figcaption></figure>)}</div>
  </div></section>
}
