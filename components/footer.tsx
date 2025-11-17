'use client';

import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react'
import { FaTelegramPlane, FaTiktok } from 'react-icons/fa'
import Image from 'next/image'

export default function Footer() {
  const socialLinks = [
    {
      label: 'Facebook',
      icon: Facebook,
      href: 'https://www.facebook.com/people/Playrix-Sky/pfbid024Lk28ZvFGzJMB21PYGssxRRauaxiE64h7jowk2S5jzFQJqKFHApFyQQaF5jcUimNl/',
    },
    {
      label: 'Telegram',
      icon: FaTelegramPlane,
      href: 'https://t.me/yourchannel'
    },
    {
      label: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/playrixsky/?igsh=MXJoMjVoMWU5OWR1cw%3D%3D#', 
    },
    {
      label: 'TikTok',
      icon: FaTiktok,
      href: 'https://www.tiktok.com/@playrix.sky?_r=1&_t=ZS-910cHR3C1cW',
    },
  ]

  return (
    <footer className="border-t border-border bg-foreground/5">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">

          <div>
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/playrix.png"
                alt="Playrix Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-foreground/60">
              Premium IPTV services with world class streaming quality and support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              {['Home', 'All Products','Blog', 'Contact Us', 'About Us'].map((link) => (
                <li key={link}>
                  <a href="#" className="transition-colors hover:text-accent">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Contact Us</h4>
            <ul className="space-y-3 text-sm text-foreground/60">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                +92-303-3996000
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                contact@playrix.pk
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                Pakistan
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Follow Us</h4>
            <div className="flex gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-border transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-foreground/60 md:flex-row">
            <p>&copy; 2025 Playrix. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-accent">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-accent">
                Terms & Conditions
              </a>
              <a href="#" className="transition-colors hover:text-accent">
                Legal Notice
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
