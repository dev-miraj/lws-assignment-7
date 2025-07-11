import { LanguageProvider } from "../contexts/LanguageContext"

export default function LocaleLayout({ children, modal, params }) {
  return (
    <LanguageProvider initialLocale={params.locale}>
      {children}
      {modal}
    </LanguageProvider>
  )
}