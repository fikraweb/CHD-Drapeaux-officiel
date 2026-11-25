import { Eyebrow } from './ui'

const steps = [
  ['Sélection des matériaux', 'Choix de matériaux adaptés aux besoins et à l’utilisation du drapeau.'],
  ['Confection', 'Fabrication, assemblage et attention portée aux détails.'],
  ['Finitions', 'Contrôle des finitions et préparation du produit.'],
  ['Préparation de la commande', 'Préparation des produits selon les spécifications et demandes du client.'],
]

export default function Process() {
  return <section id="savoir-faire" className="section process"><div className="wrap process-grid">
    <div className="process-image image-frame"><img src="/images/photo-5.webp" alt="Machine à coudre industrielle confectionnant un drapeau rouge" width="512" height="512" loading="lazy" /></div>
    <div><Eyebrow>NOTRE SAVOIR-FAIRE</Eyebrow><h2>Le souci du détail, à chaque étape</h2>
      <ol className="steps">{steps.map(([title, description], index) => <li key={title}><span aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
      <a className="button red" href="#produits">Voir le catalogue</a>
    </div>
  </div></section>
}
