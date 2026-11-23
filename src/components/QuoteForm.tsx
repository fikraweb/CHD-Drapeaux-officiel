import { useEffect, useState, type FormEvent } from 'react'
import { ArrowUpRight, CheckCircle2, Download, Send } from 'lucide-react'
import { company, products, whatsappUrl } from '../config'
import { Eyebrow } from './ui'

const fields = [
  { name: 'name', label: 'Nom complet', autoComplete: 'name', required: true },
  { name: 'organization', label: 'Administration ou entreprise', autoComplete: 'organization', required: true },
  { name: 'phone', label: 'Téléphone', type: 'tel', autoComplete: 'tel', required: true },
  { name: 'email', label: 'Adresse e-mail', type: 'email', autoComplete: 'email', required: true },
]

export default function QuoteForm() {
  const [type, setType] = useState('')
  const [summary, setSummary] = useState('')
  const [status, setStatus] = useState<'idle' | 'ready' | 'sending' | 'sent' | 'error' | 'file-too-large'>('idle')

  useEffect(() => {
    function selectProduct() {
      const id = window.location.hash.split('/')[1]
      if (window.location.hash.startsWith('#devis/') && products.some(product => product.id === id)) {
        setType(id)
        document.getElementById('devis')?.scrollIntoView()
      }
    }
    selectProduct()
    window.addEventListener('hashchange', selectProduct)
    return () => window.removeEventListener('hashchange', selectProduct)
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const file = data.get('reference')
    if (file instanceof File && file.size > 10 * 1024 * 1024) {
      setStatus('file-too-large')
      return
    }
    const lines = [
      'Bonjour, je souhaite recevoir un devis pour mon projet.',
      ...fields.map(field => `${field.label} : ${data.get(field.name)}`),
      `Type de drapeau : ${products.find(product => product.id === type)?.title || 'À déterminer'}`,
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
  return <section id="devis" className="section quote"><div className="wrap quote-grid">
    <div className="quote-intro"><Eyebrow>DEMANDE DE DEVIS</Eyebrow><h2>Votre projet, notre savoir-faire</h2><p>Vous recherchez des drapeaux adaptés à votre institution, votre entreprise ou votre événement ? Contactez-nous pour recevoir une proposition adaptée à vos besoins.</p></div>
    <form onSubmit={submit} className="quote-form" onChange={() => { if (status !== 'sending') setStatus('idle') }}>
      <fieldset disabled={status === 'sending'}>
        <legend>Décrivez votre projet</legend>
        <p className="form-note">Les champs marqués d’un astérisque sont obligatoires.</p>
        <div className="form-fields">
          {fields.map(({ label, ...props }) => <label key={props.name}>{label} *<input {...props} maxLength={160} /></label>)}
          <label>Type de drapeau *<select name="type" value={type} onChange={event => setType(event.target.value)} required><option value="">Choisir une catégorie</option>{products.map(product => <option key={product.id} value={product.id}>{product.title}</option>)}<option value="autre">À déterminer</option></select></label>
          <label>Quantité souhaitée *<input name="quantity" type="number" min="1" step="1" required /></label>
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
