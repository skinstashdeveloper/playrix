"use client"
import React, { createContext, useContext, useState, useEffect } from "react"

type Currency = "USD" | "PKR" | "INR"

const CurrencyContext = createContext<any>(null)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD")
  const [rates, setRates] = useState({ USD: 1, PKR: 280, INR: 83 })

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
        const data = await res.json()
        setRates({
          USD: 1,
          PKR: data.rates.PKR,
          INR: data.rates.INR,
        })
      } catch (err) {
        console.error("Failed to fetch live exchange rates:", err)
      }
    }
    fetchRates()
  }, [])

  const convertPrice = (priceUSD: number) =>
  (priceUSD * rates[currency]).toLocaleString(undefined, { minimumFractionDigits: 0 })


  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) throw new Error("useCurrency must be used within a CurrencyProvider")
  return context
}
