import { ArrowRight, Gem, Landmark, ShieldCheck, Star } from 'lucide-react'

export default function Hero() {
  return <section className="hero" id="accueil">
    <div className="wrap hero-inner">
      <div className="hero-copy">
        <p className="hero-signature">CHD Drapeaux</p>
        <h1>Les couleurs du monde, <em>le savoir-faire du Maroc</em></h1>
        <p className="hero-description">Des drapeaux premium pour vos bureaux, hôtels et espaces de prestige.</p>
        <ul className="hero-range" aria-label="Les points forts de la collection">
          <li><Gem aria-hidden="true" /> <span>Qualité premium</span></li>
          <li><Star aria-hidden="true" /> <span>Finitions élégantes</span></li>
          <li><ShieldCheck aria-hidden="true" /> <span>Support doré solide</span></li>
          <li><Landmark aria-hidden="true" /> <span>Idéal pour bureaux et institutions</span></li>
        </ul>
        <a className="button hero-cta" href="#produits">Découvrir la collection <ArrowRight size={17} /></a>
      </div>
    </div>
    <picture>
      <source media="(max-width: 850px)" srcSet="/images/hero-signature-mobile.webp" />
      <img src="/images/hero-signature.webp" alt="Drapeaux de cérémonie sur supports dorés, avec le drapeau marocain au premier plan" fetchPriority="high" width="1672" height="941" />
    </picture>
  </section>
}
