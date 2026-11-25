import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { catalog, catalogGroups, catalogImage, priceFormat, standingFlagId, standingFlagOptions, type CatalogProduct } from '../catalog'

function ProductCard({ product, onAdd }: { product: CatalogProduct; onAdd: (key: string, title: string) => void }) {
  const [code, setCode] = useState('')
  const hasOptions = product.id === standingFlagId
  const option = standingFlagOptions.find(item => item.code === code)
  const title = option ? `${product.title} · ${option.name}` : product.title

  return <article className="product">
    <div className="image-frame"><img src={catalogImage(product.id, option?.code)} alt={title} loading="lazy" /></div>
    <div className="product-copy">
      <h3>{product.title}</h3>
      <p>{product.detail}</p>
      {hasOptions && <label className="catalog-option">Choisir un drapeau
        <select value={code} onChange={event => setCode(event.target.value)}>
          <option value="">Sélectionner un pays</option>
          {standingFlagOptions.map(item => <option key={item.code} value={item.code}>{item.name}</option>)}
        </select>
      </label>}
      <strong className="catalog-price">{priceFormat.format(product.price)}</strong>
      <button className="button catalog-add" type="button" disabled={hasOptions && !option} onClick={() => onAdd(option ? `${product.id}:${option.code}` : product.id, title)}>
        <ShoppingBag size={16} /> Ajouter au panier
      </button>
    </div>
  </article>
}

export default function Products({ onAdd }: { onAdd: (key: string, title: string) => void }) {
  const [group, setGroup] = useState<typeof catalogGroups[number]['id']>('reception')
  const models = catalog.filter(product => product.group === group)

  return <section id="produits" className="section catalog"><div className="wrap">
    <div className="intro center"><h2>Catalogue de drapeaux</h2><p>Drapeaux sur pied, modèles de bureau et formats pour vos réceptions.</p></div>
    <div className="catalog-filters" role="group" aria-label="Gammes de produits">
      {catalogGroups.map(item => <button key={item.id} type="button" aria-pressed={group === item.id} onClick={() => setGroup(item.id)}>{item.title}</button>)}
    </div>
    <p className="catalog-count" role="status">{models.length} modèles</p>
    <div className="product-grid">{models.map(product => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div>
    <div className="catalog-custom"><p>Vous avez un autre format ou un modèle sur mesure en tête ?</p><a className="button" href="#contact">Nous contacter</a></div>
  </div></section>
}
