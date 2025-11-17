import Image from "next/image"
import { Calendar, User, ArrowRight } from "lucide-react"

export default function LatestNews() {
  const news = [
    {
      title: "Best IPTV Providers for 4K Streaming",
      excerpt: "Discover the top-rated IPTV providers offering 4K streaming experience",
      date: "Nov 2024",
      category: "Server Guide",
      image: "/3d.png",
    },
    {
      title: "Apollo IPTV Server Update Released",
      excerpt: "New features and improvements for better streaming performance",
      date: "Nov 2024",
      category: "General",
      image: "/3d.png",
    },
    {
      title: "Forever Server Subscription Growth Report",
      excerpt: "See how our Forever Server became the most popular choice",
      date: "Oct 2024",
      category: "Best Selling",
      image: "/3d.png",
    },
  ]

  return (
    <section className="bg-muted/30 px-6 py-20 md:py-15">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">Latest News</h2>
          <p className="text-lg text-foreground/60">
            Stay updated with the latest IPTV trends and announcements
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {item.category}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary">
                  {item.title}
                </h3>

                <p className="mb-4 text-sm text-foreground/60">{item.excerpt}</p>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="flex gap-4 text-xs text-foreground/50">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {item.date}
                    </span>
                  </div>
                  <button className="text-accent transition-transform group-hover:translate-x-1">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
