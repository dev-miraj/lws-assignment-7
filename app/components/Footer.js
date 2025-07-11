"use client"

import { useLanguage } from "../contexts/LanguageContext"

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-600">
          {t.footer?.copyright} <a href="https://learnwithsumit.com/" title="Learn with Sumit" className="text-gray-600 hover:underline">Learn with Sumit</a>. {t.footer?.allRightsReserved}
        </p>
      </div>
    </footer>
  )
}
