import { ArrowDown } from 'lucide-react'
import { Eyebrow, QuoteLink } from './ui'

export default function Hero() {
  return <section className="hero" id="accueil">
    <div className="wrap hero-inner">
      <Eyebrow>FABRICANT DE DRAPEAUX AU MAROC</Eyebrow>
      <h1>Des drapeaux à la hauteur de <em>vos institutions</em></h1>
      <p>Fabrication et fourniture de drapeaux nationaux, internationaux et institutionnels avec une attention particulière portée à la qualité, aux finitions et à la durabilité.</p>
      <div className="actions"><a className="button red" href="#produits">Explorer le catalogue <ArrowDown size={17} /></a><QuoteLink className="outline" /></div>
    </div>
    <picture>
      <source media="(max-width: 650px)" srcSet="/images/hero-signature-mobile.webp" />
      <img src="/images/hero-signature.webp" alt="Drapeaux de bureau marocain et internationaux sur des supports en laiton" fetchPriority="high" width="1672" height="941" />
    </picture>
    <div className="hero-line" />
  </section>
}
