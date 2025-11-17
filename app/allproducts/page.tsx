"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCurrency } from "@/app/context/CurrencyContext"
import CurrencySelector from "@/components/CurrencySelector"

const allIPTVProviders = [
  {
    id: "starshare",
    name: "STAR SHARE",
    price: 399,
    channels: "5000+",
    image: "/streaming-basic-plan.jpg",
    featured: true,
  },
  { id: "b1g", name: "B1G", price: 349, channels: "6000+", image: "/streaming-pro-plan-premium.jpg" },
  { id: "5glive", name: "5GLIVE", price: 349, channels: "6000+", image: "/streaming-basic-plan.jpg" },
  { id: "opplex", name: "OPPLEX", price: 499, channels: "8000+", image: "/streaming-premium-entertainment.jpg" },
  { id: "fiberstream", name: "FIBER STREAM", price: 449, channels: "7000+", image: "/streaming-basic-plan.jpg" },
  { id: "trex", name: "TREX", price: 399, channels: "5500+", image: "/streaming-pro-plan-premium.jpg" },
  { id: "king365", name: "KING 365", price: 549, channels: "9000+", image: "/streaming-premium-entertainment.jpg" },
  { id: "slytv", name: "SLYTV", price: 299, channels: "4500+", image: "/streaming-basic-plan.jpg" },
  { id: "atlas", name: "ATLAS", price: 599, channels: "10000+", image: "/streaming-pro-plan-premium.jpg" },
]

const allServers = [
  {
    id: "apollo-forever",
    name: "Apollo + Forever Server",
    price: 199,
    image: "/streaming-basic-plan.jpg",
    featured: true,
  },
  { id: "vip-recharge", name: "Vip Recharge", price: 149, image: "/streaming-pro-plan-premium.jpg" },
  { id: "apollo", name: "Apollo", price: 179, image: "/streaming-premium-entertainment.jpg" },
  { id: "forever-iks", name: "Forever IKS", price: 169, image: "/streaming-basic-plan.jpg" },
  { id: "funcam", name: "Funcam Server", price: 189, image: "/streaming-pro-plan-premium.jpg" },
  { id: "gshare", name: "GShare Server", price: 159, image: "/streaming-premium-entertainment.jpg" },
  { id: "nashare", name: "Nashare Codes", price: 139, image: "/streaming-basic-plan.jpg" },
  { id: "iks-pro", name: "IKS Pro", price: 199, image: "/streaming-pro-plan-premium.jpg" },
  { id: "cline-master", name: "CLINE Master", price: 249, image: "/streaming-premium-entertainment.jpg" },
]

export default function AllProductsPage() {
  const { currency, convertPrice } = useCurrency()
  const currencySymbols: Record<string, string> = { USD: "$", PKR: "₨", INR: "₹" }

  const [iptvSort, setIptvSort] = useState<"default" | "low-high" | "high-low">("default")
  const [serverSort, setServerSort] = useState<"default" | "low-high" | "high-low">("default")
  const [iptvDisplayCount, setIptvDisplayCount] = useState(6)
  const [serverDisplayCount, setServerDisplayCount] = useState(6)

  const sortedIPTV = () => {
    const sorted = [...allIPTVProviders]
    if (iptvSort === "low-high") sorted.sort((a, b) => a.price - b.price)
    if (iptvSort === "high-low") sorted.sort((a, b) => b.price - a.price)
    return sorted
  }

  const sortedServers = () => {
    const sorted = [...allServers]
    if (serverSort === "low-high") sorted.sort((a, b) => a.price - b.price)
    if (serverSort === "high-low") sorted.sort((a, b) => b.price - a.price)
    return sorted
  }

  const filteredIPTV = sortedIPTV()
  const filteredServers = sortedServers()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Fixed Currency Selector */}
        <div className="fixed right-4 top-1/3 z-50">
          <CurrencySelector />
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-15 md:py-15 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-7xl mx-auto text-center mb-3 px-4">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-accent/20 border border-accent/50">
              <span className="text-accent font-semibold text-sm">All Products Catalog</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Complete Product Catalog</h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Explore our complete range of IPTV providers and satellite servers. Choose what works best for you.
            </p>
          </div>
        </section>

        {/* IPTV Section */}
        <section className="py-15 px-4 md:px-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold">IPTV Providers</h2>
              <select
                value={iptvSort}
                onChange={(e) => {
                  setIptvSort(e.target.value as "default" | "low-high" | "high-low")
                  setIptvDisplayCount(6)
                }}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground font-semibold transition-all duration-200 cursor-pointer hover:border-primary/50"
              >
                <option value="default">Sort by Price</option>
                <option value="low-high">Low to High</option>
                <option value="high-low">High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredIPTV.slice(0, iptvDisplayCount).map((provider) => (
                <Link key={provider.id} href={`/${provider.id}`}>
                  <div
                    className={`group relative rounded-2xl border transition-all duration-300 h-full cursor-pointer ${
                      provider.featured
                        ? "border-2 border-primary bg-gradient-to-br from-primary/10 to-secondary/5 shadow-primary/20"
                        : "border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                    }`}
                  >
                    {provider.featured && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-secondary px-4 py-1">
                          <Zap size={16} className="text-accent-foreground" />
                          <span className="text-xs font-bold text-accent-foreground">Featured</span>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="mb-6 rounded-xl h-40 bg-muted overflow-hidden">
                        <img
                          src={provider.image || "/placeholder.svg"}
                          alt={provider.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <h3 className="text-xl font-bold mb-2">{provider.name}</h3>
                      <div className="mb-4">
                        <span className="text-2xl font-bold">
                          {currencySymbols[currency]}
                          {convertPrice(provider.price)}
                        </span>
                        <span className="text-sm text-foreground/60 ml-1">/Month</span>
                      </div>

                      <div className="mb-6 p-3 rounded-lg bg-muted/50 border border-border/50">
                        <p className="text-sm text-foreground/70">{provider.channels} Channels</p>
                      </div>

                      <button
                        className={`w-full rounded-lg py-2.5 font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                          provider.featured
                            ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                            : "border border-border text-foreground hover:bg-muted/50"
                        }`}
                      >
                        View Details
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {iptvDisplayCount < filteredIPTV.length && (
              <div className="text-center">
                <button
                  onClick={() => setIptvDisplayCount((prev) => prev + 3)}
                  className="inline-block px-8 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  See More
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Servers Section */}
        <section className="py-16 px-4 md:px-0 border-t border-border/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold">Satellite Servers</h2>
              <select
                value={serverSort}
                onChange={(e) => {
                  setServerSort(e.target.value as "default" | "low-high" | "high-low")
                  setServerDisplayCount(6)
                }}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground font-semibold transition-all duration-200 cursor-pointer hover:border-primary/50 appearance-none pr-10 bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 16 16%22%3E%3Cpath fill=%22currentColor%22 d=%22M8 11L3 6h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-right-2 bg-center"
              >
                <option value="default">Sort by Price</option>
                <option value="low-high">Low to High</option>
                <option value="high-low">High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredServers.slice(0, serverDisplayCount).map((server) => (
                <Link key={server.id} href={`/servers/${server.id}`}>
                  <div
                    className={`group relative rounded-2xl border transition-all duration-300 h-full cursor-pointer ${
                      server.featured
                        ? "border-2 border-primary bg-gradient-to-br from-primary/10 to-secondary/5 shadow-primary/20"
                        : "border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                    }`}
                  >
                    {server.featured && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-secondary px-4 py-1">
                          <Zap size={16} className="text-accent-foreground" />
                          <span className="text-xs font-bold text-accent-foreground">Featured</span>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="mb-6 rounded-xl h-40 bg-muted overflow-hidden">
                        <img
                          src={server.image || "/placeholder.svg"}
                          alt={server.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <h3 className="text-xl font-bold mb-2">{server.name}</h3>
                      <div className="mb-4">
                        <span className="text-2xl font-bold">
                          {currencySymbols[currency]}
                          {convertPrice(server.price)}
                        </span>
                        <span className="text-sm text-foreground/60 ml-1">/Month</span>
                      </div>

                      <div className="mb-6 p-3 rounded-lg bg-muted/50 border border-border/50">
                        <p className="text-sm text-foreground/70">Premium Server</p>
                      </div>

                      <button
                        className={`w-full rounded-lg py-2.5 font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                          server.featured
                            ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                            : "border border-border text-foreground hover:bg-muted/50"
                        }`}
                      >
                        View Details
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {serverDisplayCount < filteredServers.length && (
              <div className="text-center">
                <button
                  onClick={() => setServerDisplayCount((prev) => prev + 3)}
                  className="inline-block px-8 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  See More
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
