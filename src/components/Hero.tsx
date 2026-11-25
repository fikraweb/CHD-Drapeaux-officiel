import { ArrowRight, Flag, Globe2, Landmark } from 'lucide-react'

export default function Hero() {
  return <section className="hero" id="accueil">
    <div className="wrap hero-inner">
      <div className="hero-copy">
        <p className="hero-signature">CHD Drapeaux</p>
        <h1>Les couleurs du monde, <em>le savoir-faire du Maroc</em></h1>
        <p className="hero-description">Drapeaux de bureau, de réception et de cérémonie pour les entreprises et les institutions.</p>
        <ul className="hero-range" aria-label="Les points forts de la collection">
          <li><Flag size={19} aria-hidden="true" /> Modèles de bureau<br /> et sur pied</li>
          <li><Globe2 size={19} aria-hidden="true" /> 50 pays<br /> au choix</li>
          <li><Landmark size={19} aria-hidden="true" /> Supports de<br /> cérémonie</li>
        </ul>
        <a className="button hero-cta" href="#produits">Découvrir la collection <ArrowRight size={17} /></a>
      </div>
    </div>
    <picture>
      <source media="(max-width: 850px)" srcSet="/images/hero-reception-mobile.webp" />
      <img src="/images/hero-reception.webp" alt="Drapeaux de cérémonie sur supports dorés, avec le drapeau marocain au premier plan" fetchPriority="high" width="2172" height="724" />
    </picture>
  </section>
}
