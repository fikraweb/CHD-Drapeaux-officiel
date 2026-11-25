export default function FlagSelect({ options, value, onChange }: { options: { code: string; name: string }[]; value: string; onChange: (value: string) => void }) {
  return <label className="catalog-option">Choisir un drapeau
    <select value={value} onChange={event => onChange(event.target.value)} required>
      <option value="">Sélectionner un pays</option>
      {options.map(item => <option key={item.code} value={item.code}>{item.name}</option>)}
    </select>
  </label>
}
