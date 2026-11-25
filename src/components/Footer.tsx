import { company, contactWhatsapp, navigation } from '../config'
import { Brand } from './ui'

export default function Footer() {
  return <footer id="contact" className="footer"><div className="wrap">
    <div className="footer-grid">
      <div><Brand /><p>Fabrication et fourniture de drapeaux au Maroc pour administrations, entreprises et institutions.</p></div>
      <div><h2>Navigation</h2>{navigation.map(([label, id]) => <a key={id} href={`/#${id}`}>{label}</a>)}</div>
      <div><h2>Contact</h2>{company.phone && <a href={`tel:${company.phone}`}>{company.phone}</a>}{company.email && <a href={`mailto:${company.email}`}>{company.email}</a>}{contactWhatsapp && <a href={contactWhatsapp}>WhatsApp</a>}{Object.entries(company.social).map(([label, url]) => url && <a key={label} href={url}>{label}</a>)}</div>
    </div>
    <div className="copyright">© {new Date().getFullYear()} {company.name}. Tous droits réservés.</div>
  </div></footer>
}
