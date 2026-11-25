import { useState, type FormEvent } from 'react'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { catalogGroups, catalogImage, catalogPath, priceFormat, standingFlagId, standingFlagOptions, type CatalogProduct } from '../catalog'
import { maxQuantity } from '../cart'
import ProductZoom from './ProductZoom'
import FlagSelect from './FlagSelect'
import { Eyebrow } from './ui'

export default function ProductPage({ product, onAdd }: {
  product: CatalogProduct
  onAdd: (key: string, title: string, quantity?: number) => void
}) {
  const [code, setCode] = useState('')
  const option = standingFlagOptions.find(item => item.code === code)
  const hasOptions = product.id === standingFlagId
  const title = option ? `${product.title} · ${option.name}` : product.title
  const image = catalogImage(product.id, option?.code, true)
  const group = catalogGroups.find(item => item.id === product.group)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (hasOptions && !option) return
    const quantity = new FormData(event.currentTarget).get('quantity')
    onAdd(option ? `${product.id}:${option.code}` : product.id, title, Number(quantity))
  }

  return <section className="section product-page"><div className="wrap">
    <a className="product-back" href={catalogPath(product.group)}><ArrowLeft size={17} /> Retour au catalogue</a>
    <div className="product-page-grid">
      <ProductZoom key={image} src={image} title={title} />
      <div className="product-page-copy">
        {group && <Eyebrow>{group.title}</Eyebrow>}
        <h1>{product.title}</h1>
        <p className="product-page-price">{priceFormat.format(product.price)}</p>
        <p className="product-page-detail">{product.detail}</p>
        {product.features && <ul className="product-features">{product.features.map(feature => <li key={feature}>{feature}</li>)}</ul>}
        <form className="product-purchase" onSubmit={submit}>
          {hasOptions && <FlagSelect value={code} onChange={setCode} />}
          <div className="product-purchase-controls">
            <label>Quantité<input name="quantity" type="number" min="1" max={maxQuantity} step="1" defaultValue="1" required /></label>
            <button type="submit" className="button" disabled={hasOptions && !option}><ShoppingBag size={18} /> Ajouter au panier</button>
          </div>
        </form>
        <p className="product-order-note">Disponibilité et livraison confirmées par WhatsApp.</p>
      </div>
    </div>
  </div></section>
}
