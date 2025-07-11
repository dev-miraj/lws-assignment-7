"use client"

import { createContext, useContext, useState, useEffect } from "react"

const LanguageContext = createContext()

const translations = {
  en: {
    siteTitle: "The News Island",
    loading: "Loading...",
    featured: "Featured",
    latestStories: "Latest Stories",
    readMore: "Read more",
    minRead: "min read",
    justNow: "Just now",
    oneHourAgo: "1 hour ago",
    hoursAgo: "{hours} hours ago",
    oneDayAgo: "1 day ago",
    daysAgo: "{days} days ago",
    breakingNews: "Breaking News → Climate Summit Reaches Historic Agreement. Tech Giants Announce AI Safety Protocols. Global Markets Show Strong Recovery Signs.",
    nav: {
      world: "World",
      business: "Business",
      lifestyle: "Lifestyle"
    },
    footer: {
      copyright: "© 2025",
      allRightsReserved: "All rights reserved."
    }
  },
  bn: {
    siteTitle: "দ্য নিউজ আইল্যান্ড",
    loading: "লোড হচ্ছে...",
    featured: "বৈশিষ্ট্যযুক্ত",
    latestStories: "সর্বশেষ গল্প",
    readMore: "আরও পড়ুন",
    minRead: "মিনিট পড়া",
    justNow: "এইমাত্র",
    oneHourAgo: "১ ঘন্টা আগে",
    hoursAgo: "{hours} ঘন্টা আগে",
    oneDayAgo: "১ দিন আগে",
    daysAgo: "{days} দিন আগে",
    breakingNews: "ব্রেকিং নিউজ → জলবায়ু শীর্ষ সম্মেলনে ঐতিহাসিক চুক্তি। টেক জায়ান্টরা এআই নিরাপত্তা প্রোটোকল ঘোষণা করেছে। বিশ্ব বাজার শক্তিশালী পুনরুদ্ধারের লক্ষণ দেখাচ্ছে।",
    nav: {
      world: "বিশ্ব",
      business: "ব্যবসা",
      lifestyle: "জীবনধারা"
    },
    footer: {
      copyright: "© ২০২৫",
      allRightsReserved: "সর্বস্বত্ব সংরক্ষিত।"
    }
  }
}

export function LanguageProvider({ children, initialLocale }) {
  const [language, setLanguage] = useState(initialLocale || "en")

  useEffect(() => {
    // Auto-detect browser language preference if no initial locale is provided
    if (!initialLocale) {
      const browserLang = navigator.language.split("-")[0]
      if (browserLang === "bn") {
        setLanguage("bn")
      }
    }
  }, [initialLocale])

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "bn" : "en")
  }

  const t = translations[language] || translations["en"];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
