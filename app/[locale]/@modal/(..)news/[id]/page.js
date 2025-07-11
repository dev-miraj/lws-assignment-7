"use client"

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

export default function ModalNewsDetails() {
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

  const getReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(' ').length || 0;
    const time = Math.ceil(wordCount / wordsPerMinute);
    return `${time < 1 ? 1 : time} min read`;
  };
  

  if (!news) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 h-screen z-50"
      onClick={() => router.back()}
    >
      <article 
        className="max-w-4xl mx-auto h-screen px-4 pb-8 bg-white text-black rounded-md shadow-lg relative z-50 mt-8 overflow-scroll"
        onClick={e => e.stopPropagation()}
      >
        {/* Article Header */}
        <header className="mb-8 sticky top-0 bg-white z-10 pt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6">
            {news.title}
          </h1>
        </header>

        {/* Article Image */}
        <div className="mb-8">
          <img 
            src={news.image || news.image_url || '/assets/articles/article-1.jpg'} 
            alt={news.title}
            className="w-full h-auto rounded-lg shadow-sm"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          {(news.content || '').split('\n').map((para, idx) => (
            <p key={idx} className="text-lg leading-relaxed mb-6">
              {para}
            </p>
          ))}
        </div>

        {/* Social Actions */}
        <div className="flex items-center space-x-6 mb-8">
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
            <span>{getReadTime(news.content)}</span>
          </div>
        </div>
      </article>
    </div>
  );
} 
