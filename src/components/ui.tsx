import { ArrowUpRight } from 'lucide-react'
import { company } from '../config'

export function Brand() {
  return <a className="brand" href="/#accueil" aria-label={company.name + ' — Accueil'}>
    <img
      className="brand-logo"
      src="/images/chd-logo-small.webp"
      srcSet="/images/chd-logo-small.webp 320w, /images/chd-logo.webp 640w"
      sizes="(max-width: 650px) 107px, 160px"
      alt=""
      width="320"
      height="201"
    />
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
