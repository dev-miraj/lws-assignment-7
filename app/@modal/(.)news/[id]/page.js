"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function NewsModal() {
  const router = useRouter();
  const params = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(newsArray => {
        const found = newsArray.find(n => n.id == params.id || n.article_id == params.id);
        setNews(found);
      });
  }, [params.id]);

  if (!news) return null;

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

  // Overlay click: go to full page
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      router.push(`/news/${params.id}`);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 h-screen z-50 overflow-y-auto modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <article
        className="max-w-4xl mx-auto h-auto px-4 pb-8 bg-white text-black rounded-md shadow-lg relative z-50 mt-8 mb-8 modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Article Header */}
        <header className="mb-8 bg-white z-10 pt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6">
            {news.title}
          </h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="px-3 py-1 bg-black text-white text-xs rounded-full capitalize">
              {Array.isArray(news.category) ? news.category[0] : news.category}
            </span>
            <span className="text-sm text-gray-600">{getReadTime(news.content)} min read</span>
          </div>
        </header>

        {/* Article Image */}
        <div className="mb-8">
          <img
            src={news.image?.startsWith("http") ? news.image : `/assets/articles/${news.image || "article-1.jpg"}`}
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

        {/* Author Info */}
        <div className="flex items-center space-x-3 mt-8">
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            <img
              src={news.avatar?.startsWith("http") ? news.avatar : `/assets/avatar/${news.avatar || "avatar-1.png"}`}
              alt={news.author}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium">{news.author}</p>
            <p className="text-xs text-gray-500">
              {formatDate(news.published_at)}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
