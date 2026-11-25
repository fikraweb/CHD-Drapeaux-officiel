import { countries } from './countries'

export const catalogGroups = [
  { id: 'reception', title: 'Réception et protocole' },
  { id: 'maroc', title: 'Drapeaux de bureau marocains' },
  { id: 'monde', title: 'Drapeaux de bureau internationaux' },
] as const

export type CatalogProduct = {
  id: string
  group: typeof catalogGroups[number]['id']
  category: 'nationaux' | 'internationaux' | 'institutionnels'
  title: string
  detail: string
  price: number
  features?: string[]
  country?: string
}

export const priceFormat = new Intl.NumberFormat('fr-MA', {
  style: 'currency', currency: 'MAD', currencyDisplay: 'code', minimumFractionDigits: 0, maximumFractionDigits: 2,
})

export const standingFlagId = 'national-support-2m'
export const standingFlagOptions = ['MA', 'ES', 'FR', 'US', 'DE', 'IT', 'CN', 'EU'].map(code => ({
  code,
  name: code === 'EU' ? 'Union européenne' : countries.find(country => country.code === code)?.name ?? code,
}))

export function catalogImage(id: string, variant?: string, hd = false) {
  return `/images/catalogue/${hd ? 'hd/' : ''}${id}${variant ? `-${variant.toLowerCase()}` : ''}.webp`
}

export function productPath(id: string) {
  return `/produits/${id}`
}

export function catalogPath(group: CatalogProduct['group']) {
  return `/?gamme=${group}#produits`
}

const internationalDeskCodes = ['US', 'BH', 'BR', 'CN', 'ES', 'FI', 'GR', 'LB', 'MR', 'PS', 'SO']
const internationalDesk = countries.filter(({ code }) => internationalDeskCodes.includes(code))

export const catalog: CatalogProduct[] = [
  { id: 'reception-maroc', price: 799, group: 'reception', category: 'nationaux', title: 'Drapeau marocain de réception', detail: 'Pour salles de réception, hôtels et espaces de représentation.' },
  { id: 'maroc-support-2m', price: 799, group: 'reception', category: 'nationaux', title: 'Drapeau marocain sur pied', detail: 'Support doré · 2 m' },
  { id: 'france-velours-2m', price: 899, group: 'reception', category: 'internationaux', title: 'Drapeau français en velours', detail: 'Support doré · 2 m', country: 'FR', features: ['Drapeau en velours avec bordure dorée', 'Livré avec son support doré', 'Pour bureaux, hôtels et événements'] },
  { id: 'arabie-saoudite-velours', price: 899, group: 'reception', category: 'internationaux', title: 'Drapeau saoudien de réception', detail: 'Velours et support doré', country: 'SA' },
  { id: 'italie-velours-2m', price: 899, group: 'reception', category: 'internationaux', title: 'Drapeau italien en velours', detail: 'Support doré · 2 m', country: 'IT' },
  { id: standingFlagId, price: 799, group: 'reception', category: 'internationaux', title: 'Drapeau sur pied — pays au choix', detail: 'Support de 2 m · Maroc, Espagne, France, États-Unis, Allemagne, Italie, Chine et Union européenne.' },
  { id: 'bureau-maroc-50', price: 249, group: 'maroc', category: 'nationaux', title: 'Drapeau marocain sur support de bureau', detail: 'Format de 50 cm' },
  { id: 'bureau-royal-29', price: 99.99, group: 'maroc', category: 'nationaux', title: 'Drapeau de bureau Maroc Royal', detail: 'Format de 29 cm · finitions brodées' },
  { id: 'table-maroc', price: 149.99, group: 'maroc', category: 'nationaux', title: 'Drapeau de table marocain', detail: 'Pour salles de réunion, événements et espaces d’accueil.' },
  { id: 'raie-bureau-maroc', price: 199.99, group: 'maroc', category: 'nationaux', title: 'Raie de bureau marocaine', detail: 'Modèle de bureau sur support individuel.' },
  ...internationalDesk.map(({ code, name }): CatalogProduct => ({
    id: `bureau-${code.toLowerCase()}-40`,
    group: 'monde',
    category: 'internationaux',
    title: `Drapeau de bureau — ${name}`,
    detail: 'Format de 40 cm · collection internationale',
    price: 180,

    country: code,
  })),
]
