"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle } from "lucide-react"
import Footer from "@/components/footer"
import emailjs from "@emailjs/browser"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const whatsappNumber = "923001234567"
    const whatsappMessage = `
    New message from Playrix Contact Form
    -------------------------------------
    Name: ${formData.firstName} ${formData.lastName}
    Email: ${formData.email}
    Phone: ${formData.phone}
    Subject: ${formData.subject}
    Message: ${formData.message}
    `.trim()

    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      whatsappMessage
    )}`

    try {

      await emailjs.send(
        "servicgd3563ht",
        "playri45gdggd", 
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        "Y6-bfgfgdfd" 
      )

      window.open(whatsappURL, "_blank")

      setSubmitted(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error("❌ Email send failed:", error)
      alert("Failed to send email. But you can still message us on WhatsApp!")
      // Still send WhatsApp even if EmailJS fails
      window.open(whatsappURL, "_blank")
    } finally {
      setLoading(false)
    }
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      description: "Call us anytime",
      detail: "+92-303-3996000",
    },
    {
      icon: Mail,
      title: "Email",
      description: "We'll respond within 24 hours",
      detail: "playrixiptv@gmail.com",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      detail: "Available 24/7",
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Visit us in person",
      detail: "Pakistan",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 px-6 py-20 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl text-balance">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-foreground/70 text-balance">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-4 mb-12">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <div
                    key={index}
                    className="rounded-lg border border-border bg-background/50 p-6 text-center backdrop-blur transition-all hover:border-primary/50 hover:bg-background"
                  >
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon size={24} className="text-primary" />
                      </div>
                    </div>
                    <h3 className="mb-2 font-semibold">{method.title}</h3>
                    <p className="mb-3 text-sm text-foreground/60">{method.description}</p>
                    <p className="font-medium text-primary">{method.detail}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="px-6 py-16 md:py-20 bg-primary/5">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-2 text-center text-3xl font-bold text-balance">Send us a Message</h2>
            <p className="mb-12 text-center text-foreground/60">
              Fill out the form below and we'll get back to you shortly
            </p>

            {submitted && (
              <div className="mb-8 flex items-center gap-3 rounded-lg border border-primary/50 bg-primary/10 p-4 text-primary">
                <CheckCircle size={24} />
                <div>
                  <p className="font-semibold">Submitted Successfully!</p>
                  <p className="text-sm">Thank you for your message. We'll get back to you shortly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border bg-background p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-sm font-medium">
                    First Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2 text-sm font-medium">
                    Last Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                    Phone Number <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="+92-300-0000000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                  Subject <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-white py-3 font-medium transition ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/90"
                }`}
              >
                {loading ? "Sending..." : (<><Send size={18} /> Send Message</>)}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
