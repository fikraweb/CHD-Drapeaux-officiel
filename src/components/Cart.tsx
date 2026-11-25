import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { type RefObject } from 'react'
import { cartProduct, maxQuantity, type CartLine } from '../cart'
import { catalogImage, priceFormat } from '../catalog'
import { whatsappUrl } from '../config'

export default function Cart({ dialog, lines, onChange, onRemove }: {
  dialog: RefObject<HTMLDialogElement | null>
  lines: CartLine[]
  onChange: (key: string, amount: number) => void
  onRemove: (key: string) => void
}) {
  const items = lines.flatMap(line => {
    const item = cartProduct(line.key)
    if (!item) return []
    const { product, variant } = item
    return [{
      ...line,
      title: variant ? `${product.title} · ${variant.name}` : product.title,
      image: catalogImage(product.id, variant?.code),
      subtotal: Math.round(product.price * 100) * line.quantity,
    }]
  })
  const total = priceFormat.format(items.reduce((sum, item) => sum + item.subtotal, 0) / 100)
  const order = whatsappUrl([
    'Bonjour CHD Drapeaux, je souhaite passer cette commande :',
    ...items.map(item => `• ${item.quantity} × ${item.title} — ${priceFormat.format(item.subtotal / 100)}`),
    `Total des articles : ${total}`,
    'Pouvez-vous me confirmer la disponibilité et les modalités de livraison ?',
  ].join('\n'))

  return <dialog ref={dialog} className="cart-dialog" aria-labelledby="cart-title">
    <div className="cart-heading"><h2 id="cart-title"><ShoppingBag size={23} /> Mon panier</h2><button type="button" className="cart-icon" aria-label="Fermer le panier" onClick={() => dialog.current?.close()}><X size={22} /></button></div>
    {items.length === 0 ? <p className="cart-empty">Votre panier est vide.</p> : <>
      <ul className="cart-items">
        {items.map(item => <li key={item.key}>
          <img src={item.image} alt="" width="64" height="76" />
          <div className="cart-item-detail">
            <h3>{item.title}</h3>
            <p>{priceFormat.format(item.subtotal / 100)}</p>
            <div className="cart-quantity">
              <button className="cart-icon" type="button" onClick={() => onChange(item.key, -1)} aria-label={`Diminuer la quantité de ${item.title}`}><Minus size={16} /></button>
              <span aria-label="Quantité">{item.quantity}</span>
              <button className="cart-icon" type="button" onClick={() => onChange(item.key, 1)} disabled={item.quantity >= maxQuantity} aria-label={`Augmenter la quantité de ${item.title}`}><Plus size={16} /></button>
              <button className="cart-icon cart-remove" type="button" onClick={() => onRemove(item.key)} aria-label={`Retirer ${item.title}`}><Trash2 size={16} /></button>
            </div>
          </div>
        </li>)}
      </ul>
      <div className="cart-checkout">
        <p className="cart-total"><span>Total des articles</span><strong>{total}</strong></p>
        {order && <a className="button" href={order} target="_blank" rel="noopener noreferrer">Commander sur WhatsApp</a>}
        <p>Disponibilité et livraison confirmées par WhatsApp.</p>
      </div>
    </>}
  </dialog>
}
