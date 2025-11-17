"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Check, Tv, Wifi, Users, Star, User, CreditCard, Mail } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { FaWhatsapp } from "react-icons/fa"
import { useCurrency } from "@/app/context/CurrencyContext"
import CurrencySelector from "@/components/CurrencySelector"

interface Specification {
  label: string
  value: string
}

interface Plan {
  name: string
  price: string
  period: string
  channels: string
  image: string
  description: string
  fullDescription: string
  features: string[]
  specifications: Specification[]
  includes: string[]
  notIncludes: string[]
}

const plansData: Record<string, Plan> = {
  basic: {
    name: "FIBER STREAM Basic",
    price: "299",
    period: "Monthly",
    channels: "5000+",
    image: "/streaming-service-basic.jpg",
    description: "Perfect for casual viewers",
    fullDescription: `FIBER STREAM Basic delivers 5000+ channels with ultra-fast fiber-optic streaming.`,
    features: ["5000+ Live Channels", "HD Quality", "1 Device", "24/7 Support"],
    specifications: [
      { label: "Channels", value: "6000+" },
      { label: "Quality", value: "HD (720p)" },
      { label: "Simultaneous Devices", value: "1" },
      { label: "Support", value: "24/7 Chat" },
      { label: "Cancellation", value: "Anytime" },
      { label: "Setup Time", value: "< 5 minutes" },
    ],
    includes: ["5000+ Channels", "HD Streaming", "Basic Support"],
    notIncludes: ["4K Streaming", "Multi-Device"],
  },
  standard: {
  name: "FIBER STREAM Standard",
  price: "349",
  period: "Monthly",
  channels: "8000+",
  image: "/streaming-basic-plan.jpg",
  description: "Best for families",
  fullDescription: `FIBER STREAM Pro offers 8000+ channels in Full HD with lightning-fast speeds.`,
  features: ["8000+ Live Channels", "Full HD Quality", "3 Devices", "Priority Support"],
  specifications: [
    { label: "Channels", value: "8000+" },
    { label: "Quality", value: "Full HD (1080p)" },
    { label: "Simultaneous Devices", value: "2" },
    { label: "Support", value: "Email" },
    { label: "Cancellation", value: "Anytime" },
    { label: "Setup Time", value: "< 5 minutes" },
  ],
    includes: ["8000+ Channels", "Full HD Streaming", "Priority Support"],
    notIncludes: ["4K Streaming"],
},
  pro: {
    name: "FIBER STREAM Pro",
    price: "499",
    period: "Monthly",
    channels: "8000+",
    image: "/streaming-service-basic.jpg",
    description: "Recommended for families who want premium 5G entertainment experience",
    fullDescription: `"FIBER STREAM Pro offers 8000+ channels in Full HD with lightning-fast speeds.`,
    features: ["8000+ Live Channels", "Full HD Quality", "3 Devices", "Priority Support"],
    specifications: [
      { label: "Channels", value: "10000+" },
      { label: "Quality", value: "4K (2160p)" },
      { label: "Simultaneous Devices", value: "5" },
      { label: "Support", value: "24/7 Priority" },
      { label: "Cancellation", value: "Anytime" },
      { label: "Setup Time", value: "< 3 minutes" },
    ],
    includes: ["8000+ Channels", "Full HD Streaming", "Priority Support"],
    notIncludes: ["4K Streaming"],
  },
  premium: {
    name: "FIBER STREAM Premium",
    price: "899",
    period: "Monthly",
    channels: "12000+",
    image: "/streaming-service-basic.jpg",
    description: "Ultimate package",
    fullDescription: `FIBER STREAM Premium includes 12000+ channels in 4K with premium features.`,
    features: ["12000+ Live Channels", "4K Quality", "5 Devices", "VIP Support"],

    specifications: [
      { label: "Channels", value: "12000+" },
      { label: "Quality", value: "4K HDR (2160p)" },
      { label: "Simultaneous Devices", value: "8" },
      { label: "Support", value: "VIP 24/7" },
      { label: "Cancellation", value: "Anytime" },
      { label: "Setup Time", value: "Instant" },
    ],
    includes: ["12000+ Channels", "4K Streaming", "VIP Support"],
    notIncludes: [],
  },
}

export default function FiveGliveProductPage() {
  const params = useParams()
  const id = (params?.id as string)?.toLowerCase()
  const plan = plansData[id]
  const { currency, setCurrency, convertPrice } = useCurrency()

  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description")
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Ahmed Khan",
      date: "November 5, 2025",
      rating: 5,
      text: "Fiber stream is amazing! Lightning-fast streaming with no buffering. Highly recommended!",
    },
  ])
  const [newReview, setNewReview] = useState({
    rating: 0,
    text: "",
    name: "",
    email: "",
  })
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [orderForm, setOrderForm] = useState({
    subscriptionType: "",
    email: "",
    deviceConnection: "1 Device",
    paymentMethod: "whatsapp",
  })

  const basePrice = Number(plan.price)
  const [calculatedPrice, setCalculatedPrice] = useState(basePrice)

  const calculatePrice = (type: string, devices: string) => {
    let price = basePrice

    // Subscription type multiplier
    const typeMultiplier: Record<string, number> = {
      "api": 1.0,
      "m3u-link": 1.1,
      "xtream-codes": 1.25,
    }

    // Device multiplier
    const deviceMultiplier: Record<string, number> = {
      "1 Device": 1.0,
      "2 Devices": 1.15,
      "3 Devices": 1.25,
      "4 Devices": 1.35,
    }

    if (type && typeMultiplier[type]) price *= typeMultiplier[type]
    if (devices && deviceMultiplier[devices]) price *= deviceMultiplier[devices]

    setCalculatedPrice(Number(price.toFixed(0)))
  }

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReview.text && newReview.name && newReview.email && newReview.rating > 0) {
      const review = {
        id: reviews.length + 1,
        author: newReview.name,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        rating: newReview.rating,
        text: newReview.text,
      }
      setReviews([review, ...reviews])
      setNewReview({ rating: 0, text: "", name: "", email: "" })
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    }
  }

  // 🧠 New Validation-based Submit Function
  const handleOrderSubmit = () => {
    if (
      !orderForm.subscriptionType ||
      !orderForm.email ||
      !orderForm.deviceConnection ||
      !orderForm.paymentMethod
    ) {
      alert("⚠️ Please fill out all required fields before placing your order.")
      return
    }

    // If all required fields are filled
    window.open("https://wa.me/923033996000", "_blank")
  }


  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        <CurrencySelector />
        
        <div className="flex justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/5glive">
              <div className="inline-block mb-4 px-4 py-2 rounded-full bg-accent/20 border border-accent/50 hover:bg-accent/30 transition-colors cursor-pointer">
                <span className="text-accent font-semibold text-sm">← Back to Plans</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="px-6 py-16 md:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-1 gap-12 items-center">
          <div className="rounded-xl overflow-hidden border border-border bg-card h-56 md:h-64 lg:h-72">
            <img
              src={plan.image || "/placeholder.svg"}
              alt={plan.name}
              className="w-full h-full object-cover"
            />
          </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{plan.name}</h1>
              <p className="text-lg text-foreground/70 mb-6">{plan.description}</p>

            <div className="flex flex-col md:flex-row gap-6 mb-8 items-stretch">
              {/* Price Box */}
              <div className="flex-1 flex flex-col justify-center p-6 rounded-xl bg-card border border-border text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-start gap-2 mb-2">
                  <span className="text-4xl font-bold">
                    {currency === "USD" ? "$" : currency === "PKR" ? "₨" : "₹"}
                    {convertPrice(calculatedPrice)}
                  </span>

                  <span className="text-foreground/60">/{plan.period}</span>
                </div>
                <p className="text-sm text-foreground/60">No hidden fees • Cancel anytime</p>
              </div>

              {/* WhatsApp Button */}
              <button
                onClick={handleOrderSubmit}
                className="flex-1 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-2xl px-6 py-6 hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                <FaWhatsapp size={45} /> Order via WhatsApp
              </button>

            </div>

              <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-primary" />
                  Order Information
                </h3>

                <div className="space-y-4">
                  {/* Subscription Type */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Subscription Type</label>
                    <select
                      value={orderForm.subscriptionType}
                      onChange={(e) => setOrderForm({ ...orderForm, subscriptionType: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select subscription type</option>
                        <option value="api">API</option>
                        <option value="m3u">M3U Link</option>
                        <option value="xtream">Xtream Codes</option>
                    </select>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                      <Mail size={16} /> Email <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      value={orderForm.email}
                      onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                  </div>

                  {/* Device Connection */}
                  <div>

                    <label className="block text-sm font-semibold text-foreground mb-2">Device Connection</label>
                    <select 
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary transition-colors"

                      value={orderForm.deviceConnection}
                      onChange={(e) => {
                        const value = e.target.value
                        setOrderForm({ ...orderForm, deviceConnection: value })
                        calculatePrice(orderForm.subscriptionType, value) // use the current subscription type
                      }}
                    >
                      <option value="">Select device type</option>
                      <option value="1 Device">1 Device</option>
                      <option value="2 Devices">2 Devices</option>
                      <option value="3 Devices">3 Devices</option>
                      <option value="4 Devices">4 Devices</option>
                    </select>
                  </div>

                  {/* Payment Method */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Payment Method</label>

                  <div className="space-y-3">
                    {[
                      { id: "whatsapp", label: "WhatsApp Payment", color: "from-green-400 to-green-600", icon: "💬" },
                      { id: "bank", label: "Bank Transfer", color: "from-blue-400 to-blue-600", icon: "🏛️" },
                      { id: "crypto", label: "Crypto", color: "from-yellow-400 to-orange-500", icon: "₿" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          orderForm.paymentMethod === method.id
                            ? `border-transparent bg-gradient-to-r ${method.color} text-white shadow-lg shadow-${method.color.split(" ")[1]}/30`
                            : "bg-background border-border hover:border-primary/60"
                        }`}
                      >
                        {/* Custom radio circle */}
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                            orderForm.paymentMethod === method.id
                              ? "border-white bg-white"
                              : "border-foreground/40 bg-transparent"
                          }`}
                        >
                          {orderForm.paymentMethod === method.id && (
                            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                          )}
                        </span>

                        {/* Label Text */}
                        <span className="ml-3 font-medium flex items-center gap-2">
                          <span className="text-lg">{method.icon}</span>
                          {method.label}
                        </span>

                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={orderForm.paymentMethod === method.id}
                          onChange={(e) => setOrderForm({ ...orderForm, paymentMethod: e.target.value })}
                          className="hidden"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                </div>
              </div>
              
              <div className="flex justify-center mb-8">
                <button
                  onClick={handleOrderSubmit}
                  className="w-full max-w-xs bg-gradient-to-r from-primary to-secondary text-white font-semibold py-4 px-6 rounded-lg 
                  hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                >
                  <FaWhatsapp size={25} /> Order via WhatsApp
                </button>
              </div>


              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Tv size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-sm font-semibold">{plan.channels}</div>
                  <div className="text-xs text-foreground/60">Channels</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Wifi size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-sm font-semibold">4K</div>
                  <div className="text-xs text-foreground/60">Quality</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Users size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-sm font-semibold">{id === "basic" ? "1" : id === "pro" ? "5" : "8"}</div>
                  <div className="text-xs text-foreground/60">Devices</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="px-6 py-16 md:py-10">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
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
                <p className="text-lg text-foreground/70 mb-8 leading-relaxed">{plan.fullDescription}</p>
                {/* Includes */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                    <ul className="space-y-3">
                      {plan.includes.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <Check size={18} className="text-accent" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {plan.notIncludes.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Not Included</h3>
                      <ul className="space-y-3">
                        {plan.notIncludes.map((item) => (
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
                {/* Reviews */}
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

                {/* Add Review */}
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
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-md font-semibold"
                  >
                    Submit Review
                  </button>
                </form>
              </>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
