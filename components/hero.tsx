"use client"

import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-20 md:py-25">
      <div
        className="absolute inset-0 opacity-100 bg-cover bg-center"
        style={{
          backgroundImage: `url('/iptv.jpg')`,
        }}
      />

      {/* Background gradient orbs */}
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-gradient-to-tr from-secondary/20 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-6 inline-block rounded-full bg-accent/10 px-4 py-1.5">
          <span className="md:text-1xl font-semibold text-accent">⭐ Next Generation IPTV & Servers</span>
        </div>

        <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl">
          Stream Everything with{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Lightning Speed
          </span>
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-white">
          Experience premium IPTV services with 4K streaming, multi-device support, and 99.9% uptime. Join thousands of
          satisfied users worldwide.
        </p>


        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
              href="https://wa.me/923033996000"
              target="_blank"
              rel="noopener noreferrer"
          >
          <button className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-3.5 font-semibold text-primary-foreground transition-all duration-200 hover:shadow-lg hover:shadow-primary/30">
            Get Started <ArrowRight size={20} />
          </button>
          </Link>
          {/* <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-primary/20 px-8 py-3.5 font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/5">
            <Play size={20} /> Watch Demo
          </button> */}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 text-white">
          {[
            { label: "Active Users", value: "50K+" },
            { label: "TV Channels", value: "10K+" },
            { label: "Uptime", value: "99.9%" },
            { label: "Countries", value: "180+" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-green md:text-3xl">{stat.value}</div>
              <div className="text-sm leading-tight text-white">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
