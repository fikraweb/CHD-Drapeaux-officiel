import { ArrowDown } from 'lucide-react'
import { Eyebrow, QuoteLink } from './ui'

export default function Hero() {
  return <section className="hero" id="accueil">
    <div className="wrap hero-inner">
      <Eyebrow>FABRICANT DE DRAPEAUX AU MAROC</Eyebrow>
      <h1>Des drapeaux qui représentent vos institutions</h1>
      <p>Fabrication et fourniture de drapeaux nationaux, internationaux et institutionnels avec une attention particulière portée à la qualité, aux finitions et à la durabilité.</p>
      <div className="actions"><a className="button red" href="#produits">Découvrir nos produits <ArrowDown size={17} /></a><QuoteLink className="outline" /></div>
    </div>
    <picture>
      <source media="(max-width: 650px)" srcSet="/images/hero-flags-mobile.webp" />
      <img src="/images/hero-flags.webp" alt="Drapeaux marocain et internationaux flottant devant un bâtiment institutionnel" fetchPriority="high" width="1673" height="940" />
    </picture>
    <div className="hero-line" />
  </section>
}
