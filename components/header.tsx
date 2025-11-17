"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"

function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isAllProductsOpen, setIsAllProductsOpen] = useState(false)
  const [isIPTVOpen, setIsIPTVOpen] = useState(false)
  const [isServersOpen, setIsServersOpen] = useState(false)
  const [isResellerOpen, setIsResellerOpen] = useState(false)

  const iptvProviders = [
    { name: "STAR SHARE", href: "/iptv/starshare" },
    { name: "B1G", href: "/iptv/b1g" },
    { name: "5GLIVE", href: "/iptv/5glive" },
    { name: "OPPLEX", href: "/iptv/opplex" },
    { name: "FIBER STREAM", href: "/iptv/fiberstream" },
    { name: "BOSS", href: "/iptv/boss" },
    { name: "TREX", href: "/iptv/trex" },
    { name: "GEO", href: "/iptv/geo" },
    { name: "KING 365", href: "/iptv/king365" },
    { name: "IRON PRO", href: "/iptv/ironpro" },
    { name: "SLYTV", href: "/iptv/slytv" },
    { name: "APOLLO", href: "/iptv/apollo" },
    { name: "ALTAS", href: "/iptv/altas" },
    { name: "AVTAR", href: "/iptv/avtar" },
  ]

  const servers = [
    { name: "Apollo + Forever Server", href: "/servers/apolloplusforever" },
    { name: "Vip Recharge", href: "/servers/viprecharge" },
    { name: "Apollo", href: "/servers/apollo" },
    { name: "Forever IKS", href: "/servers/foreveriks" },
    { name: "Funcam Server", href: "/servers/funcam" },
    { name: "GShare Server", href: "/servers/gshare" },
    { name: "Nashare Codes", href: "/servers/nasharecodes" },
    { name: "Mars", href: "/servers/mars" },
    { name: "Netfly", href: "/servers/netfly" },
    { name: "MGcam", href: "/servers/mgcam" },
    { name: "CCcam", href: "/servers/cccam" },
  ]

  const reseller = [
    { name: "IPTV Reseller Panels", href: "/reseller/iptvresellerpanels" },
    { name: "Forever Server Reseller | Metamango Panel", href: "/reseller/metamango" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const handleAllProductsClick = () => {
    setIsAllProductsOpen(!isAllProductsOpen)
    setIsIPTVOpen(false)
    setIsServersOpen(false)
    setIsResellerOpen(false)
  }

  const handleIPTVClick = () => {
    setIsIPTVOpen(!isIPTVOpen)
    setIsAllProductsOpen(false)
    setIsServersOpen(false)
    setIsResellerOpen(false)
  }

  const handleServersClick = () => {
    setIsServersOpen(!isServersOpen)
    setIsAllProductsOpen(false)
    setIsIPTVOpen(false)
    setIsResellerOpen(false)
  }

  const handleResellerClick = () => {
    setIsResellerOpen(!isResellerOpen)
    setIsAllProductsOpen(false)
    setIsIPTVOpen(false)
    setIsServersOpen(false)
  }

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const getLinkClass = (href: string) => {
    const baseClass =
      "text-sm font-medium transition-all duration-200 hover:text-foreground hover:bg-green/15 px-3 py-2 rounded"
    const activeClass = isActive(href) ? "bg-green/15 text-foreground" : "text-foreground/70"
    return `${baseClass} ${activeClass}`
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
          <Link href="/">
            <Image src="/playrix.png" alt="Playrix Logo" width={120} height={40} className="h-10 w-auto" />
          </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden gap-8 md:flex items-center">
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>

            <div className="relative">
            <Link href="/allproducts" className={getLinkClass("/allproducts")}>
                All Products
            </Link>

              {isAllProductsOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 rounded-lg border border-border bg-background shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="mb-3 text-xs font-semibold text-foreground/50 uppercase">Android Servers</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {iptvProviders.map((provider) => (
                          <Link
                            key={provider.name}
                            href={provider.href}
                            className="rounded px-2 py-1.5 text-xs text-foreground/70 transition-all duration-200 hover:bg-green/20 hover:text-foreground font-medium"
                            onClick={handleDropdownClick}
                          >
                            {provider.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4 h-px bg-border"></div>

                    <div>
                      <h3 className="mb-3 text-xs font-semibold text-foreground/50 uppercase">Satellite Servers</h3>
                      <div className="space-y-1.5">
                        {servers.map((server) => (
                          <Link
                            key={server.name}
                            href={server.href}
                            className="flex items-center gap-2 rounded px-2 py-2 text-xs text-foreground/70 transition-all duration-200 hover:bg-green/20 hover:text-foreground font-medium"
                            onClick={handleDropdownClick}
                          >
                            {server.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={handleIPTVClick}
                className="flex items-center gap-1 text-sm font-medium text-foreground/70 transition-all duration-200 hover:text-foreground hover:bg-green/15 px-3 py-2 rounded"
              >
                IPTV
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isIPTVOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isIPTVOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 rounded-lg border border-border bg-background shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4">
                    <div>
                      <h3 className="mb-3 text-xs font-semibold text-foreground/50 uppercase">Android Servers</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {iptvProviders.map((provider) => (
                          <Link
                            key={provider.name}
                            href={provider.href}
                            className="rounded px-2 py-1.5 text-xs text-foreground/70 transition-all duration-200 hover:bg-green/20 hover:text-foreground font-medium"
                            onClick={handleDropdownClick}
                          >
                            {provider.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={handleServersClick}
                className="flex items-center gap-1 text-sm font-medium text-foreground/70 transition-all duration-200 hover:text-foreground hover:bg-green/15 px-3 py-2 rounded"
              >
                Servers
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isServersOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isServersOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-border bg-background shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4">
                    <h3 className="mb-3 text-xs font-semibold text-foreground/50 uppercase">Satellite Servers</h3>
                    <div className="space-y-1.5">
                      {servers.map((server) => (
                        <Link
                          key={server.name}
                          href={server.href}
                          className="flex items-center gap-2 rounded px-2 py-2 text-xs text-foreground/70 transition-all duration-200 hover:bg-green/20 hover:text-foreground font-medium"
                          onClick={handleDropdownClick}
                        >
                          {server.name}
                        </Link>
                      ))}

                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={handleResellerClick}
                className="flex items-center gap-1 text-sm font-medium text-foreground/70 transition-all duration-200 hover:text-foreground hover:bg-green/15 px-3 py-2 rounded"
              >
                Reseller
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isResellerOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isResellerOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-border bg-background shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4">
                    <div className="space-y-1.5">
                      {reseller.map((r) => (
                        <Link
                          key={r.name}
                          href={r.href}
                          className="flex items-center gap-2 rounded px-2 py-2 text-xs text-foreground/70 transition-all duration-200 hover:bg-green/20 hover:text-foreground font-medium"
                          onClick={handleDropdownClick}
                        >
                          {r.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/blog" className={getLinkClass("/blog")}>
              Blogs
            </Link>

            <Link href="/contact" className={getLinkClass("/contact")}>
              Contact Us
            </Link>

            <Link href="/about" className={getLinkClass("/about")}>
              About Us
            </Link>
          </nav>

          <div className="hidden gap-3 md:flex">
            <button className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-accent-foreground transition-all duration-200 hover:shadow-lg hover:shadow-accent/30">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mt-4 flex flex-col gap-2 pb-4 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>

            <div>
              <button
                onClick={handleAllProductsClick}
                className="flex w-full items-center justify-between text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-green/15 px-3 py-2 rounded transition-all duration-200"
              >
                All Products
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isAllProductsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isAllProductsOpen && (
                <div className="mt-2 space-y-2 border-l-2 border-green/30 pl-4 animate-in fade-in slide-in-from-left duration-200">
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-foreground/50 uppercase mb-2">Android Servers</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {iptvProviders.map((provider) => (
                        <Link
                          key={provider.name}
                          href={provider.href}
                          className="text-xs text-foreground/70 hover:text-foreground hover:bg-green/15 px-2 py-1 rounded transition-all duration-200"
                        >
                          {provider.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 h-px bg-border/50"></div>

                  <div>
                    <h4 className="text-xs font-semibold text-foreground/50 uppercase mb-2">Satellite Servers</h4>
                    <div className="space-y-1.5">
                      {servers.map((server) => (
                        <Link
                          key={server.name}
                          href={server.href}
                          className="flex items-center gap-2 rounded px-2 py-2 text-xs text-foreground/70 transition-all duration-200 hover:bg-green/20 hover:text-foreground font-medium"
                          onClick={handleDropdownClick}
                        >
                          {server.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={handleIPTVClick}
                className="flex w-full items-center justify-between text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-green/15 px-3 py-2 rounded transition-all duration-200"
              >
                IPTV
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isIPTVOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isIPTVOpen && (
                <div className="mt-2 space-y-2 border-l-2 border-green/30 pl-4 animate-in fade-in slide-in-from-left duration-200">
                  <h3 className="text-xs font-semibold text-foreground/50 uppercase">Android Servers</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {iptvProviders.map((provider) => (
                      <Link
                        key={provider.name}
                        href={provider.href}
                        className="text-xs text-foreground/70 hover:text-foreground hover:bg-green/15 px-2 py-1 rounded transition-all duration-200"
                      >
                        {provider.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={handleServersClick}
                className="flex w-full items-center justify-between text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-green/15 px-3 py-2 rounded transition-all duration-200"
              >
                Servers
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isServersOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isServersOpen && (
                <div className="mt-2 space-y-2 border-l-2 border-green/30 pl-4 animate-in fade-in slide-in-from-left duration-200">
                  <h3 className="text-xs font-semibold text-foreground/50 uppercase">Satellite Servers</h3>
                  <div className="space-y-1.5">
                    {servers.map((server) => (
                      <Link
                        key={server.name}
                        href={server.href}
                        className="flex items-center gap-2 rounded px-2 py-2 text-xs text-foreground/70 transition-all duration-200 hover:bg-green/20 hover:text-foreground font-medium"
                        onClick={handleDropdownClick}
                      >
                        {server.name}
                      </Link>
                    ))}

                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={handleResellerClick}
                className="flex w-full items-center justify-between text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-green/15 px-3 py-2 rounded transition-all duration-200"
              >
                Reseller
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isResellerOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isResellerOpen && (
                <div className="mt-2 space-y-2 border-l-2 border-green/30 pl-4 animate-in fade-in slide-in-from-left duration-200">
                  {reseller.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-xs text-foreground/70 hover:text-foreground hover:bg-green/15 px-2 py-1 rounded transition-all duration-200 block"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-green/15 px-3 py-2 rounded transition-all duration-200"
            >
              Blogs
            </Link>

            <Link href="/contact" className={getLinkClass("/contact")}>
              Contact Us
            </Link>

            <Link href="/about" className={getLinkClass("/about")}>
              About Us
            </Link>

            <Link
                href="https://wa.me/923033996000"
                target="_blank"
                rel="noopener noreferrer"
            >
            <button className="w-full rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:shadow-lg transition-all duration-200 hover:shadow-accent/30">
              Get Started
            </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
export { Header }
