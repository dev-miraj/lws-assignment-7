import Header from "./components/Header"
import MarqueeBanner from "./components/MarqueeBanner"
import NewsGrid from "./components/NewsGrid"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MarqueeBanner />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <NewsGrid />
      </main>
      <Footer />
    </div>
  )
}
