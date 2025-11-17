"use client"

import React, { useState } from "react"
import { ImageIcon, Save, Upload, X } from "lucide-react"

const initialPlan = {
  title: "Standard Mango Plan",
  subtitle: "Ideal for growing reseller businesses on Metamango",
  price: "150",
  pricePeriod: "One-time",
  mangoCredits: "100 Mango",
  usdtPotential: "100 USDT",
  targetUser: "Resellers & Installers",
  features: [
    "100 Mango Credits",
    "100 USDT Earning Potential",
    "Advanced Dashboard",
    "Priority Email Support",
    "Marketing Materials",
  ],
  image: "",
  descriptionHtml:
    "<p>This is a flexible Metamango reseller package. You can edit this description, add <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and <a href='https://example.com' target='_blank'>links</a>.</p>",
}

export default function MetamangoDashboardPage() {
  const [plan, setPlan] = useState(initialPlan)
  const [newFeature, setNewFeature] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    setIsUploading(true)
    const reader = new FileReader()

    reader.onloadend = () => {
      setPlan((prev) => ({ ...prev, image: reader.result as string }))
      setIsUploading(false)
    }

    reader.onerror = () => {
      alert("Failed to read image file")
      setIsUploading(false)
    }

    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setPlan((prev) => ({ ...prev, image: "" }))
  }

  const updateField = (field: keyof typeof plan, value: string) => {
    setPlan((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddFeature = () => {
    if (!newFeature.trim()) return
    setPlan((prev) => ({ ...prev, features: [...prev.features, newFeature.trim()] }))
    setNewFeature("")
  }

  const handleRemoveFeature = (index: number) => {
    setPlan((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const applyFormat = (command: "bold" | "italic" | "underline" | "createLink") => {
    if (command === "createLink") {
      const url = window.prompt("Enter link URL:")
      if (!url) return
      document.execCommand("createLink", false, url)
    } else {
      document.execCommand(command)
    }

    const el = document.getElementById("description-editor")
    if (el) {
      updateField("descriptionHtml", el.innerHTML)
    }
  }

  const handleDescriptionInput = (e: React.FormEvent<HTMLDivElement>) => {
    const html = (e.target as HTMLDivElement).innerHTML
    updateField("descriptionHtml", html)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      console.log("Saving plan:", plan)
      alert("Metamango plan saved (mock). Hook this up to your backend API.")
    } catch (err) {
      alert("Failed to save. Check console for details.")
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-background p-6 md:p-8 lg:p-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Metamango Plan Editor</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Configure how your Metamango reseller plan looks on the front store. Upload image, update pricing, and description — then save to apply.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 items-start">
        <div className="rounded-2xl border border-border bg-card shadow-sm p-6 md:p-7">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <ImageIcon className="h-4 w-4" />
            Metamango Plan Preview
          </div>

          <div className="mb-5 overflow-hidden rounded-xl border border-border bg-muted h-52 md:h-60 flex items-center justify-center">
            {plan.image ? (
              <img
                src={plan.image}
                alt={plan.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground text-sm">
                <ImageIcon className="mb-2 h-8 w-8" />
                <span>No image uploaded yet</span>
              </div>
            )}
          </div>

          <h2 className="mb-1 text-xl md:text-2xl font-bold text-foreground">{plan.title || "Plan Title"}</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {plan.subtitle || "Short plan description will appear here."}
          </p>

          <div className="mb-4 flex flex-wrap items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">${plan.price || "0"}</span>
            <span className="text-sm text-muted-foreground">/{plan.pricePeriod || "One-time"}</span>
          </div>

          <div className="mb-4 flex flex-wrap gap-2 text-xs md:text-sm">
            {plan.mangoCredits && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary font-medium">
                {plan.mangoCredits}
              </span>
            )}
            {plan.usdtPotential && (
              <span className="rounded-full bg-secondary/10 px-3 py-1 text-secondary font-medium">
                {plan.usdtPotential}
              </span>
            )}
            {plan.targetUser && (
              <span className="rounded-full bg-secondary/10 px-3 py-1 text-secondary font-medium">
                {plan.targetUser}
              </span>
            )}
          </div>

          <ul className="mb-5 space-y-1.5 text-sm text-foreground/80">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="prose prose-sm max-w-none text-foreground/80 [&_a]:text-primary [&_a]:underline">
            <div
              dangerouslySetInnerHTML={{ __html: plan.descriptionHtml || "<p>No description yet.</p>" }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm p-6 md:p-7 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Plan Settings</h2>
            <p className="text-xs text-muted-foreground">
              Update the details that will appear for this Metamango package.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-foreground">Plan Image</label>
            
            {plan.image ? (
              <div className="relative rounded-lg border border-border overflow-hidden">
                <img
                  src={plan.image}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:opacity-90 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/30">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            )}
            {isUploading && (
              <p className="text-xs text-primary">Uploading image...</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Title</label>
              <input
                type="text"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                value={plan.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Subtitle</label>
              <input
                type="text"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                value={plan.subtitle}
                onChange={(e) => updateField("subtitle", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Price (USD)</label>
              <input
                type="number"
                min={0}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                value={plan.price}
                onChange={(e) => updateField("price", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Billing Type</label>
              <select
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                value={plan.pricePeriod}
                onChange={(e) => updateField("pricePeriod", e.target.value)}
              >
                <option value="One-time">One-time</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Mango Credits</label>
              <input
                type="text"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="e.g. 100 Mango"
                value={plan.mangoCredits}
                onChange={(e) => updateField("mangoCredits", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">USDT Potential</label>
              <input
                type="text"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="e.g. 100 USDT"
                value={plan.usdtPotential}
                onChange={(e) => updateField("usdtPotential", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Target Users</label>
              <select
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                value={plan.targetUser}
                onChange={(e) => updateField("targetUser", e.target.value)}
              >
                <option value="Resellers & Installers">Resellers & Installers</option>
                <option value="Advanced Sellers">Advanced Sellers</option>
                <option value="Agencies">Agencies</option>
                <option value="Enterprise Partners">Enterprise Partners</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-foreground">Features</label>
            <div className="space-y-2">
              {plan.features.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-xs md:text-sm"
                >
                  <span className="truncate">{f}</span>
                  <button
                    onClick={() => handleRemoveFeature(idx)}
                    className="ml-3 text-xs text-red-500 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Add new feature..."
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
              />
              <button
                onClick={handleAddFeature}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-foreground">Description</label>

            <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-muted/40 px-2 py-1.5 text-xs">
              <button
                onClick={() => applyFormat("bold")}
                className="rounded px-2 py-1 font-bold hover:bg-muted cursor-pointer"
              >
                B
              </button>
              <button
                onClick={() => applyFormat("italic")}
                className="rounded px-2 py-1 italic hover:bg-muted cursor-pointer"
              >
                i
              </button>
              <button
                onClick={() => applyFormat("underline")}
                className="rounded px-2 py-1 underline hover:bg-muted cursor-pointer"
              >
                U
              </button>
              <button
                onClick={() => applyFormat("createLink")}
                className="rounded px-2 py-1 hover:bg-muted cursor-pointer"
              >
                Link
              </button>
            </div>

            <div
              id="description-editor"
              className="min-h-[140px] w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 prose prose-sm max-w-none"
              contentEditable
              dangerouslySetInnerHTML={{ __html: plan.descriptionHtml }}
              onInput={handleDescriptionInput}
            />
            <p className="text-[10px] text-muted-foreground">
              Select text and use the toolbar to style it. Links open in a new tab.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.01] transition-transform duration-150 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Metamango Plan"}
        </button>
      </div>
    </div>
  )
}