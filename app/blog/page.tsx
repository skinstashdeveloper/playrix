"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

// Mock blog data
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

const CATEGORIES = ["All", "General",  "Tutorial", "Server Guide", "Pricing", "Support", "Technology", "Best Selling"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [displayCount, setDisplayCount] = useState(6) 
  const router = useRouter()

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return BLOG_POSTS
    return BLOG_POSTS.filter((post) => post.category === selectedCategory)
  }, [selectedCategory])

  const displayedPosts = filteredPosts.slice(0, displayCount)
  const hasMorePosts = filteredPosts.length > displayCount

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Blog</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">IPTV Blog & Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover tips, guides, and the latest news about IPTV services, streaming technology, and how to optimize
            your viewing experience.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setDisplayCount(6) // Reset display count when category changes
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-secondary/20 border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => router.push(`/blog/${post.id}`)}
              className="group cursor-pointer bg-card rounded-xl overflow-hidden border border-border hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                {/* Metadata */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground line-clamp-2 flex-grow">{post.excerpt}</p>

                {/* Date and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <button className="text-primary font-semibold hover:text-accent transition-colors flex items-center gap-1 group/btn">
                    Read More
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {displayedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No posts found in this category.</p>
          </div>
        )}

        {/* Show More Button */}
        {hasMorePosts && (
          <div className="flex justify-center mt-16 mb-8">
            <button
              onClick={() => setDisplayCount(displayCount + 9)}
              className="px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-lg border-2 border-primary"
            >
              Show More Posts
            </button>
          </div>
        )}

        {/* Message when all posts are loaded */}
        {!hasMorePosts && displayedPosts.length > 0 && (
          <div className="flex justify-center mt-16">
            <p className="text-muted-foreground text-center">
              You're viewing all {displayedPosts.length} posts in this category
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
