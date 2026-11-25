import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { MessageCircle } from 'lucide-react'
import { catalog, productPath } from './catalog'
import ProductPage from './components/ProductPage'
import { useCart } from './cart'
import Cart from './components/Cart'
import Header from './components/Header'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import Products from './components/Products'
import Process from './components/Process'
import Gallery from './components/Gallery'
import Clients from './components/Clients'
import QuoteForm from './components/QuoteForm'
import Contact, { contactWhatsapp } from './components/Contact'
import Footer from './components/Footer'
import { Brand, quotePath } from './components/ui'
import './styles.css'

const path = window.location.pathname
const product = catalog.find(item => productPath(item.id) === path.replace(/\/$/, ''))
const isQuote = path === '/devis' || path === '/devis/'

function redirectLegacyQuote() {
  const legacyQuote = /^#devis(?:\/([a-z-]+))?$/.exec(window.location.hash)
  if (path !== '/' || !legacyQuote) return false
  window.location.replace(quotePath(legacyQuote[1]))
  return true
}

function App() {
  const cart = useCart()
  const cartDialog = useRef<HTMLDialogElement>(null)
  const [announcement, setAnnouncement] = useState('')

  function addToCart(key: string, title: string, quantity = 1) {
    cart.change(key, quantity)
    setAnnouncement(`${title} ajouté au panier.`)
    cartDialog.current?.showModal()
  }

  useEffect(() => {
    if (product) document.title = `${product.title} — CHD Drapeaux`
    if (isQuote) document.title = 'Demander un devis — CHD Drapeaux'
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('arrived')
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.08 })
    document.querySelectorAll('.section .intro, .process-grid, .quote-intro').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  if (path !== '/' && !isQuote && !product) return <main className="not-found wrap"><Brand /><h1>Page introuvable</h1><p>Retrouvez nos drapeaux et le formulaire de devis depuis l’accueil.</p><a className="button red" href="/">Retour à l’accueil</a></main>

  return <>
    <a className="skip" href="#contenu">Aller au contenu</a>
    <Header count={cart.count} onOpenCart={() => cartDialog.current?.showModal()} />
    <main id="contenu">{isQuote ? <QuoteForm /> : product ? <ProductPage product={product} onAdd={addToCart} /> : <><Hero /><Products onAdd={addToCart} /><Expertise /><Process /><Gallery /><Clients /><Contact /></>}</main>
    <Footer />
    <div className="sr-only" role="status">{announcement}</div>
    <Cart dialog={cartDialog} lines={cart.lines} onChange={cart.change} onRemove={cart.remove} />
    <a className="whatsapp" href={contactWhatsapp || '/#contact'} aria-label={contactWhatsapp ? 'Contacter CHD Drapeaux sur WhatsApp' : 'Voir les informations de contact WhatsApp'} title="WhatsApp"><MessageCircle size={28} strokeWidth={1.9} /></a>
  </>
}

if (path === '/') window.addEventListener('hashchange', redirectLegacyQuote)
if (!redirectLegacyQuote()) {
  createRoot(document.getElementById('root')!).render(<App />)
}
