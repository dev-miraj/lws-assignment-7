"use client"

import { useLanguage } from "../contexts/LanguageContext"

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left section with logo and title */}
        <div className="flex gap-2 items-center">
          <a href="/" className="flex items-center">
            <img src="/assets/logo.png" alt="Logo" className="w-8 h-8 inline-block mr-2" />
            <h1 className="text-xl font-bold tracking-wider">{t.siteTitle}</h1>
          </a>
        </div>
        <div className="flex items-center space-x-6">
          {/* Subscriber Button */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-podcast-icon lucide-podcast"><path d="M16.85 18.58a9 9 0 1 0-9.7 0"/><path d="M8 14a5 5 0 1 1 8 0"/><circle cx="12" cy="11" r="1"/><path d="M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z"/></svg>
            </div>
            <span className="text-sm font-medium">5,810</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm hover:text-gray-600 transition-colors">{t.nav.world}</a>
            <a href="#" className="text-sm hover:text-gray-600 transition-colors">{t.nav.business}</a>
            <a href="#" className="text-sm hover:text-gray-600 transition-colors">{t.nav.lifestyle}</a>
            {/* Language Switcher */}
            <div className="flex items-center space-x-2 text-sm">
              <button 
                className={`px-2 py-1 rounded transition-colors ${language === 'en' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                onClick={() => language !== 'en' && toggleLanguage()}
              >EN</button>
              <span className="text-gray-400">|</span>
              <button 
                className={`px-2 py-1 rounded transition-colors ${language === 'bn' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                onClick={() => language !== 'bn' && toggleLanguage()}
              >বাং</button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
