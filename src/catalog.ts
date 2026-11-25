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

const deskChoiceId = 'bureau-international-40'
export const standingFlagId = 'national-support-2m'
const standingPhotoCodes = ['MA', 'ES', 'FR', 'US', 'DE', 'IT', 'CN', 'EU']

function deskFlagId(code: string) {
  return `bureau-${code.toLowerCase()}-40`
}

export function catalogOptions(id: string) {
  if (id === standingFlagId) return standingFlagOptions
  if (id === deskChoiceId) return countryOptions
  return []
}

export function usesIllustrativePhoto(id: string, variant?: string) {
  if (id === standingFlagId) return !variant || !standingPhotoCodes.includes(variant)
  return id === deskChoiceId && (!variant || !internationalDeskCodes.includes(variant))
}

export function catalogImage(id: string, variant?: string, hd = false) {
  const illustrative = usesIllustrativePhoto(id, variant)
  if (id === deskChoiceId && illustrative) return hd ? '/images/hero-signature.webp' : '/images/hero-signature-mobile.webp'
  const imageId = id === deskChoiceId && variant
    ? deskFlagId(variant)
    : id + (variant && !illustrative ? `-${variant.toLowerCase()}` : '')
  return `/images/catalogue/${hd ? 'hd/' : ''}${imageId}.webp`
}

export function productCartKey(id: string, variant?: string) {
  if (!variant) return id
  return id === deskChoiceId && internationalDeskCodes.includes(variant) ? deskFlagId(variant) : `${id}:${variant}`
}

export function productPath(id: string) {
  return `/produits/${id}`
}

export function catalogPath(group: CatalogProduct['group']) {
  return `/?gamme=${group}#produits`
}

const internationalDeskCodes = ['US', 'BH', 'BR', 'CN', 'ES', 'FI', 'GR', 'LB', 'MR', 'PS', 'SO']
const internationalDesk = countries.filter(({ code }) => internationalDeskCodes.includes(code))
const additionalDeskCodes = 'MA FR DE GB IT PT NL BE CH AT SE NO DK PL TR RU UA CA MX AR CL CO JP KR IN PK ID MY SG AU NZ EG DZ TN SA AE QA JO ZA'.split(' ')
const countryOptions = countries.filter(({ code }) => internationalDeskCodes.includes(code) || additionalDeskCodes.includes(code))

const standingFlagOptions = [...countryOptions, { code: 'EU', name: 'Union européenne' }]

export const catalog: CatalogProduct[] = [
  { id: 'reception-maroc', price: 799, group: 'reception', category: 'nationaux', title: 'Drapeau marocain prestige pour bureaux et hôtels', detail: 'Pour salles de réception, hôtels et espaces de représentation.' },
  { id: 'maroc-support-2m', price: 799, group: 'reception', category: 'nationaux', title: 'Drapeau marocain premium avec support doré – 2 m', detail: 'Support doré · 2 m' },
  { id: 'france-velours-2m', price: 899, group: 'reception', category: 'internationaux', title: 'Drapeau français en velours premium avec support doré – 2 m', detail: 'Support doré · 2 m', country: 'FR', features: ['Drapeau en velours avec bordure dorée', 'Livré avec son support doré', 'Pour bureaux, hôtels et événements'] },
  { id: 'arabie-saoudite-velours', price: 899, group: 'reception', category: 'internationaux', title: 'Drapeau d’Arabie saoudite en velours premium avec support doré – 2 m', detail: 'Velours et support doré', country: 'SA' },
  { id: 'italie-velours-2m', price: 899, group: 'reception', category: 'internationaux', title: 'Drapeau italien en velours premium avec support doré – 2 m', detail: 'Support doré · 2 m', country: 'IT' },
  { id: standingFlagId, price: 799, group: 'reception', category: 'internationaux', title: 'Drapeau national premium sur support – 2 m, pays au choix', detail: `Support de 2 m · ${countryOptions.length} pays au choix et Union européenne.` },
  { id: 'bureau-maroc-50', price: 249, group: 'maroc', category: 'nationaux', title: 'Drapeau marocain premium sur support – 50 cm', detail: 'Format de 50 cm' },
  { id: 'bureau-royal-29', price: 99.99, group: 'maroc', category: 'nationaux', title: 'Drapeau de bureau Maroc Royal – 29 cm', detail: 'Format de 29 cm · finitions brodées' },
  { id: 'table-maroc', price: 149.99, group: 'maroc', category: 'nationaux', title: 'Drapeau de bureau marocain haut de gamme', detail: 'Pour salles de réunion, événements et espaces d’accueil.' },
  { id: 'raie-bureau-maroc', price: 199.99, group: 'maroc', category: 'nationaux', title: 'Raie de bureau marocaine', detail: 'Modèle de bureau sur support individuel.' },
  { id: deskChoiceId, price: 180, group: 'monde', category: 'internationaux', title: 'Drapeau de bureau Prestige – 40 cm, pays au choix', detail: `Choisissez parmi ${countryOptions.length} pays.` },
  ...internationalDesk.map(({ code, name }): CatalogProduct => ({
    id: deskFlagId(code),
    group: 'monde',
    category: 'internationaux',
    title: `Drapeau de bureau Prestige – ${name} (40 cm)`,
    detail: 'Format de 40 cm · collection internationale',
    price: 180,
    country: code,
  })),
]
