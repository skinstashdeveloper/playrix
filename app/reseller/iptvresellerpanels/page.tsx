"use client"

import type React from "react"

import { useState } from "react"
import { BarChart3, Users, Zap, Shield, Check, Star, User } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCurrency } from "@/app/context/CurrencyContext"
import CurrencySelector from "@/components/CurrencySelector"
import { FaWhatsapp } from "react-icons/fa"

const resellerTiers = [
  {
    id: "basic",
    name: "Basic Reseller",
    price: 18000,
    period: "Yearly",
    commission: "20%",
    customers: "Up to 50",
    dashboard: "Basic",
    image: "/streaming-basic-plan.jpg",
    description: "Perfect for new resellers starting their business",
    features: ["Basic Dashboard Access", "20% Commission Rate", "Email Support", "Monthly Payouts"],
    includes: ["Dashboard Access", "Email Support", "Basic Analytics", "Monthly Payouts", "Standard API"],
    notIncludes: ["Phone Support", "Custom Branding", "Dedicated Account Manager"],
  },
  {
    id: "standard",
    name: "Standard Reseller",
    price: 25000,
    period: "Yearly",
    commission: "30%",
    customers: "Up to 200",
    dashboard: "Advanced",
    image: "/streaming-pro-plan-premium.jpg",
    description: "Ideal for growing reseller businesses",
    features: [
      "Advanced Dashboard Access",
      "30% Commission Rate",
      "Priority Email Support",
      "Bi-weekly Payouts",
      "Marketing Materials",
    ],
    includes: [
      "Advanced Dashboard",
      "Priority Support",
      "Advanced Analytics",
      "Bi-weekly Payouts",
      "Full API",
      "Marketing Materials",
    ],
    notIncludes: ["Phone Support", "Custom Branding", "Dedicated Account Manager"],
  },
  {
    id: "pro",
    name: "Professional Reseller",
    price: 32400,
    period: "Yearly",
    commission: "40%",
    customers: "Up to 500",
    dashboard: "Premium",
    image: "/streaming-premium-entertainment.jpg",
    description: "For established resellers with high volume",
    features: [
      "Premium Dashboard Access",
      "40% Commission Rate",
      "Priority Phone Support",
      "Weekly Payouts",
      "Custom Branding",
      "Dedicated Account Manager",
    ],
    includes: [
      "Premium Dashboard",
      "24/7 Phone Support",
      "Premium Analytics",
      "Weekly Payouts",
      "Full API",
      "Custom Branding",
      "Dedicated Manager",
    ],
    notIncludes: [],
  },
  {
    id: "enterprise",
    name: "Enterprise Reseller",
    price: 38400,
    period: "Yearly",
    commission: "50%",
    customers: "Unlimited",
    dashboard: "Enterprise",
    image: "/premium-entertainment-streaming.jpg",
    description: "Maximum earnings for top-tier partners",
    features: [
      "Enterprise Dashboard Access",
      "50% Commission Rate",
      "24/7 Phone Support",
      "Instant Payouts",
      "Full Custom Branding",
      "Dedicated Account Manager",
      "API Access",
    ],
    includes: [
      "Enterprise Dashboard",
      "24/7 Premium Support",
      "Enterprise Analytics",
      "Instant Payouts",
      "Advanced API",
      "Full Branding",
      "VIP Manager",
      "Priority Feature Access",
    ],
    notIncludes: [],
  },
]

// Static description content (not tied to any tier)
const staticDescription = `
  <p>Our IPTV Reseller Panel is designed for entrepreneurs and businesses looking to enter the IPTV reselling market. Choose from multiple tier options based on your business needs.</p>
  
  <h2>For OpplexTv = 100 Credits (Minimum Recharge)</h2>
  <ul>
    <li>1 credit = 1 Month</li>
    <li>3 credits = 3 Months</li>
    <li>5 credits = 6 Months</li>
    <li>10 credits = 12 Months</li>
    <li>Minimum 4 Credits Required to make Trial</li>
  </ul>
  
  <h2>For StarShare = 100 Credits (Minimum Recharge)</h2>
  <ul>
    <li>1 credit = 1 Month</li>
    <li>3 credits = 3 Months</li>
    <li>5 credits = 6 Months</li>
    <li>10 credits = 12 Months</li>
    <li>Minimum 15 Credits Required to make Trial</li>
  </ul>
  
  <h2>For InfinityTv IPTV = 100 Credits (Minimum Recharge)</h2>
  <ul>
    <li>1 credit = 1 Month</li>
    <li>3 credits = 3 Months</li>
    <li>6 credits = 6 Months</li>
    <li>12 credits = 12 Months</li>
    <li>Minimum 5 Credits Required to make Trial</li>
  </ul>
  
  <h2>For B1G Player IPTV = 100 Credits (Minimum Recharge)</h2>
  <ul>
    <li>1 credit = 1 Month</li>
    <li>3 credits = 3 Months</li>
    <li>6 credits = 6 Months</li>
    <li>12 credits = 12 Months</li>
    <li>Minimum 30 Credits Required to make Trial</li>
  </ul>
  
  <h2>For 5GLIVE = 2000 Credits (Minimum Recharge)</h2>
  <ul>
    <li>10 credit = 1 Month</li>
    <li>30 credits = 3 Months</li>
    <li>60 credits = 6 Months</li>
    <li>120 credits = 12 Months</li>
    <li>Minimum 60 Credits Required to make Trial</li>
  </ul>
  
  <p><strong>Your Credits are always safe but can expire in 4 Months. You can create unlimited trials from any of the above IPTV Services.</strong></p>
`

const initialReviews = [
  {
    id: 1,
    author: "Ahmed Khan",
    date: "December 15, 2024",
    rating: 5,
    text: "Excellent reseller panel! The dashboard is intuitive and the support team is very helpful. I've been able to grow my business significantly with the competitive commission rates.",
  },
  {
    id: 2,
    author: "Fatima Hassan",
    date: "December 10, 2024",
    rating: 4,
    text: "Great experience so far. The payouts are reliable and the platform is stable. Would like to see more advanced analytics options in the future.",
  },
  {
    id: 3,
    author: "Hassan Ahmed",
    date: "December 5, 2024",
    rating: 5,
    text: "Best reseller program I've used. Fast payouts, excellent support, and the commission structure is very competitive. Highly recommended!",
  },
]

export default function ResellerPage() {
  const [selectedTierId, setSelectedTierId] = useState("pro")
  const [activeTab, setActiveTab] = useState("description")
  const [reviews, setReviews] = useState(initialReviews)
  const [newReview, setNewReview] = useState({ rating: 0, text: "", name: "", email: "" })
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const { currency, convertPrice } = useCurrency()
  const symbols: Record<string, string> = { USD: "$", PKR: "₨", INR: "₹" }

  const selectedTier = resellerTiers.find((tier) => tier.id === selectedTierId) || resellerTiers[0]

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
                  <span className="text-accent font-semibold text-sm">Earn With Playrix</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">IPTV Reseller Panel</h1>
              <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto">
                Start your own IPTV reselling business with our comprehensive reseller panel. Earn up to 50% commission
                with full dashboard control and dedicated support.
              </p>
            </div>

            <div className="mb-8 md:mb-14 flex flex-col items-center text-center">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Select Reseller Tier:
              </label>
              <select
                value={selectedTierId}
                onChange={(e) => setSelectedTierId(e.target.value)}
                className="w-full md:w-96 px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer transition-all duration-200"
              >
                <option value="">Select Reseller Tier</option>
                <option value="basic">Basic Reseller</option>
                <option value="standard">Standard Reseller</option>
                <option value="pro">Professional Reseller</option>
                <option value="enterprise">Enterprise Reseller</option>
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
                    <p className="text-xs text-foreground/60 mb-2">Commission</p>
                    <p className="text-2xl font-bold text-primary">{selectedTier.commission}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-border/50 hover:bg-primary/10 transition-colors">
                    <p className="text-xs text-foreground/60 mb-2">Customers</p>
                    <p className="text-2xl font-bold text-foreground">{selectedTier.customers}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-border/50 hover:bg-primary/10 transition-colors">
                    <p className="text-xs text-foreground/60 mb-2">Dashboard</p>
                    <p className="text-2xl font-bold text-foreground">{selectedTier.dashboard}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-4">Included Features:</h3>
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
                          {paymentMethod === method.id && (
                            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                          )}
                        </span>

                        <div className="ml-3">
                          <p
                            className={`font-medium ${
                              paymentMethod === method.id ? "text-white" : "text-foreground"
                            }`}
                          >
                            {method.label}
                          </p>
                          <p
                            className={`text-xs ${
                              paymentMethod === method.id
                                ? "text-white/80"
                                : "text-foreground/60"
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
                      alert("⚠️ Please select a reseller tier before proceeding.")
                      return
                    }
                    if (!paymentMethod) {
                      alert("⚠️ Please select a payment method before proceeding.")
                      return
                    }

                    window.open(
                      `https://wa.me/923033996000?text=I'm interested in the ${selectedTier.name} reseller panel, paying via ${paymentMethod}.`,
                      "_blank"
                    )
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all duration-200"
                >
                  <FaWhatsapp size={25} /> Order via WhatsApp
                </button>
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-border/50">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Our Reseller Panel</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: BarChart3, title: "Grow Revenue", description: "Earn commissions on every sale" },
                  { icon: Users, title: "Manage Customers", description: "Complete dashboard control" },
                  { icon: Shield, title: "24/7 Support", description: "Dedicated reseller support team" },
                  { icon: Zap, title: "Fast Setup", description: "Start earning in minutes" },
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
                    <div 
                      className="description-content mb-8"
                      dangerouslySetInnerHTML={{ __html: staticDescription }}
                    />
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                        <ul className="space-y-3">
                          {selectedTier.includes.map((item) => (
                            <li key={item} className="flex items-center gap-3">
                              <Check size={18} className="text-accent" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {selectedTier.notIncludes.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Not Included</h3>
                          <ul className="space-y-3">
                            {selectedTier.notIncludes.map((item) => (
                              <li key={item} className="flex items-center gap-3">
                                <div className="size-3 rounded-full bg-muted flex-shrink-0" /> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
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

                    <form onSubmit={handleAddReview} className="space-y-6">
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
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-md font-semibold hover:shadow-lg transition-all"
                      >
                        Submit Review
                      </button>
                    </form>
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