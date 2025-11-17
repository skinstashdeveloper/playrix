"use client"
import { useCurrency } from "@/app/context/CurrencyContext"

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()
  const currencies = ["USD", "PKR", "INR"] as const

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-50">
      {currencies.map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`px-3.5 py-1.5 text-sm rounded-full font-medium border transition-all duration-200
            ${
              currency === c
                ? "bg-primary text-white border-primary shadow-md"
                : "border-primary/70 bg-gradient-to-br from-primary/5 to-secondary/5 text-foreground/80 hover:bg-primary/10"
            }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
