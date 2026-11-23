import { Landmark, MapPinned, Globe2, Building2, GraduationCap, Hotel, CalendarDays } from 'lucide-react'
import { Eyebrow } from './ui'

const sectors = [
  { Icon: Landmark, title: 'Administrations publiques', text: 'Pour les façades, bureaux et cérémonies officielles.' },
  { Icon: MapPinned, title: 'Collectivités territoriales', text: 'Pour les mairies, espaces publics et événements locaux.' },
  { Icon: Globe2, title: 'Ambassades et organisations', text: 'Pour les rencontres et usages protocolaires.' },
  { Icon: Building2, title: 'Entreprises', text: 'Pour l’identité visuelle des sièges et sites professionnels.' },
  { Icon: GraduationCap, title: 'Établissements scolaires et universitaires', text: 'Pour les campus et cérémonies académiques.' },
  { Icon: Hotel, title: 'Hôtels et établissements touristiques', text: 'Pour les entrées et espaces d’accueil.' },
  { Icon: CalendarDays, title: 'Organisateurs d’événements', text: 'Pour les conférences, salons et manifestations.' },
]

export default function Clients() {
  return <section className="section light"><div className="wrap">
    <div className="intro"><Eyebrow>SECTEURS D’ACTIVITÉ</Eyebrow><h2>Des solutions adaptées aux professionnels</h2></div>
    <div className="sectors">{sectors.map(({ Icon, title, text }) => <article key={title}><Icon size={24} strokeWidth={1.6} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
  </div></section>
}
