import { ArrowUpRight, Flag } from 'lucide-react'
import { company } from '../config'

export function Brand() {
  return <a className="brand" href="/#accueil" aria-label={company.name + ' — Accueil'}>
    <span className="brand-icon"><Flag strokeWidth={1.8} /></span>
    <span><strong>CHD<span>.</span></strong><small>DRAPEAUX</small></span>
  </a>
}

export function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>
}

export function QuoteLink({ className = '', product }: { className?: string; product?: string }) {
  const href = product ? `#devis/${product}` : '#devis'
  return <a className={`button ${className}`} href={href} onClick={event => {
    if (product && window.location.hash === href && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    }
  }}>Demander un devis <ArrowUpRight size={17} /></a>
}
