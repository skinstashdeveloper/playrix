"use client"

import type React from "react"

import { useState } from "react"
import { BarChart3, Users, Zap, Shield, Check, Star, User, MessageCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCurrency } from "@/app/context/CurrencyContext"
import CurrencySelector from "@/components/CurrencySelector"
import { FaWhatsapp } from "react-icons/fa"

const metamangoTiers = [
  {
    id: "basic",
    name: "Basic Mango Plan",
    price: 50,
    period: "One-time",
    credits: "30 Mango",
    earning: "30 USDT",
    type: "Resellers & Installers",
    image: "/streaming-basic-plan.jpg",
    description: "Perfect for new resellers starting with Metamango platform",
    features: ["30 Mango Credits", "30 USDT Earning Potential", "Basic Dashboard Access", "Email Support"],
  },
  {
    id: "standard",
    name: "Standard Mango Plan",
    price: 150,
    period: "One-time",
    credits: "100 Mango",
    earning: "100 USDT",
    type: "Resellers & Installers",
    image: "/streaming-pro-plan-premium.jpg",
    description: "Ideal for growing reseller businesses on Metamango",
    features: [
      "100 Mango Credits",
      "100 USDT Earning Potential",
      "Advanced Dashboard",
      "Priority Email Support",
      "Marketing Materials",
    ],
  },
  {
    id: "pro",
    name: "Professional Dealer Plan",
    price: 900,
    period: "One-time",
    credits: "600 Mango",
    earning: "600 USDT",
    type: "Dealer Account",
    image: "/streaming-premium-entertainment.jpg",
    description: "For established dealers with high volume on Metamango",
    features: [
      "600 Mango Credits",
      "600 USDT Earning Potential",
      "Premium Dashboard",
      "Phone Support",
      "Custom Branding",
      "Dedicated Account Manager",
    ],
  },
  {
    id: "enterprise",
    name: "Super Dealer Plan",
    price: 7500,
    period: "One-time",
    credits: "5000 Mango",
    earning: "5000 USDT",
    type: "Super Dealer",
    image: "/premium-entertainment-streaming.jpg",
    description: "Maximum earnings for top-tier partners on Metamango",
    features: [
      "5000 Mango Credits",
      "5000 USDT Earning Potential",
      "Enterprise Dashboard",
      "24/7 Premium Support",
      "Full Custom Branding",
      "Dedicated Account Manager",
      "VIP Treatment",
    ],
  },
]

const staticDescription = `
  <p><strong>Forever Server Reseller | Metamango Panel – Business Platform</strong></p>
  
  <p>MANGO PAY Reseller Panel is a comprehensive business platform designed for entrepreneurs and enterprises looking to expand their service offerings through a robust reseller program. Earn competitive returns by managing your own network of customers and sub resellers.</p>
  
  <h2>Limited Offer - Mango Credit System:</h2>
  <ul>
    <li><strong>30 mango = 30 USDT</strong> (Resellers & Installers)</li>
    <li><strong>100 mango = 100 USDT</strong> (Resellers & Installers)</li>
    <li><strong>600 mango = 600 USDT</strong> (Dealer account)</li>
    <li><strong>5000 mango = 5000 USDT</strong> (Super dealer)</li>
  </ul>

  <p><strong>Important:</strong> Mango credits are valid and can be used indefinitely. Start building your reseller empire with MANGO MANAGE today!</p>
`

const initialReviews = [
  {
    id: 1,
    author: "Mohammad Ali",
    date: "December 18, 2024",
    rating: 5,
    text: "Excellent platform! The Metamango panel is very user-friendly and the earning potential is huge. I started as a reseller and now managing multiple sub-dealers. Highly recommended!",
  },
  {
    id: 2,
    author: "Aisha Khan",
    date: "December 14, 2024",
    rating: 5,
    text: "Best investment I made for my business. The dashboard is intuitive, support team is responsive, and the mango credit system is transparent and fair. Already earned back my investment!",
  },
  {
    id: 3,
    author: "Hassan Malik",
    date: "December 10, 2024",
    rating: 4,
    text: "Great platform with excellent features. The reseller panel helps me manage my customers efficiently. Would appreciate more customization options, but overall very satisfied.",
  },
]

export default function MetamangoPage() {
  const [selectedTierId, setSelectedTierId] = useState("standard")
  const [activeTab, setActiveTab] = useState("description")
  const [reviews, setReviews] = useState(initialReviews)
  const [newReview, setNewReview] = useState({ rating: 0, text: "", name: "", email: "" })
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const { currency, convertPrice } = useCurrency()
  const symbols: Record<string, string> = { USD: "$", PKR: "₨", INR: "₹" }

  const selectedTier = metamangoTiers.find((tier) => tier.id === selectedTierId) || metamangoTiers[0]

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReview.rating && newReview.text && newReview.name && newReview.email) {
      const review = {
        id: reviews.length + 1,
        author: newReview.name,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        rating: newReview.rating,
        text: newReview.text,
      }
      setReviews([review, ...reviews])
      setNewReview({ rating: 0, text: "", name: "", email: "" })
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="fixed right-4 top-1/3 z-50">
          <CurrencySelector />
        </div>

        <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <div className="flex justify-center mb-4">
                <div className="inline-block px-4 py-2 rounded-full bg-accent/20 border border-accent/50">
                  <span className="text-accent font-semibold text-sm">Forever Server Reseller</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">MANGO PAY Reseller Panel</h1>
              <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto">
                Build your own business empire with MANGO MANAGE. Earn competitive returns through our comprehensive
                reseller and dealer programs.
              </p>
            </div>

            <div className="mb-8 md:mb-14 flex flex-col items-center text-center">
              <label className="block text-sm font-semibold text-foreground mb-3">Select Your Plan:</label>
              <select
                value={selectedTierId}
                onChange={(e) => setSelectedTierId(e.target.value)}
                className="w-full md:w-96 px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer transition-all duration-200"
              >
                <option value="">Select Plan</option>
                <option value="basic">Basic Mango Plan (30)</option>
                <option value="standard">Standard Mango Plan (100)</option>
                <option value="pro">Professional Dealer Plan (600)</option>
                <option value="enterprise">Super Dealer Plan (5000)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="flex items-start justify-center">
                <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={selectedTier.image || "/placeholder.svg"}
                    alt={selectedTier.name}
                    className="w-full h-96 object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-start">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{selectedTier.name}</h2>
                <p className="text-foreground/70 text-base mb-6">{selectedTier.description}</p>

                <div className="mb-8 pb-8 border-b border-border/50">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-4xl font-bold text-foreground">
                      {symbols[currency]} {convertPrice(selectedTier.price)}
                    </span>
                    <span className="text-lg text-foreground/60">/{selectedTier.period}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-primary/5 border border-border/50 hover:bg-primary/10 transition-colors">
                    <p className="text-xs text-foreground/60 mb-2">Mango Credits</p>
                    <p className="text-2xl font-bold text-primary">{selectedTier.credits}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-border/50 hover:bg-primary/10 transition-colors">
                    <p className="text-xs text-foreground/60 mb-2">Earning</p>
                    <p className="text-2xl font-bold text-foreground">{selectedTier.earning}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-border/50 hover:bg-primary/10 transition-colors">
                    <p className="text-xs text-foreground/60 mb-2">Account Type</p>
                    <p className="text-sm font-bold text-foreground">{selectedTier.type}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-4">Included Benefits:</h3>
                  <ul className="space-y-3">
                    {selectedTier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-foreground/80">
                        <Shield size={16} className="text-primary flex-shrink-0 mt-1" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8 pb-8 border-b border-border/50">
                  <h3 className="font-semibold text-foreground mb-4">Payment Methods:</h3>
                  <div className="space-y-3">
                    {[
                      {
                        id: "whatsapp",
                        label: "WhatsApp Payment",
                        color: "from-green-400 to-green-600",
                        description: "Quick and easy order placement via WhatsApp",
                      },
                      {
                        id: "bank",
                        label: "Bank Transfer",
                        color: "from-blue-400 to-blue-600",
                        description: "Secure direct deposit to our account",
                      },
                      {
                        id: "crypto",
                        label: "Cryptocurrency",
                        color: "from-yellow-400 to-orange-500",
                        description: "We accept Bitcoin and USDT (TRC20)",
                      },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-start p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                          paymentMethod === method.id
                            ? `border-transparent bg-gradient-to-r ${method.color} text-white shadow-lg`
                            : "bg-background border border-border hover:border-primary/60"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 mt-1 transition-all ${
                            paymentMethod === method.id
                              ? "border-white bg-white"
                              : "border-foreground/40 bg-transparent"
                          }`}
                        >
                          {paymentMethod === method.id && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                        </span>

                        <div className="ml-3">
                          <p
                            className={`font-medium ${paymentMethod === method.id ? "text-white" : "text-foreground"}`}
                          >
                            {method.label}
                          </p>
                          <p
                            className={`text-xs ${
                              paymentMethod === method.id ? "text-white/80" : "text-foreground/60"
                            }`}
                          >
                            {method.description}
                          </p>
                        </div>

                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="hidden"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!selectedTierId) {
                      alert("⚠️ Please select a plan before proceeding.")
                      return
                    }
                    if (!paymentMethod) {
                      alert("⚠️ Please select a payment method before proceeding.")
                      return
                    }

                    window.open(
                      `https://wa.me/923033996000?text=I'm interested in the ${selectedTier.name} (${selectedTier.credits}) plan with ${selectedTier.type}, paying via ${paymentMethod}.`,
                      "_blank",
                    )
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all duration-200"
                >
                  <FaWhatsapp size={25} /> Order via WhatsApp
                </button>
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-border/50">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Metamango Panel</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: BarChart3, title: "Grow Business", description: "Scale your reseller network" },
                  { icon: Users, title: "Manage Network", description: "Control all your sub-dealers" },
                  { icon: Shield, title: "24/7 Support", description: "Dedicated business support" },
                  { icon: Zap, title: "Instant Setup", description: "Start earning immediately" },
                ].map((benefit) => (
                  <div
                    key={benefit.title}
                    className="text-center p-6 rounded-lg border border-border/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <benefit.icon size={24} className="text-primary" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                    <p className="text-sm text-foreground/60">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <section className="px-6 py-16 md:py-10 mt-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex border-b border-border mb-8">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`px-6 py-3 font-semibold ${
                      activeTab === "description"
                        ? "text-foreground border-b-2 border-primary"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`px-6 py-3 font-semibold ${
                      activeTab === "reviews"
                        ? "text-foreground border-b-2 border-primary"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    Reviews ({reviews.length})
                  </button>
                </div>

                {activeTab === "description" ? (
                  <>
                    <style jsx global>{`
                      .description-content h2 {
                        font-size: 1.5rem;
                        font-weight: 700;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                        color: var(--foreground);
                      }
                      .description-content ul {
                        list-style-type: disc;
                        padding-left: 1.5rem;
                        margin-bottom: 1.5rem;
                      }
                      .description-content li {
                        margin-bottom: 0.5rem;
                        color: rgba(var(--foreground-rgb), 0.7);
                      }
                      .description-content p {
                        font-size: 1rem;
                        line-height: 1.75;
                        margin-bottom: 1rem;
                        color: rgba(var(--foreground-rgb), 0.7);
                      }
                      .description-content strong {
                        font-weight: 600;
                        color: var(--foreground);
                      }
                    `}</style>
                    <div className="description-content mb-8" dangerouslySetInnerHTML={{ __html: staticDescription }} />
                  </>
                ) : (
                  <>
                    <div className="space-y-6 mb-10">
                      {reviews.map((r) => (
                        <div key={r.id} className="border border-border p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <User size={20} className="text-primary" />
                            <strong>{r.author}</strong>
                            <span className="ml-auto text-sm text-foreground/60">{r.date}</span>
                          </div>
                          <div className="flex gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < r.rating ? "fill-accent text-accent" : "text-foreground/20"}
                              />
                            ))}
                          </div>
                          <p className="text-foreground/70">{r.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Add a Review</h3>
                      {showSuccessMessage && (
                        <div className="p-3 bg-accent/20 border border-accent text-accent text-sm rounded-md">
                          ✅ Thank you! Your review has been added.
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">
                          Your rating <span className="text-accent">*</span>
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReview({ ...newReview, rating: star })}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                size={28}
                                className={
                                  star <= newReview.rating
                                    ? "fill-accent text-accent cursor-pointer"
                                    : "text-foreground/20 cursor-pointer hover:text-foreground/40"
                                }
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <textarea
                        rows={4}
                        value={newReview.text}
                        onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                        className="w-full p-3 border border-border rounded-md bg-card"
                        placeholder="Share your experience..."
                        required
                      />
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your name"
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          className="p-3 border border-border rounded-md bg-card"
                          required
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={newReview.email}
                          onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                          className="p-3 border border-border rounded-md bg-card"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddReview}
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-md font-semibold hover:shadow-lg transition-all"
                      >
                        Submit Review
                      </button>
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}