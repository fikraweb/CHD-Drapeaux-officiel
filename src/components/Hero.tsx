import HeroFlags from './HeroFlags'
import { ArrowDown } from 'lucide-react'
import { Eyebrow, QuoteLink } from './ui'

export default function Hero() {
  return <section className="hero" id="accueil">
    <picture><source media="(max-width: 680px)" srcSet="/images/hero-institution-small.webp" /><img src="/images/hero-institution.webp" alt="" fetchPriority="high" width="1536" height="1024" /></picture>
    <HeroFlags />
    <div className="wrap hero-inner">
      <Eyebrow>FABRICANT DE DRAPEAUX AU MAROC</Eyebrow>
      <h1>Des drapeaux qui représentent vos institutions</h1>
      <p>Fabrication et fourniture de drapeaux nationaux, internationaux et institutionnels avec une attention particulière portée à la qualité, aux finitions et à la durabilité.</p>
      <div className="actions"><a className="button red" href="#produits">Découvrir nos produits <ArrowDown size={17} /></a><QuoteLink className="outline" /></div>
    </div>
    <div className="hero-line" />
  </section>
}
