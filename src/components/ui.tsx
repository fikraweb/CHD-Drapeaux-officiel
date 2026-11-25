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

export function quotePath(product?: string) {
  return product ? `/devis?type=${encodeURIComponent(product)}` : '/devis'
}
