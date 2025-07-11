"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
        <Link href="/" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
