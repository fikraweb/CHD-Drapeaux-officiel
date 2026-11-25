export const company = {
  name: 'CHD Drapeaux',
  country: 'Maroc',
  phone: '',
  whatsapp: '+212 663-211774',
  email: '',
  address: '',
  hours: '',
  mapsEmbedUrl: '',
  quoteEndpoint: '',
  social: { LinkedIn: '', Instagram: '' },
}

export const whatsappUrl = (message: string) =>
  company.whatsapp ? `https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}` : ''

export const contactWhatsapp = whatsappUrl('Bonjour, je souhaite des informations sur vos drapeaux.')

export const navigation = [
  ['Accueil', 'accueil'],
  ['Nos produits', 'produits'],
  ['Notre savoir-faire', 'savoir-faire'],
  ['Nos réalisations', 'realisations'],
  ['À propos', 'a-propos'],
  ['Contact', 'contact'],
]

export const products = [
  { id: 'nationaux', title: 'Drapeaux nationaux', description: 'Drapeaux des pays pour les administrations, institutions, entreprises et événements officiels.', image: 0, alt: 'Drapeau marocain flottant dans le ciel' },
  { id: 'internationaux', title: 'Drapeaux internationaux', description: 'Drapeaux du monde pour les organisations, espaces institutionnels et événements internationaux.', image: 1, alt: 'Drapeaux de plusieurs pays sur une rangée de mâts' },
  { id: 'institutionnels', title: 'Drapeaux institutionnels', description: 'Pour les administrations, collectivités, organismes publics, établissements et entreprises.', image: 2, alt: 'Drapeaux de cérémonie dans une salle de réunion' },
  { id: 'personnalises', title: 'Drapeaux personnalisés', description: 'Fabrication sur demande selon vos dimensions, couleurs, modèles et spécifications.', image: 3, alt: 'Échantillons de tissus rouge, bleu marine et crème' },
  { id: 'evenements', title: 'Drapeaux pour cérémonies et événements', description: 'Solutions pour cérémonies officielles, conférences, manifestations et occasions spéciales.', image: 4, alt: 'Drapeaux près d’un pupitre dans une salle de cérémonie' },
]
