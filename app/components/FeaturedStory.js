import Link from "next/link";

export default function FeaturedStory({ news }) {
  if (!news) return null;
  const getNewsId = (n) => n?.id || n?.article_id || null;
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden news-card">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: Text Content */}
        <div className="order-2 lg:order-1 p-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="px-3 py-1 bg-black text-white text-xs rounded-full">Featured</span>
            <span className="text-sm text-gray-600">{news.readTime || '5 min read'}</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-normal leading-tight mb-4">
            {news.title}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {news.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                <img src={news.avatar || '/assets/avatar/avatar-1.png'} alt={news.author} />
              </div>
              <div>
                <p className="text-sm font-medium">{news.author}</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <Link
              href={getNewsId(news) ? `/news/${getNewsId(news)}` : '#'}
              scroll={false}
              className="text-sm hover:text-gray-600 transition-colors"
            >Read more →</Link>
          </div>
        </div>
        {/* Right: Image */}
        <div className="order-1 lg:order-2">
          <img src={news.image || news.image_url || '/assets/images/8400a044-9788-42d9-abe8-6c3c865d36db.png'} alt={news.title} className="w-full h-64 lg:h-full object-cover" />
        </div>
      </div>
    </article>
  );
}
