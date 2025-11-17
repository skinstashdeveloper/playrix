"use client"
import { Check, Star } from "lucide-react"
import Image from "next/image"
import { useCurrency } from "@/app/context/CurrencyContext"
import CurrencySelector from "@/components/CurrencySelector"

export default function SubscriptionPlans() {
  const { currency, convertPrice } = useCurrency()

  const subs = [
    { name: "Optus IPTV", price: 4, period: "Monthly", channels: "5000+", featured: false, image: "/3d.png" },
    { name: "Starplus IPTV", price: 5, period: "Monthly", channels: "8000+", featured: true, image: "/3d.png" },
    { name: "By My Store", price: 9, period: "Quarterly", channels: "12000+", featured: false, image: "/3d.png" },
    { name: "Optus IPTV", price: 4, period: "Monthly", channels: "5000+", featured: false, image: "/3d.png" },
    { name: "By My Store", price: 9, period: "Quarterly", channels: "12000+", featured: false, image: "/3d.png" },
  ]

  return (
    <section className="bg-muted/30 px-6 py-20 md:py-15">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-4xl font-bold mb-2">IPTV Subscription Plans</h2>
        <p className="text-lg text-foreground/60 mb-6">Flexible monthly plans tailored to your needs</p>

        <CurrencySelector /> {/* 👈 Shared currency switch */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subs.map((sub, index) => (
          <div
            key={`${sub.name}-${index}`}  // ✅ ensures unique key
            className={`relative rounded-2xl border transition-all ${
              sub.featured
                ? "border-2 border-primary bg-gradient-to-br from-primary/10 to-secondary/5 shadow-xl"
                : "border-border bg-card hover:border-primary/50 hover:shadow-lg"
            }`}
          >

          {sub.featured && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
              <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-accent to-secondary px-3 py-1 shadow-md">
                <Star size={16} className="text-accent-foreground" />
                <span className="text-xs font-bold text-accent-foreground">Recommended</span>
              </div>
            </div>
          )}


              <div className="relative h-40 w-full rounded-t-2xl overflow-hidden">
                <Image src={sub.image} alt={sub.name} fill className="object-cover" />
              </div>

              <div className="p-6 text-left">
                <h3 className="text-2xl font-bold mb-1">{sub.name}</h3>
                <p className="text-sm text-foreground/60 mb-4">{sub.channels} Channels</p>

                <p className="text-3xl font-bold mb-4">
                  {currency} {convertPrice(sub.price).toLocaleString()}
                  <span className="ml-2 text-sm text-foreground/60">/{sub.period}</span>
                </p>

                <button
                  className={`w-full rounded-lg py-3 font-semibold transition-all ${
                    sub.featured
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "border border-border text-foreground hover:bg-muted/50"
                  }`}
                >
                  Buy Now
                </button>

                <ul className="space-y-2 mt-4">
                  {["Premium Quality", "Multi Device", "VOD Library", "Live EPG"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check size={16} className="text-accent" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
