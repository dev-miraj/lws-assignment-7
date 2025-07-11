"use client"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-2">News Not Found</h2>
      <p className="text-gray-500">Sorry, the news article you are looking for does not exist.</p>
    </div>
  );
}
