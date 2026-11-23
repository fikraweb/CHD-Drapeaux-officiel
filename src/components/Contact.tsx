import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { company, whatsappUrl } from '../config'
import { Eyebrow } from './ui'

export const contactWhatsapp = whatsappUrl('Bonjour, je souhaite des informations sur vos drapeaux.')

const items = [
  { Icon: Phone, label: 'Téléphone', value: company.phone, href: company.phone && `tel:${company.phone}` },
  { Icon: MessageCircle, label: 'WhatsApp', value: company.whatsapp, href: contactWhatsapp },
  { Icon: Mail, label: 'E-mail', value: company.email, href: company.email && `mailto:${company.email}` },
  { Icon: MapPin, label: 'Adresse', value: company.address || 'Maroc · Adresse à renseigner' },
  { Icon: Clock3, label: 'Horaires', value: company.hours },
]

export default function Contact() {
  return <section id="contact" className="section"><div className="wrap contact-grid">
    <div><Eyebrow>CONTACT</Eyebrow><h2>Parlons de votre projet</h2><dl className="contact-list">{items.map(({ Icon, label, value, href }) => <div key={label}><Icon size={21} strokeWidth={1.65} /><div><dt>{label}</dt><dd>{href ? <a href={href}>{value}</a> : value || 'À renseigner'}</dd></div></div>)}</dl></div>
    {company.mapsEmbedUrl ? <iframe title="Carte Google Maps de CHD Drapeaux" src={company.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : <div className="contact-photo image-frame"><img src="/images/hero-small.webp" alt="Illustration de drapeaux marocains devant un bâtiment" width="850" height="567" loading="lazy" /></div>}
  </div></section>
}
