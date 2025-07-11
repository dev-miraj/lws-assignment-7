"use client";

import Header from "../../components/Header";
import MarqueeBanner from "../../components/MarqueeBanner";
import { useRouter, useParams, notFound } from "next/navigation";
import { useState, useEffect } from "react";

export default function NewsDetailsPage() {
  const params = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(newsArray => {
        const found = newsArray.find(n => n.id == params.id || n.article_id == params.id);
        setNews(found);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return null;
  if (!news) return notFound();

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper to calculate read time
  const getReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content ? content.split(" ").length : 0;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime < 1 ? 1 : readTime;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <MarqueeBanner />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-3">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal font-serif leading-tight mb-6">
                {news.title}
              </h1>
            </header>
            {/* Article Image */}
            <div className="mb-8">
              <img
                src={news.image || news.image_url || "/assets/articles/article-1.jpg"}
                alt={news.title}
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {((news.content || news.description || "").split("\n")).map((para, idx) => (
                <p key={idx} className="text-lg leading-relaxed mb-6">
                  {para}
                </p>
              ))}
            </div>
            {/* Social Actions */}
            <div className="flex items-center space-x-6 mb-8 mt-8">
              <button className="flex items-center space-x-2 text-sm hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 text-sm hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>Bookmark</span>
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{getReadTime(news.content)} min read</span>
              </div>
            </div>
          </article>
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6 text-right lg:text-left">
              {/* Author Info */}
              <div>
                <h3 className="text-lg font-medium font-serif mb-2">{news.author}</h3>
                <p className="text-sm text-gray-600 mb-4">{formatDate(news.published_at)}</p>
              </div>
              {/* Comments */}
              <div>
                <p className="text-lg font-medium mb-2">38 comments</p>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Join the discussion
                </a>
              </div>
              {/* Category */}
              <div>
                <p className="text-sm text-gray-600 mb-1">Category</p>
                <p className="font-medium">
                  {news.category && news.category.length > 0
                    ? Array.isArray(news.category)
                      ? news.category[0].charAt(0).toUpperCase() + news.category[0].slice(1)
                      : news.category.charAt(0).toUpperCase() + news.category.slice(1)
                    : "General"}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
