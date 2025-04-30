"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Github, Linkedin, Calendar } from "lucide-react"
import { useLanguage, useTranslation } from "@/context/language-context"
import LanguageSelector from "@/components/language-selector"

export default function Navbar() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Obtener traducciones para los elementos de navegación
  const navItems = [
    { name: useTranslation("nav.home"), href: "#home" },
    { name: useTranslation("nav.about"), href: "#about" },
    { name: useTranslation("nav.services"), href: "#services" },
    { name: useTranslation("nav.projects"), href: "#work" },
    { name: useTranslation("nav.collaborative"), href: "#collaborative" },
    { name: useTranslation("nav.contact"), href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const elem = document.getElementById(targetId)
    elem?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 5 },
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#01161E]/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="#home" className="text-2xl font-bold text-white" onClick={(e) => scrollToSection(e, "#home")}>
          Brian Boreiko<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
              onClick={(e) => scrollToSection(e, link.href)}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <LanguageSelector />
          <motion.a
            href="https://calendly.com/boreikobrian/talkwithme"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
            aria-label="Schedule a meeting"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Calendar size={24} />
          </motion.a>
          <motion.a
            href="https://github.com/boreikobrian"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
            aria-label="GitHub"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Github size={24} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/brianboreiko"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
            aria-label="LinkedIn"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Linkedin size={24} />
          </motion.a>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <LanguageSelector />
          <motion.a
            href="https://calendly.com/boreikobrian/talkwithme"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
            aria-label="Schedule a meeting"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Calendar size={24} />
          </motion.a>
          <motion.a
            href="https://github.com/boreikobrian"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
            aria-label="GitHub"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Github size={24} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/boreikobrian"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
            aria-label="LinkedIn"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Linkedin size={24} />
          </motion.a>
          <button className="text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#01161E]/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="container mx-auto px-4 py-4"
            >
              {navItems.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center mb-4"
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white py-2 transition-colors duration-300 text-lg"
                    onClick={(e) => scrollToSection(e, link.href)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
