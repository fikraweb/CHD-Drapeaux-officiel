import { useEffect, useState } from 'react'
import { catalog, standingFlagId, standingFlagOptions } from './catalog'

export type CartLine = { key: string; quantity: number }
export const maxQuantity = 999
const storageKey = 'chd-cart-v1'

export function cartProduct(key: string) {
  const [id, code, extra] = key.split(':')
  const product = catalog.find(item => item.id === id)
  if (!product || extra !== undefined) return
  const variant = standingFlagOptions.find(option => option.code === code)
  if (id === standingFlagId ? !variant : code !== undefined) return
  return { product, variant }
}

function loadCart(): CartLine[] {
  try {
    const entries: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]')
    if (!Array.isArray(entries)) return []
    const seen = new Set<string>()
    return entries.filter((line): line is CartLine => {
      if (typeof line?.key !== 'string' || !cartProduct(line.key) || seen.has(line.key)
          || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > maxQuantity) return false
      seen.add(line.key)
      return true
    })
  } catch {
    return []
  }
}

export function useCart() {
  const [lines, setLines] = useState(loadCart)
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(lines)) } catch { /* The current session still works. */ }
  }, [lines])

  function change(key: string, amount: number) {
    setLines(current => {
      const old = current.find(line => line.key === key)
      if (!old) return amount > 0 ? [...current, { key, quantity: amount }] : current
      const quantity = Math.min(maxQuantity, old.quantity + amount)
      return quantity > 0
        ? current.map(line => line.key === key ? { key, quantity } : line)
        : current.filter(line => line.key !== key)
    })
  }

  function remove(key: string) {
    setLines(current => current.filter(line => line.key !== key))
  }

  return { lines, change, remove, count: lines.reduce((total, line) => total + line.quantity, 0) }
}
