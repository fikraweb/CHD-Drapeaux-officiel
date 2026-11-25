import { products } from '../config'
import { QuoteLink } from './ui'

export default function Products() {
  return <section id="produits" className="section catalog"><div className="wrap">
    <div className="intro center"><h2>Nos gammes de drapeaux</h2><p>Des drapeaux pensés pour chaque lieu, chaque usage et chaque occasion.</p></div>
    <div className="product-grid">{products.map(product => <article key={product.id} className="product">
      <div className="image-frame"><img src={`/images/photo-${product.image}.webp`} alt={product.alt} width="512" height="512" loading="lazy" /></div>
      <div className="product-copy"><h3>{product.title}</h3><p>{product.description}</p><QuoteLink className="text-link" product={product.id} /></div>
    </article>)}</div>
  </div></section>
}
