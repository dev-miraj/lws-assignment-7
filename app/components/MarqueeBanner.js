"use client"

import { useLanguage } from "../contexts/LanguageContext"

export default function MarqueeBanner() {
  return (
    <div className="bg-black text-white py-3 overflow-hidden">
      <div className="marquee whitespace-nowrap">
        <span className="text-sm">Breaking News → Climate Summit Reaches Historic Agreement. Tech Giants Announce AI Safety Protocols. Global Markets Show Strong Recovery Signs.</span>
      </div>
    </div>
  )
}
