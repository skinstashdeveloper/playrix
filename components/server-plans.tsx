"use client"
import { Check } from "lucide-react"
import { useCurrency } from "@/app/context/CurrencyContext"
import CurrencySelector from "@/components/CurrencySelector"

export default function ServerPlans() {
  const { currency, convertPrice } = useCurrency()

  const plans = [
    { name: "Forever Server", price: 42, duration: "Lifetime", features: ["4K Support", "10+ Devices", "VOD Library"], image: "/3d.png", highlighted: false },
    { name: "Apollo IPTV", price: 18, duration: "6 Months", features: ["4K Support", "5+ Devices"], image: "/3d.png", highlighted: true },
    { name: "Funcam Server", price: 32, duration: "1 Year", features: ["4K Support", "8+ Devices"], image: "/3d.png", highlighted: false },
    { name: "Gihare Server", price: 40, duration: "Lifetime", features: ["4K Support", "12+ Devices"], image: "/3d.png", highlighted: false },
  ]

  return (
    <section className="px-6 py-20 md:py-15">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-4xl font-bold text-foreground mb-2">Premium Server Plans</h2>
        <p className="text-lg text-foreground/60 mb-6">Choose your perfect plan</p>

        <CurrencySelector /> 

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? "border-2 border-primary shadow-2xl shadow-primary/20 md:scale-105"
                  : "border border-border hover:border-primary/30 hover:shadow-lg"
              }`}
            >
              <img src={plan.image} alt={plan.name} className="h-32 w-full object-cover" />

              <div className="p-6 text-left">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-2xl font-semibold mb-3">
                  {currency} {convertPrice(plan.price).toLocaleString()}
                  <span className="ml-2 text-sm text-foreground/60">{plan.duration}</span>
                </p>

                <ul className="mb-6 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check size={18} className="text-accent" /> {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full rounded-lg py-2 font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "border border-border text-foreground hover:bg-muted/50"
                  }`}
                >
                  Get Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
