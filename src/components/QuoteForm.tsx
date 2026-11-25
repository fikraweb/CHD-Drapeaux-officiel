import { useRef, useState, type FormEvent } from 'react'
import CountryPicker from './CountryPicker'
import { catalog } from '../catalog'
import { countries } from '../countries'
import { ArrowLeft, ArrowUpRight, CheckCircle2, Download, Send } from 'lucide-react'
import { company, products, whatsappUrl } from '../config'
import { Eyebrow } from './ui'

const fields = [
  { name: 'name', label: 'Nom complet', autoComplete: 'name', required: true },
  { name: 'organization', label: 'Administration ou entreprise', autoComplete: 'organization', required: true },
  { name: 'phone', label: 'Téléphone', type: 'tel', autoComplete: 'tel', required: true },
  { name: 'email', label: 'Adresse e-mail', type: 'email', autoComplete: 'email', required: true },
]

export default function QuoteForm() {
  const query = new URLSearchParams(window.location.search)
  const candidate = catalog.find(item => item.id === query.get('modele'))
  const [type, setType] = useState(() => candidate?.category ?? products.find(item => item.id === query.get('type'))?.id ?? '')
  const [selectedCountries, setSelectedCountries] = useState<string[]>(() => candidate?.country ? [candidate.country] : [])
  const model = candidate?.category === type ? candidate : undefined
  const [countryError, setCountryError] = useState(false)
  const countryPanel = useRef<HTMLDetailsElement>(null)
  const [summary, setSummary] = useState('')
  const [status, setStatus] = useState<'idle' | 'ready' | 'sending' | 'sent' | 'error' | 'file-too-large'>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const requestedCountries = type === 'internationaux' ? countries.filter(country => selectedCountries.includes(country.code)) : []
    if (type === 'internationaux' && !requestedCountries.length && countryPanel.current) {
      setCountryError(true)
      countryPanel.current.open = true
      countryPanel.current.querySelector<HTMLInputElement>('input[type="search"]')?.focus()
      return
    }

    const data = new FormData(event.currentTarget)
    if (model) data.append('model', model.id)
    for (const country of requestedCountries) data.append('countries', country.code)
    const file = data.get('reference')
    if (file instanceof File && file.size > 10 * 1024 * 1024) {
      setStatus('file-too-large')
      return
    }
    const lines = [
      'Bonjour, je souhaite recevoir un devis pour mon projet.',
      ...fields.map(field => `${field.label} : ${data.get(field.name)}`),
      `Type de drapeau : ${products.find(product => product.id === type)?.title || 'À déterminer'}`,
      ...(model ? [`Modèle de référence : ${model.title} — ${model.detail}`] : []),
      ...(requestedCountries.length ? [`Pays : ${requestedCountries.map(country => country.name).join(', ')}`] : []),
      `Quantité : ${data.get('quantity')}`,
      `Dimensions : ${data.get('dimensions') || 'À déterminer'}`,
      `Description : ${data.get('description')}`,
    ]
    setSummary(lines.join('\n'))
    if (!company.quoteEndpoint) {
      setStatus('ready')
      return
    }
    setStatus('sending')
    try {
      const response = await fetch(company.quoteEndpoint, { method: 'POST', body: data })
      if (!response.ok) throw new Error('Échec de la soumission')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  function download() {
    const link = document.createElement('a')
    const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }))
    link.href = url
    link.download = 'demande-de-devis-chd.txt'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const whatsapp = whatsappUrl(summary)
  return <section id="devis" className="section quote quote-page"><div className="wrap quote-grid">
    <div className="quote-intro"><a className="quote-back" href="/#produits"><ArrowLeft size={17} /> Retour aux produits</a><Eyebrow>DEMANDE DE DEVIS</Eyebrow><h1>Votre projet, notre savoir-faire</h1><p>Vous recherchez des drapeaux adaptés à votre institution, votre entreprise ou votre événement ? Contactez-nous pour recevoir une proposition adaptée à vos besoins.</p></div>
    <form onSubmit={submit} className="quote-form" onChange={() => { if (status !== 'sending') setStatus('idle') }}>
      <fieldset disabled={status === 'sending'}>
        <legend>Décrivez votre projet</legend>
        <p className="form-note">Les champs marqués d’un astérisque sont obligatoires.</p>
        {model && <div className="quote-model"><span>Modèle de référence</span><strong>{model.title}</strong><p>{model.detail}</p></div>}
        <div className="form-fields">
          {fields.map(({ label, ...props }) => <label key={props.name}>{label} *<input {...props} maxLength={160} /></label>)}
          <label>Type de drapeau *<select name="type" value={type} onChange={event => { setType(event.target.value); setCountryError(false) }} required><option value="">Choisir une catégorie</option>{products.map(product => <option key={product.id} value={product.id}>{product.title}</option>)}<option value="autre">À déterminer</option></select></label>
          <label>Quantité souhaitée *<input name="quantity" type="number" min="1" step="1" required /></label>
          {type === 'internationaux' && <CountryPicker selected={selectedCountries} invalid={countryError} panel={countryPanel} onChange={codes => {
            setSelectedCountries(codes)
            setCountryError(false)
            setStatus('idle')
          }} />}
          <label className="full">Dimensions souhaitées<input name="dimensions" placeholder="Ex. 100 × 150 cm" maxLength={160} /></label>
          <label className="full">Description du besoin *<textarea name="description" rows={4} required maxLength={3000} placeholder="Précisez l’usage, les finitions et le délai souhaité." /></label>
          {company.quoteEndpoint && <label className="full">Image ou fichier de référence (10 Mo max.)<input name="reference" type="file" accept="image/*,.pdf" /></label>}
        </div>
        <button className="button red" type="submit">{status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'} <Send size={17} /></button>
      </fieldset>
      {status === 'ready' && <div className="form-feedback" role="status"><p><CheckCircle2 size={18} /> {whatsapp ? 'Votre demande est prête. Ouvrez WhatsApp pour l’envoyer.' : 'Votre demande est prête à télécharger. Aucun envoi n’a été effectué.'}</p><div className="actions">{whatsapp && <a className="button" href={whatsapp} target="_blank" rel="noreferrer">Ouvrir WhatsApp <ArrowUpRight size={17} /></a>}<button type="button" className="button outline-dark" onClick={download}>Télécharger le récapitulatif <Download size={17} /></button></div></div>}
      {status === 'sent' && <p className="form-feedback" role="status"><CheckCircle2 size={18} /> Votre demande a été envoyée.</p>}
      {status === 'file-too-large' && <p className="form-feedback error" role="alert">Le fichier dépasse 10 Mo. Sélectionnez un fichier plus léger.</p>}
      {status === 'error' && <p className="form-feedback error" role="alert">La demande n’a pas pu être envoyée. Réessayez dans quelques instants.</p>}
    </form>
  </div></section>
}
