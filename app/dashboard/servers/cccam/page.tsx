"use client"

import React, { useState } from "react"
import { Image, Save, Upload, X, Plus, Trash2 } from "lucide-react"

const initialPlans = {
  basic: {
    id: "basic",
    name: "CCcam Basic",
    price: "349",
    period: "Monthly",
    channels: "6000+",
    quality: "4K",
    devices: "1",
    image: "/streaming-basic-plan.jpg",
    description: "Perfect for casual viewers",
    fullDescription: "Our Basic plan is designed for viewers who want access to a wide variety of channels without breaking the bank. Enjoy 6000+ live channels in HD quality with 5G fast streaming.",
    includes: ["6000+ Global Channels", "HD Streaming", "Basic Support", "Weekly Updates", "VOD Library"],
    notIncludes: ["4K Streaming", "Multi-Device", "Premium Support", "Exclusive Content"],
  },
  standard: {
    id: "standard",
    name: "CCcam Standard",
    price: "449",
    period: "Monthly",
    channels: "8000+",
    quality: "Full HD",
    devices: "2",
    image: "/streaming-basic-plan.jpg",
    description: "Best for small families",
    fullDescription: "Perfect for small families who want access to 8000+ channels in Full HD quality.",
    includes: ["8000+ Global Channels", "Full HD Streaming", "Email Support", "Weekly Updates", "VOD Library"],
    notIncludes: ["4K Streaming", "Multi-Device beyond 2", "Premium Support"],
  },
  pro: {
    id: "pro",
    name: "CCcam Pro",
    price: "549",
    period: "Monthly",
    channels: "10000+",
    quality: "4K HD",
    devices: "4",
    image: "/streaming-pro-plan-premium.jpg",
    description: "Recommended for families",
    featured: true,
    fullDescription: "Our Pro plan is the perfect balance between price and features. Get access to 10000+ channels in 4K quality with blazing-fast 5G speeds.",
    includes: ["10000+ Global Channels", "4K Streaming", "Priority Support", "Daily Updates", "Full VOD", "Exclusive Content"],
    notIncludes: ["Dedicated Account Manager", "Custom Integrations"],
  },
  premium: {
    id: "premium",
    name: "CCcam Premium",
    price: "899",
    period: "Monthly",
    channels: "12000+",
    quality: "4K HDR",
    devices: "6",
    image: "/streaming-premium-entertainment.jpg",
    description: "Ultimate entertainment package",
    fullDescription: "Our Premium plan is the ultimate entertainment solution. Access 12000+ channels in 4K quality with ultra-fast 5G streaming.",
    includes: ["12000+ Global Channels", "4K HDR Streaming", "VIP Support", "Real-time Updates", "Full VOD", "Exclusive Content", "Cloud Storage", "Priority 5G Servers"],
    notIncludes: [],
  },
}

export default function cccamDashboardPage() {
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "standard" | "pro" | "premium">("basic")
  const [plans, setPlans] = useState(initialPlans)
  const [originalPlans, setOriginalPlans] = useState(JSON.parse(JSON.stringify(initialPlans)))
  const [newInclude, setNewInclude] = useState("")
  const [newNotInclude, setNewNotInclude] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const currentPlan = plans[selectedPlan]

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
      updatePlanField("image", reader.result as string)
      setIsUploading(false)
    }

    reader.onerror = () => {
      alert("Failed to read image file")
      setIsUploading(false)
    }

    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    updatePlanField("image", "")
  }

  const updatePlanField = (field: string, value: any) => {
    setPlans(prev => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        [field]: value
      }
    }))
  }

  const handleAddInclude = () => {
    if (!newInclude.trim()) return
    updatePlanField("includes", [...currentPlan.includes, newInclude.trim()])
    setNewInclude("")
  }

  const handleRemoveInclude = (index: number) => {
    updatePlanField("includes", currentPlan.includes.filter((_, i) => i !== index))
  }

  const handleAddNotInclude = () => {
    if (!newNotInclude.trim()) return
    updatePlanField("notIncludes", [...currentPlan.notIncludes, newNotInclude.trim()])
    setNewNotInclude("")
  }

  const handleRemoveNotInclude = (index: number) => {
    updatePlanField("notIncludes", currentPlan.notIncludes.filter((_, i) => i !== index))
  }

  const hasChanges = () => {
    return JSON.stringify(plans) !== JSON.stringify(originalPlans)
  }

  const handleSave = async () => {
    if (!hasChanges()) {
      alert("⚠️ No changes detected. Please modify something before saving.")
      return
    }

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log("Saving plans:", plans)
      setOriginalPlans(JSON.parse(JSON.stringify(plans)))
      alert("✅ CCcam plans updated successfully!")
    } catch (err) {
      alert("❌ Failed to save. Check console for details.")
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-background p-6 md:p-8 lg:p-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">CCcam Plans Editor</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Edit all CCcam plans. Select a plan and modify its details.
        </p>
      </div>

      {/* Plan Selector */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-foreground mb-3 block">Select Plan to Edit</label>
        <div className="flex gap-3 flex-wrap">
          {(["basic", "standard", "pro", "premium"] as const).map((planKey) => (
            <button
              key={planKey}
              onClick={() => setSelectedPlan(planKey)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedPlan === planKey
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {plans[planKey].name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {/* Preview Card */}
        <div className="rounded-2xl border border-border bg-card shadow-sm p-6 md:p-7 space-y-6 sticky top-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Image className="h-4 w-4" />
            Live Preview
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-muted h-48 flex items-center justify-center">
            {currentPlan.image ? (
              <img src={currentPlan.image} alt={currentPlan.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground text-sm">
                <Image className="mb-2 h-8 w-8" />
                <span>No image uploaded</span>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{currentPlan.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{currentPlan.description}</p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-foreground">${currentPlan.price}</span>
              <span className="text-sm text-muted-foreground">/{currentPlan.period}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {currentPlan.channels} Channels
              </div>
              <div className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                {currentPlan.quality} Quality
              </div>
              <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                {currentPlan.devices} Devices
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Full Description</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">{currentPlan.fullDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">What's Included</h3>
              <div className="space-y-2">
                {currentPlan.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    <span className="text-foreground/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {currentPlan.notIncludes.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Not Included</h3>
                <div className="space-y-2">
                  {currentPlan.notIncludes.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-muted-foreground">○</span>
                      <span className="text-foreground/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit Form */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="rounded-2xl border border-border bg-card shadow-sm p-6 md:p-7 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">Basic Information</h2>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-foreground">Plan Image</label>
              {currentPlan.image ? (
                <div className="relative rounded-lg border border-border overflow-hidden">
                  <img src={currentPlan.image} alt="Preview" className="w-full h-40 object-cover" />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:opacity-90"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/30">
                  <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload</p>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                </label>
              )}
              {isUploading && <p className="text-xs text-primary">Uploading...</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold">Plan Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  value={currentPlan.name}
                  onChange={(e) => updatePlanField("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Channels</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  value={currentPlan.channels}
                  onChange={(e) => updatePlanField("channels", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold">Quality</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  value={currentPlan.quality}
                  onChange={(e) => updatePlanField("quality", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Devices</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  value={currentPlan.devices}
                  onChange={(e) => updatePlanField("devices", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold">Price</label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  value={currentPlan.price}
                  onChange={(e) => updatePlanField("price", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Period</label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  value={currentPlan.period}
                  onChange={(e) => updatePlanField("period", e.target.value)}
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold">Short Description</label>
              <input
                type="text"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                value={currentPlan.description}
                onChange={(e) => updatePlanField("description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold">Full Description</label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                value={currentPlan.fullDescription}
                onChange={(e) => updatePlanField("fullDescription", e.target.value)}
              />
            </div>
          </div>

          {/* Includes */}
          <div className="rounded-2xl border border-border bg-card shadow-sm p-6 md:p-7 space-y-4">
            <h2 className="text-lg font-semibold">What's Included</h2>
            <div className="space-y-2">
              {currentPlan.includes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  <span className="flex-1">{item}</span>
                  <button onClick={() => handleRemoveInclude(idx)} className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                placeholder="Add item..."
                value={newInclude}
                onChange={(e) => setNewInclude(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddInclude()}
              />
              <button onClick={handleAddInclude} className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Not Includes */}
          <div className="rounded-2xl border border-border bg-card shadow-sm p-6 md:p-7 space-y-4">
            <h2 className="text-lg font-semibold">Not Included</h2>
            <div className="space-y-2">
              {currentPlan.notIncludes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  <span className="flex-1">{item}</span>
                  <button onClick={() => handleRemoveNotInclude(idx)} className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                placeholder="Add item..."
                value={newNotInclude}
                onChange={(e) => setNewNotInclude(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddNotInclude()}
              />
              <button onClick={handleAddNotInclude} className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.01] transition-transform disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  )
}