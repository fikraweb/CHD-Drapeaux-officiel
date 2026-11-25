import { countries } from './countries'

export const catalogGroups = [
  { id: 'reception', title: 'Réception et protocole' },
  { id: 'maroc', title: 'Drapeaux de bureau marocains' },
  { id: 'monde', title: 'Drapeaux de bureau internationaux' },
] as const

type CatalogProduct = {
  id: string
  group: typeof catalogGroups[number]['id']
  category: 'nationaux' | 'internationaux' | 'institutionnels'
  title: string
  detail: string
  image: 'reception-maroc' | 'reception-monde' | 'bureau-maroc' | 'bureau-monde'
  country?: string
}

const internationalDeskCodes = ['FR', 'BH', 'BR', 'CN', 'ES', 'FI', 'GR', 'LB', 'MR', 'PS', 'SO']
const internationalDesk = countries.filter(({ code }) => internationalDeskCodes.includes(code))

export const catalog: CatalogProduct[] = [
  { id: 'reception-maroc', group: 'reception', category: 'nationaux', title: 'Drapeau marocain de réception', detail: 'Pour salles de réception, hôtels et espaces de représentation.', image: 'reception-maroc' },
  { id: 'maroc-support-2m', group: 'reception', category: 'nationaux', title: 'Drapeau marocain sur pied', detail: 'Support doré · 2 m', image: 'reception-maroc' },
  { id: 'france-velours-2m', group: 'reception', category: 'internationaux', title: 'Drapeau français en velours', detail: 'Support doré · 2 m', image: 'reception-monde', country: 'FR' },
  { id: 'arabie-saoudite-velours', group: 'reception', category: 'internationaux', title: 'Drapeau saoudien de réception', detail: 'Velours et support doré', image: 'reception-monde', country: 'SA' },
  { id: 'italie-velours-2m', group: 'reception', category: 'internationaux', title: 'Drapeau italien en velours', detail: 'Support doré · 2 m', image: 'reception-monde', country: 'IT' },
  { id: 'national-support-2m', group: 'reception', category: 'internationaux', title: 'Drapeau sur pied — pays au choix', detail: 'Support de 2 m · Maroc, Espagne, France, États-Unis, Allemagne, Italie, Chine et autres pays sur demande.', image: 'reception-monde' },
  { id: 'bureau-maroc-50', group: 'maroc', category: 'nationaux', title: 'Drapeau marocain sur support de bureau', detail: 'Format de 50 cm', image: 'bureau-maroc' },
  { id: 'bureau-royal-29', group: 'maroc', category: 'nationaux', title: 'Drapeau de bureau Maroc Royal', detail: 'Format de 29 cm · finitions brodées', image: 'bureau-maroc' },
  { id: 'table-maroc', group: 'maroc', category: 'nationaux', title: 'Drapeau de table marocain', detail: 'Pour salles de réunion, événements et espaces d’accueil.', image: 'bureau-maroc' },
  { id: 'raie-bureau-maroc', group: 'maroc', category: 'nationaux', title: 'Raie de bureau marocaine', detail: 'Modèle de bureau sur support individuel.', image: 'bureau-maroc' },
  ...internationalDesk.map(({ code, name }): CatalogProduct => ({
    id: `bureau-${code.toLowerCase()}-40`,
    group: 'monde',
    category: 'internationaux',
    title: `Drapeau de bureau — ${name}`,
    detail: 'Format de 40 cm · collection internationale',
    image: 'bureau-monde',
    country: code,
  })),
]
