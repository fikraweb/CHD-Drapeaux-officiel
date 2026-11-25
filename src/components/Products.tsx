import { useState } from 'react'
import { catalog, catalogGroups } from '../catalog'
const priceFormat = new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', currencyDisplay: 'code', minimumFractionDigits: 0, maximumFractionDigits: 2 })

function flagEmoji(code: string) {
  return String.fromCodePoint(...Array.from(code, letter => 0x1F1E6 + letter.charCodeAt(0) - 65))
}

export default function Products() {
  const [group, setGroup] = useState<typeof catalogGroups[number]['id']>('reception')
  const models = catalog.filter(product => product.group === group)

  return <section id="produits" className="section catalog"><div className="wrap">
    <div className="intro center"><h2>Catalogue de drapeaux</h2><p>Drapeaux sur pied, modèles de bureau et formats pour vos réceptions.</p></div>
    <div className="catalog-filters" role="group" aria-label="Gammes de produits">
      {catalogGroups.map(item => <button key={item.id} type="button" aria-pressed={group === item.id} onClick={() => setGroup(item.id)}>{item.title}</button>)}
    </div>
    <p className="catalog-count" role="status">{models.length} modèles <span>· Visuels illustratifs par gamme</span></p>
    <div className="product-grid">{models.map(product => <article key={product.id} className="product">
      <div className="image-frame"><img src={`/images/catalogue/${product.image}.webp`} alt="" width="656" height="600" loading="lazy" />{product.country && <span className="catalog-flag" aria-hidden="true">{flagEmoji(product.country)}</span>}</div>
      <div className="product-copy"><h3>{product.title}</h3><p>{product.detail}</p><strong className="catalog-price">{priceFormat.format(product.price)}</strong></div>
    </article>)}</div>
    <div className="catalog-custom"><p>Vous avez un autre format ou un modèle sur mesure en tête ?</p><a className="button" href="#contact">Nous contacter</a></div>
  </div></section>
}
