import "./globals.css"
import { LanguageProvider } from "./contexts/LanguageContext"

export const metadata = {
  title: "The News Island | Assignment 7",
  description: "A news website built with Next.js",
}

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/favicon.png" type="image/x-icon" />
      </head>
      <body className="bg-gray-50 text-black">
        <LanguageProvider>
          {/* Header/Navbar placeholder */}
          {children}
          {modal}
          {/* Footer placeholder */}
        </LanguageProvider>
      </body>
    </html>
  )
}
