"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  ChevronDown,
  ShoppingCart,
  Tv,
  Server,
} from "lucide-react"

// =============================
// TYPES
// =============================

type MenuItem =
  | {
      href: string
      icon: any
      label: string
      exact?: boolean
      isDropdown?: false
    }
  | {
      label: string
      icon: any
      isDropdown: true
      subItems: {
        href: string
        label: string
      }[]
    }

// =============================
// COMPONENT
// =============================

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // INDIVIDUAL STATES FOR BOTH DROPDOWNS
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [iptvOpen, setIptvOpen] = useState(false)
  const [resellerOpen, setResellerOpen] = useState(false)

  // =============================
  // MENU STRUCTURE
  // =============================

  const menuItems: MenuItem[] = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      exact: true,
      isDropdown: false,
    },
    {
      label: "IPTV",
      icon: Tv,
      isDropdown: true,
      subItems: [
        { href: "/dashboard/iptv/starshare", label: "StarShare" },
        { href: "/dashboard/iptv/5glive", label: "5GLive" },
        { href: "/dashboard/iptv/fiberstream", label: "Fiber Stream" },
        { href: "/dashboard/iptv/trex", label: "Trex" },
        { href: "/dashboard/iptv/king365", label: "King 365" },
        { href: "/dashboard/iptv/slytv", label: "Sly TV" },
        { href: "/dashboard/iptv/altas", label: "Altas" },
        { href: "/dashboard/iptv/b1g", label: "B1G" },
        { href: "/dashboard/iptv/opplex", label: "Opplex" },
        { href: "/dashboard/iptv/boss", label: "Boss" },
        { href: "/dashboard/iptv/geo", label: "Geo" },
        { href: "/dashboard/iptv/ironpro", label: "Iron Pro" },
        { href: "/dashboard/iptv/apollo", label: "Apollo" },
        { href: "/dashboard/iptv/avtar", label: "Avtar" },
      ],
    },
    {
      label: "Servers",
      icon: Server,
      isDropdown: true,
      subItems: [
        { href: "/dashboard/servers/apolloplusforever", label: "Apollo + Forever" },
        { href: "/dashboard/servers/viprecharge", label: "VIP Recharge" },
        { href: "/dashboard/servers/apolloserver", label: "Apollo" }, 
        { href: "/dashboard/servers/foreveriks", label: "Forever IKS" }, 
        { href: "/dashboard/servers/funcam", label: "Funcam" },
        { href: "/dashboard/servers/gshare", label: "GShare" },
        { href: "/dashboard/servers/nasharecodes", label: "Nashare Codes" },
        { href: "/dashboard/servers/mars", label: "Mars" },
        { href: "/dashboard/servers/netfly", label: "Netfly" },
        { href: "/dashboard/servers/mgcam", label: "MGcam" },
        { href: "/dashboard/servers/cccam", label: "CCcam" },
      ],
    },
    {
      label: "Reseller",
      icon: ShoppingCart,
      isDropdown: true,
      subItems: [
        { href: "/dashboard/reseller/metamango", label: "Metamango" },
        { href: "/dashboard/reseller/iptvreseller", label: "IPTV Reseller" },
      ],
    },
    {
      href: "/dashboard/blog",
      icon: BookOpen,
      label: "Blog",
      isDropdown: false,
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      label: "Settings",
      isDropdown: false,
    },
  ]

  // ACTIVE DETECTION
  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  // checks which dropdown should highlight
  const isIptvActive = () => pathname.startsWith("/dashboard/iptv")
  const isResellerActive = () => pathname.startsWith("/dashboard/reseller")

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-card border-r border-border transition-all duration-300 flex flex-col`}
      >
        {/* Logo & toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <img
            src="/playrix.png"
            alt="Playrix"
            className={`h-8 ${sidebarOpen ? "w-auto" : "w-8"}`}
          />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => {
            // =============================
            // DROPDOWN MENU
            // =============================
            if (item.isDropdown) {
              const Icon = item.icon

              // determine which dropdown this is
              const isIPTV = item.label === "IPTV"
              const isRES = item.label === "Reseller"

              const active = isIPTV ? isIptvActive() : isResellerActive()
              const open = isIPTV ? iptvOpen : resellerOpen
              const toggleOpen = () =>
                isIPTV ? setIptvOpen(!iptvOpen) : setResellerOpen(!resellerOpen)

              return (
                <div key={index}>
                  <button
                    onClick={toggleOpen}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      {sidebarOpen && (
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      )}
                    </div>

                    {sidebarOpen && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Submenu */}
                  {sidebarOpen && open && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-4">
                      {item.subItems.map((sub) => {
                        const subActive = isActive(sub.href)
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                              subActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            // =============================
            // NORMAL MENU
            // =============================
            const Icon = item.icon
            const active = isActive(item.href, item.exact ?? false)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-destructive hover:bg-destructive/10 transition-all duration-200 ${
              !sidebarOpen && "justify-center"
            }`}
          >
            <LogOut size={20} />
            {sidebarOpen && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-card border-b border-border flex items-center px-6">
          <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
