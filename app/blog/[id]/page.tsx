"use client"
import { useRouter, useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronRight, ArrowLeft, Calendar, Clock } from "lucide-react"
import React from "react"
import Image from "next/image"
import type { JSX } from "react"
const HeadingTag = `h${headingLevel}` as React.ElementType

// Mock blog data (same as in blog page)
const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Set Up IPTV on Your Android Device",
    excerpt: "A comprehensive guide to installing and configuring IPTV services on your Android phone or tablet.",
    category: "Tutorial",
    date: "November 15, 2024",
    readTime: "5 min read",
    image: "/android-iptv-setup.jpg",
    content: `# How to Set Up IPTV on Your Android Device

Setting up IPTV on your Android device is simpler than you might think. Follow these steps to get started.

## Step 1: Download the App
First, download a reliable IPTV app from the Google Play Store or our recommended sources.

## Step 2: Configure Your Credentials
Enter your username and password that were provided when you purchased your subscription.

## Step 3: Select Your Playlist
Choose from the available playlists and channels that match your subscription plan.

## Step 4: Customize Your Experience
Arrange your favorite channels, set up parental controls, and customize your viewing preferences.

With these simple steps, you'll be enjoying IPTV services within minutes!`,
  },
  {
    id: 2,
    title: "Best IPTV Servers for 4K Streaming",
    excerpt: "Discover the top-performing IPTV servers that deliver reliable 4K streaming quality.",
    category: "Server Guide",
    date: "November 10, 2024",
    readTime: "7 min read",
    image: "/4k-streaming-technology.jpg",
    content: `# Best IPTV Servers for 4K Streaming

In this guide, we explore the best servers optimized for 4K streaming performance.

## What Makes a Good 4K Server?

A good 4K streaming server requires:
- High bandwidth capacity
- Low latency connections
- Redundant backup systems
- 24/7 monitoring

## Our Top Recommendations

We've tested multiple servers and compiled a list of the best performers in the industry.

Each server option provides stable streaming with minimal buffering and excellent picture quality.`,
  },
  {
    id: 3,
    title: "IPTV Subscription Plans Compared",
    excerpt: "Compare different IPTV subscription tiers and find the perfect plan for your needs.",
    category: "Pricing",
    date: "November 5, 2024",
    readTime: "6 min read",
    image: "/subscription-comparison.jpg",
    content: `# IPTV Subscription Plans Compared

Choosing the right subscription plan can be overwhelming. Let us break it down for you.

## Basic Plan
Perfect for casual viewers with essential channels and reliable streaming.

## Premium Plan
Includes 4K content, multiple simultaneous streams, and exclusive channels.

## Enterprise Plan
Designed for businesses and heavy users with unlimited streams and priority support.

Select the plan that best fits your viewing habits and budget.`,
  },
  {
    id: 4,
    title: "Troubleshooting Common IPTV Issues",
    excerpt: "Learn how to solve the most common IPTV problems quickly and efficiently.",
    category: "Support",
    date: "October 28, 2024",
    readTime: "8 min read",
    image: "/technical-support.jpg",
    content: `# Troubleshooting Common IPTV Issues

Experiencing problems with your IPTV service? We've got solutions.

## Buffering Issues
Common causes and quick fixes for buffering problems.

## Connection Problems
How to diagnose and fix connectivity issues.

## Audio/Video Sync
Solutions for audio and video synchronization problems.

## App Crashes
Steps to resolve app crashes and freezing issues.

Follow our troubleshooting guide to resolve most issues within minutes.`,
  },
  {
    id: 5,
    title: "The Future of Streaming Technology",
    excerpt: "Explore emerging technologies that will shape the future of IPTV and streaming services.",
    category: "Technology",
    date: "October 20, 2024",
    readTime: "9 min read",
    image: "/future-technology-streaming.jpg",
    content: `# The Future of Streaming Technology

What's next in the world of IPTV and streaming? Let's explore the upcoming innovations.

## AI-Powered Recommendations
Machine learning is revolutionizing how content is recommended.

## 8K Streaming
The next frontier in video quality and resolution.

## Blockchain Technology
How blockchain is being integrated into streaming platforms.

## Virtual Reality Integration
Immersive viewing experiences through VR technology.

The future of streaming is exciting, and we're ready for it!`,
  },
  {
    id: 6,
    title: "Choosing Between Satellite and Android Servers",
    excerpt: "Understand the differences between satellite and Android server options for IPTV.",
    category: "Server Guide",
    date: "October 15, 2024",
    readTime: "6 min read",
    image: "/server-comparison.jpg",
    content: `# Choosing Between Satellite and Android Servers

Both satellite and Android servers offer unique advantages. Here's how to choose.

## Satellite Servers
Traditional satellite technology with established infrastructure.

## Android Servers
Modern, flexible Android-based solutions.

## Comparison Table
- Performance metrics
- Cost analysis
- Compatibility
- Support options

Choose the option that best aligns with your requirements.`,
  },
]

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const postId = Number.parseInt(params.id as string)

  const post = BLOG_POSTS.find((p) => p.id === postId)

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push("/blog")}
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground truncate">{post.title}</span>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero Image */}
        <div className="mb-10 rounded-xl overflow-hidden border border-border shadow-lg">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-96 object-cover" />
        </div>

        {/* Header Section */}
        <div className="mb-10 pb-8 border-b border-border">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">{post.title}</h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-medium">{post.category}</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none">
          <div className="text-foreground space-y-6 leading-relaxed">
            {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("#")) {
                // Match the heading markers safely
                const match = paragraph.match(/^#+/)
                const level = match ? match[0].length : 1
                const text = paragraph.replace(/^#+\s*/, "")

                // Ensure valid heading level (HTML supports only h1–h6)
                const headingLevel = Math.min(level, 6)
                const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements

                return React.createElement(
                    HeadingTag,
                    {
                    key: index,
                    className: `font-bold text-foreground ${
                        headingLevel === 1
                        ? "text-3xl mb-4 mt-8"
                        : headingLevel === 2
                        ? "text-2xl mb-3 mt-6"
                        : "text-xl mb-2 mt-4"
                    }`,
                    },
                    text
                )
                }


              if (paragraph.startsWith("-")) {
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 text-muted-foreground">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i} className="ml-2">
                        {item.replace(/^-\s/, "")}
                      </li>
                    ))}
                  </ul>
                )
              }

              return (
                <p key={index} className="text-muted-foreground text-lg">
                  {paragraph}
                </p>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl border border-border text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">Ready to get started?</h3>
          <p className="text-muted-foreground mb-6">
            Explore our IPTV services and find the perfect subscription plan for you.
          </p>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-semibold"
          >
            View Plans
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </article>

      <Footer />
    </main>
  )
}
