import { useEffect, useState } from 'react'
import { MapPin, Menu, ShoppingBag, X } from 'lucide-react'
import { company, navigation } from '../config'
import { Brand } from './ui'

export default function Header({ count, onOpenCart }: { count: number; onOpenCart: () => void }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        document.getElementById('menu-toggle')?.focus()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open])

  return <>
    <div className="topbar"><div className="wrap"><span><MapPin size={13} /> Fabrication de drapeaux au Maroc</span><a href={company.phone ? `tel:${company.phone}` : '/#contact'}>{company.phone || 'Service aux professionnels'}</a></div></div>
    <header className="header">
      <div className="wrap header-inner">
        <Brand />
        <nav id="navigation" className={open ? 'navigation open' : 'navigation'} aria-label="Navigation principale">
          {navigation.map(([label, id]) => <a key={id} href={`/#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <div className="header-contact"><button className="button" type="button" onClick={onOpenCart} aria-haspopup="dialog" aria-label={`Ouvrir le panier, ${count} article(s)`}><ShoppingBag size={17} /> Panier <span className="cart-count">{count}</span></button></div>
        <button id="menu-toggle" className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="navigation" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  </>
}
