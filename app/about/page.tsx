'use client'

import Footer from '@/components/footer'
import { Header } from '@/components/header'
import { CheckCircle2, Users, Zap, Globe } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience premium streaming quality with zero buffering',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access content from around the world with our worldwide network',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: '24/7 support team dedicated to your satisfaction',
    },
    {
      icon: CheckCircle2,
      title: 'Premium Quality',
      description: '4K streaming and exclusive content only for our members',
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
              About <span className="text-primary">Playrix</span>
            </h1>
            <p className="mb-8 text-lg text-foreground/70 text-balance">
              We're revolutionizing streaming entertainment with premium IPTV services, reliable infrastructure, and
              exceptional customer support.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="px-6 py-16 md:py-15">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-balance">Our Story</h2>
                <p className="mb-4 text-foreground/70 leading-relaxed">
                  Founded with a vision to make premium streaming accessible to everyone, Playrix started as a small
                  team of enthusiasts dedicated to delivering the best IPTV experience.
                </p>
                <p className="mb-4 text-foreground/70 leading-relaxed">
                  Today, we've grown into a trusted provider serving thousands of customers worldwide, maintaining our
                  commitment to quality, reliability, and customer satisfaction.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  Our journey continues as we innovate and expand, bringing entertainment to more people across the
                  globe with cutting-edge technology and exceptional service.
                </p>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden bg-primary/10">
                <Image
                  src="/3d.png"
                  alt="Our Team Illustration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-6 py-16 md:py-20 bg-primary/5">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-balance">Our Values</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div
                    key={index}
                    className="rounded-lg border border-border bg-background/50 p-6 backdrop-blur transition-all hover:border-primary/50 hover:bg-background"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold">{value.title}</h3>
                    <p className="text-sm text-foreground/60">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-balance">Meet Our Team</h2>
            <p className="mb-12 text-center text-foreground/70">
              Passionate professionals dedicated to delivering the best streaming experience
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((member) => (
                <div key={member} className="text-center">
                  <div className="mb-4 h-48 w-full rounded-lg bg-primary/10 overflow-hidden">
                    <Image
                      src={`/download.jpeg`} 
                      alt={`Team Member ${member}`}
                      width={192}
                      height={192}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mb-1 font-semibold">Team Member {member}</h3>
                  <p className="text-sm text-foreground/60">Position</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-16 md:py-20 bg-gradient-to-r from-primary/10 via-background to-primary/10">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-4 text-center">
              <div>
                <h3 className="mb-2 text-3xl font-bold text-primary">10K+</h3>
                <p className="text-foreground/60">Active Users</p>
              </div>
              <div>
                <h3 className="mb-2 text-3xl font-bold text-primary">99.9%</h3>
                <p className="text-foreground/60">Uptime</p>
              </div>
              <div>
                <h3 className="mb-2 text-3xl font-bold text-primary">50+</h3>
                <p className="text-foreground/60">Countries</p>
              </div>
              <div>
                <h3 className="mb-2 text-3xl font-bold text-primary">24/7</h3>
                <p className="text-foreground/60">Support</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
