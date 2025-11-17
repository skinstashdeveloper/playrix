"use client"

import Link from "next/link"
import { Check, ArrowRight, Shield, Zap, Users } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCurrency } from "@/app/context/CurrencyContext"
import CurrencySelector from "@/components/CurrencySelector"

const plans = [
  {
    id: "basic",
    name: "FIBER STREAM Basic",
    price: 299,
    period: "Monthly",
    channels: "5000+",
    image: "/streaming-basic-plan.jpg",
    description: "Perfect for casual viewers",
  },
  {
    id: "standard",
    name: "FIBER STREAM Standard",
    price: 349,
    period: "Monthly",
    channels: "6000+",
    image: "/streaming-basic-plan.jpg",
    description: "Best for small families",
  },
  {
    id: "pro",
    name: "FIBER STREAM Pro",
    price: 499,
    period: "Monthly",
    channels: "8000+",
    image: "/streaming-pro-plan-premium.jpg",
    description: "Recommended for families",
    featured: true,
  },
  {
    id: "premium",
    name: "FIBER STREAM Premium",
    price: 899,
    period: "Monthly",
    channels: "12000+",
    image: "/streaming-premium-entertainment.jpg",
    description: "Ultimate entertainment package",
  },
]

export default function FiveGlivePage() {
  const { currency, convertPrice } = useCurrency()
  const symbols: Record<string, string> = { USD: "$", PKR: "₨", INR: "₹" }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">

        {/* Floating Currency Buttons */}
        <div className="fixed right-4 top-1/3 z-50">
          <CurrencySelector />
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-accent/20 border border-accent/50">
              <span className="text-accent font-semibold text-sm">Premium IPTV Service</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">FIBER STREAM Plans</h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Ultra-fast fiber streaming with crystal-clear quality. Choose your perfect plan today.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <Link key={plan.id} href={`/iptv/fiberstream/${plan.id}`}>
                <div
                  className={`group relative rounded-2xl border transition-all duration-300 h-full cursor-pointer ${
                    plan.featured
                      ? "border-2 border-primary bg-gradient-to-br from-primary/10 to-secondary/5 shadow-primary/20 md:scale-[1.02]"
                      : "border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-secondary px-4 py-1">
                        <Zap size={16} className="text-accent-foreground" />
                        <span className="text-xs font-bold text-accent-foreground">Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Image */}
                    <div className="mb-6 rounded-xl h-40 bg-muted overflow-hidden">
                      <img
                        src={plan.image || "/placeholder.svg"}
                        alt={plan.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Plan Name & Price */}
                    <h3 className="text-xl font-bold mb-2 text-foreground">{plan.name}</h3>
                    <p className="text-sm text-foreground/60 mb-4">{plan.description}</p>

                    <div className="mb-6">
                      <span className="text-3xl font-bold text-foreground">
                        {symbols[currency]} {convertPrice(plan.price)}
                      </span>
                      <span className="ml-1 text-sm text-foreground/60">/{plan.period}</span>
                    </div>

                    {/* Channels */}
                    <div className="mb-6 p-3 rounded-lg bg-muted/50 border border-border/50">
                      <p className="text-sm text-foreground/70">
                        <span className="font-semibold text-foreground">{plan.channels}</span> Live Channels
                      </p>
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full rounded-lg py-2.5 font-semibold transition-all duration-200 mb-6 flex items-center justify-center gap-2 group/btn ${
                        plan.featured
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                          : "border border-border text-foreground hover:bg-muted/50"
                      }`}
                    >
                      View Details
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                   
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 pt-20 mt-20 border-t border-border/50 max-w-7xl mx-auto">
            {[
              { icon: Shield, title: "Secure & Safe", description: "Military-grade encryption for all your data" },
              { icon: Zap, title: "5G Fast", description: "Ultra-fast 5G streaming, zero buffering" },
              { icon: Users, title: "Multi-Device", description: "Stream on multiple devices simultaneously" },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-block p-3 rounded-lg bg-primary/10 mb-4">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-foreground/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
