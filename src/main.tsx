import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { MessageCircle } from 'lucide-react'
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
const isQuote = path === '/devis' || path === '/devis/'

function App() {
  useEffect(() => {
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

  if (path !== '/' && !isQuote) return <main className="not-found wrap"><Brand /><h1>Page introuvable</h1><p>Retrouvez nos drapeaux et le formulaire de devis depuis l’accueil.</p><a className="button red" href="/">Retour à l’accueil</a></main>

  return <>
    <a className="skip" href="#contenu">Aller au contenu</a>
    <Header />
    <main id="contenu">{isQuote ? <QuoteForm /> : <><Hero /><Expertise /><Products /><Process /><Gallery /><Clients /><Contact /></>}</main>
    <Footer />
    <a className="whatsapp" href={contactWhatsapp || '/#contact'} aria-label={contactWhatsapp ? 'Contacter CHD Drapeaux sur WhatsApp' : 'Voir les informations de contact WhatsApp'} title="WhatsApp"><MessageCircle size={28} strokeWidth={1.9} /></a>
  </>
}

const legacyQuote = /^#devis(?:\/([a-z-]+))?$/.exec(window.location.hash)
if (path === '/' && legacyQuote) {
  window.location.replace(quotePath(legacyQuote[1]))
} else {
  createRoot(document.getElementById('root')!).render(<App />)
}
