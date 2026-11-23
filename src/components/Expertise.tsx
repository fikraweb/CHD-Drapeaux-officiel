import { BadgeCheck, SlidersHorizontal, Handshake } from 'lucide-react'
import { Eyebrow } from './ui'

const advantages = [
  { Icon: BadgeCheck, title: 'Fabrication soignée', text: 'Des finitions adaptées à une utilisation intérieure et extérieure.' },
  { Icon: SlidersHorizontal, title: 'Solutions personnalisées', text: 'Des dimensions, formats et configurations adaptés aux besoins de chaque client.' },
  { Icon: Handshake, title: 'Accompagnement professionnel', text: 'Une prise en charge des demandes de la sélection du produit jusqu’à la préparation de la commande.' },
]

export default function Expertise() {
  return <section id="a-propos" className="section expertise"><div className="wrap">
    <div className="center intro"><Eyebrow>NOTRE EXPERTISE</Eyebrow><h2>Notre expertise au service de vos institutions</h2><p>Nous accompagnons les administrations, collectivités, entreprises et organismes dans leurs besoins en drapeaux et supports de représentation, avec des solutions adaptées à chaque usage.</p></div>
    <div className="advantages">{advantages.map(({ Icon, title, text }) => <article key={title}><div className="line-icon"><Icon size={25} strokeWidth={1.65} /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
  </div></section>
}
