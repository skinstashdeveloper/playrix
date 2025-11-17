import { CheckCircle2, Zap, Shield, Headphones } from "lucide-react"

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Zap,
      title: "Ultra Fast Streaming",
      description: "Optimized servers for seamless 4K streaming with zero buffering",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Military grade encryption protecting your viewing privacy",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated support team ready to help anytime",
    },
    {
      icon: CheckCircle2,
      title: "Money Back Guarantee",
      description: "100% satisfaction guaranteed or your money back",
    },
  ]

  return (
    <section className="bg-muted/50 px-6 py-20 md:py-15">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">Why Choose Playrix?</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/60">
            We deliver premium streaming experience with unmatched reliability and customer service
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 transition-all group-hover:bg-accent/20">
                  <Icon size={24} className="text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-foreground/60">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}