import { useState, type RefObject } from 'react'
import { ChevronDown, Search, X } from 'lucide-react'
import { countries } from '../countries'

function normalize(text: string) {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()
}

export default function CountryPicker({ selected, onChange, invalid, panel }: {
  selected: string[]
  onChange: (codes: string[]) => void
  invalid: boolean
  panel: RefObject<HTMLDetailsElement | null>
}) {
  const [search, setSearch] = useState('')
  const query = normalize(search)
  const matches = countries.filter(country => normalize(country.name).includes(query) || country.code.toLowerCase() === query)
  const selectedCountries = countries.filter(country => selected.includes(country.code))

  function toggle(code: string) {
    onChange(selected.includes(code) ? selected.filter(value => value !== code) : [...selected, code])
  }

  function confirm() {
    if (!panel.current) return
    panel.current.open = false
    panel.current.querySelector('summary')?.focus()
    setSearch('')
  }

  return <div className="country-picker full">
    <p className="country-label" id="country-label">Pays souhaités *</p>
    <details ref={panel}>
      <summary aria-describedby={invalid ? 'country-error' : undefined}>
        {selected.length ? `${selected.length} ${selected.length === 1 ? 'pays sélectionné' : 'pays sélectionnés'}` : 'Choisir un ou plusieurs pays'}
        <ChevronDown size={16} aria-hidden="true" />
      </summary>
      <div className="country-panel">
        <label className="country-search"><span>Rechercher un pays</span><span><Search size={16} aria-hidden="true" /><input type="search" value={search} onChange={event => setSearch(event.target.value)} onKeyDown={event => {
          if (event.key === 'Enter') event.preventDefault()
        }} placeholder="Ex. Maroc, France, Japon" /></span></label>
        <div className="country-options" role="group" aria-labelledby="country-label">
          {matches.map(({ code, name }) => <label key={code}><input type="checkbox" checked={selected.includes(code)} onChange={() => toggle(code)} />{name}</label>)}
          {!matches.length && <p role="status">Aucun pays trouvé.</p>}
        </div>
        <button type="button" className="button" onClick={confirm} disabled={!selected.length}>Valider les pays</button>
      </div>
    </details>
    {selectedCountries.length > 0 && <ul className="country-chips" aria-label="Pays sélectionnés">{selectedCountries.map(({ code, name }) =>
      <li key={code}><button type="button" onClick={() => toggle(code)} aria-label={`Retirer ${name}`}>{name}<X size={14} aria-hidden="true" /></button></li>,
    )}</ul>}
    {invalid && <p id="country-error" className="country-error" role="alert">Sélectionnez au moins un pays pour continuer.</p>}
  </div>
}
