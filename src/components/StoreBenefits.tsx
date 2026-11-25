import { BadgeCheck, CreditCard, Truck } from 'lucide-react'

const benefits = [
  { Icon: CreditCard, label: 'Paiement à la livraison' },
  { Icon: Truck, label: 'Livraison gratuite' },
  { Icon: BadgeCheck, label: 'Garantie de haute qualité' },
]

export default function StoreBenefits() {
  return <section className="store-benefits" aria-label="Nos engagements">
    <ul className="wrap">{benefits.map(({ Icon, label }) =>
      <li key={label}><span><Icon size={27} aria-hidden="true" /></span>{label}</li>,
    )}</ul>
  </section>
}
