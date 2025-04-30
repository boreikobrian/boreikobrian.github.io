"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { Globe } from "lucide-react"

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleLanguage = (lang: "es" | "en" | "pt") => {
    setLanguage(lang)
    setIsOpen(false)
  }

  // Mapa de nombres de idiomas
  const languageNames = {
    es: "Español",
    en: "English",
    pt: "Português",
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-300"
        aria-label="Seleccionar idioma"
      >
        <Globe size={18} />
        <span className="uppercase">{language}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-28 bg-[#022535] border border-gray-700 rounded-md shadow-lg overflow-hidden z-50"
          >
            <button
              onClick={() => toggleLanguage("es")}
              className={`w-full text-left px-4 py-2 text-sm ${
                language === "es" ? "bg-purple-500/20 text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {languageNames.es}
            </button>
            <button
              onClick={() => toggleLanguage("en")}
              className={`w-full text-left px-4 py-2 text-sm ${
                language === "en" ? "bg-purple-500/20 text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {languageNames.en}
            </button>
            <button
              onClick={() => toggleLanguage("pt")}
              className={`w-full text-left px-4 py-2 text-sm ${
                language === "pt" ? "bg-purple-500/20 text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {languageNames.pt}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
