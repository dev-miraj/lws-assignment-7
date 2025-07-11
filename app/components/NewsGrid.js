"use client"

import { useState, useEffect } from "react"
import NewsCard from "./NewsCard"
import { useLanguage } from "../contexts/LanguageContext"
import Link from "next/link"
import FeaturedStory from "./FeaturedStory"

export default function NewsGrid() {
  const [newsData, setNewsData] = useState([])
  const { t } = useLanguage()

  useEffect(() => {
    const loadNewsData = async () => {
      try {
        const response = await fetch("/data.json")
        const newsArray = await response.json()
        setNewsData(newsArray)
      } catch (error) {
        console.error("Error loading news data:", error)
      }
    }
    loadNewsData()
  }, [])

  if (!newsData.length) {
    return <div className="text-center py-8">{t.loading}</div>
  }

  // Separate featured and latest stories
  const [featured, ...latest] = newsData

  // Helper to get the correct news id for links
  const getNewsId = (news) => news?.id || news?.article_id || null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Featured Story Section */}
      <section className="mb-12">
        <FeaturedStory news={featured} />
      </section>

      {/* Latest Stories Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Latest Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((news, index) => (
          <NewsCard key={news.id || news.article_id || index} news={{
            ...news,
            image: news.image || news.image_url
          }} index={index} />
        ))}
      </div>
      </section>
    </div>
  )
}
