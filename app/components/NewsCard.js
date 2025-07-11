"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewsCard({ news }) {
  const router = useRouter();
  const getImageSrc = (img) => {
    if (!img) return "/assets/articles/article-1.jpg";
    if (img.startsWith("http")) return img;
    return `/assets/articles/${img}`;
  };
  const getAvatarSrc = (avatar) => {
    if (!avatar) return "/assets/avatar/avatar-1.png";
    if (avatar.startsWith("http")) return avatar;
    return `/assets/avatar/${avatar}`;
  };
  const cardData = {
    image: getImageSrc(news.image),
    category: Array.isArray(news.category) ? news.category[0] : news.category || "General",
    readTime: news.readTime || "3 min read",
    title: news.title,
    description: news.description,
    avatar: getAvatarSrc(news.avatar),
    author: news.author,
    time: news.published_at || news.pubDate || "",
  }
  // Helper to get the correct news id for links
  const getNewsId = (news) => news?.id || news?.article_id || null;

  const id = getNewsId(news);
  const handleCardClick = (e) => {
    e.preventDefault();
    if (id) router.push(`/news/${id}`, { scroll: false });
  };
  return (
    <a href={id ? `/news/${id}` : "#"} onClick={handleCardClick} className="block">
    <article
        className="bg-white rounded-lg shadow-sm overflow-hidden news-card flex flex-col cursor-pointer min-h-[340px] h-full"
    >
        <div className="w-full aspect-[16/9] bg-gray-100 overflow-hidden">
        <img 
          src={cardData.image} 
          alt={cardData.title}
            className="w-full h-full object-cover"
        />
      </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded capitalize">
            {cardData.category}
          </span>
          <span className="text-xs text-gray-500">
            {cardData.readTime}
          </span>
        </div>
          <h3 className="text-xl font-medium mb-3 leading-tight line-clamp-2">
          {cardData.title}
        </h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
          {cardData.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden">
              <img 
                src={cardData.avatar} 
                alt={cardData.author}
                className="w-full h-full object-cover"
              />
            </div>
              <span className="text-xs text-gray-500">{cardData.author}</span>
          </div>
          <span className="text-xs text-gray-400">
            {cardData.time ? new Date(cardData.time).toLocaleDateString() : ""}
          </span>
        </div>
      </div>
    </article>
    </a>
  )
}
