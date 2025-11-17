import { Globe, Zap, Lock, Smartphone } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Globe,
      title: "Worldwide Service",
      description: "Access from anywhere in the world with our global server network",
    },
    {
      icon: Zap,
      title: "Best Quality",
      description: "Experience HD and 4K streaming with crystal clear picture quality",
    },
    {
      icon: Lock,
      title: "Best Offers",
      description: "Unbeatable prices and frequent promotions for our loyal users",
    },
    {
      icon: Smartphone,
      title: "Secure Payments",
      description: "Protected transactions with multiple payment methods available",
    },
  ]

  return (
    <section className="px-6 py-20 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 p-4 transition-all group-hover:from-accent/30 group-hover:to-secondary/30">
                  <Icon size={28} className="text-accent" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-foreground/60">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
