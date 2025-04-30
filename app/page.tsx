"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Github,
  Linkedin,
  Calendar,
  FileText,
  Smartphone,
  Cloud,
  Server,
  Container,
  Shield,
  LineChart,
  Workflow,
  Code,
} from "lucide-react"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import SocialIcon from "@/components/social-icon"
import { Button } from "@/components/ui/button"
import AboutMe from "@/components/about-me"
import Loading from "@/components/loading"
import InteractiveShapes from "@/components/InteractiveShapes"
import AnimatedBoxes from "@/components/AnimatedBoxes"
import CollaborativeProjectCard from "@/components/collaborative-project-card"
import { useTranslation } from "@/context/language-context"
// First, import the CareerTimeline component at the top with the other imports
import CareerTimeline from "@/components/career-timeline"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  // Traducciones
  const t = useTranslation

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000) // Show loading for 2 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null
  if (loading) return <Loading />

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("submitting")

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch("https://formspree.io/f/movdjvrl", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setFormStatus("success")
        // Resetear el formulario
        e.currentTarget.reset()
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      setFormStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-[#01161E] text-white overflow-hidden">
      <CustomCursor />
      <Navbar />
      <InteractiveShapes />

      {/* Hero Section with Animated Boxes */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBoxes />
        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-[#e04000]">{t("hero.greeting")}</h1>
            <h2 className="text-xl md:text-2xl mb-8 text-gray-300">🚀 {t("hero.title")}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                {t("hero.cta.projects")}
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-2 border-purple-500 text-white hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                {t("hero.cta.contact")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-[#01161E] to-[#022535]">
        <AboutMe />
      </section>

      {/* Career Path Section */}
      <section id="career" className="py-20 bg-[#022535]">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {t("career.title")}
              </span>
              <span className="ml-2 text-white">🏔️</span>
            </h2>
            <p className="text-gray-400 text-center mb-12">{t("career.subtitle")}</p>

            <CareerTimeline />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#01161E]">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {t("services.title")}
              </span>
              <span className="ml-2 text-white">🛠️</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                icon={<Cloud className="w-10 h-10 text-blue-500" />}
                title={t("services.cloud.title")}
                description={t("services.cloud.description")}
              />
              <ServiceCard
                icon={<Server className="w-10 h-10 text-cyan-500" />}
                title={t("services.devops.title")}
                description={t("services.devops.description")}
              />
              <ServiceCard
                icon={<Container className="w-10 h-10 text-blue-500" />}
                title={t("services.container.title")}
                description={t("services.container.description")}
              />
              <ServiceCard
                icon={<Shield className="w-10 h-10 text-cyan-500" />}
                title={t("services.security.title")}
                description={t("services.security.description")}
              />
              <ServiceCard
                icon={<LineChart className="w-10 h-10 text-blue-500" />}
                title={t("services.monitoring.title")}
                description={t("services.monitoring.description")}
              />
              <ServiceCard
                icon={<Workflow className="w-10 h-10 text-cyan-500" />}
                title={t("services.automation.title")}
                description={t("services.automation.description")}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personal Projects Section */}
      <section id="work" className="py-20 bg-gradient-to-b from-[#022535] to-[#01161E]">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {t("projects.title")}
              </span>
              <span className="ml-2 text-white">🏗️</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                title={t("projects.blog.title")}
                description={t("projects.blog.description")}
                tags={["Next.js", "Firebase", "Arweave", "Web3"]}
                icon={<Code className="w-6 h-6 text-purple-400" />}
              />
              <ProjectCard
                title={t("projects.bridge.title")}
                description={t("projects.bridge.description")}
                tags={["Cross-Chain", "Interoperability", "DeFi"]}
                icon={<Code className="w-6 h-6 text-purple-400" />}
              />
              <ProjectCard
                title={t("projects.identity.title")}
                description={t("projects.identity.description")}
                tags={["DID", "Identity", "Blockchain"]}
                icon={<Code className="w-6 h-6 text-purple-400" />}
              />
              <ProjectCard
                title={t("projects.generator.title")}
                description={t("projects.generator.description")}
                tags={["Solidity", "Smart Contracts", "Development"]}
                icon={<Code className="w-6 h-6 text-purple-400" />}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collaborative Projects Section */}
      <section id="collaborative" className="py-20 bg-[#01161E]">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {t("collaborative.title")}
              </span>
              <span className="ml-2 text-white">👥</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CollaborativeProjectCard
                title={t("collaborative.hiperme.title")}
                description={t("collaborative.hiperme.description")}
                imageSrc="/images/projects/hiperpbx-app.png"
                technologies={["HTML", "CSS", "JavaScript"]}
                repoUrl="https://github.com/hiperme"
                previewUrl="https://hiperme.com"
              />
              <CollaborativeProjectCard
                title={t("collaborative.contact.title")}
                description={t("collaborative.contact.description")}
                imageSrc="/images/projects/hiperme-app.png"
                technologies={["HTML", "CSS", "JavaScript", "Playwright", "Grafana", "k6", "Docker", "Prometheus"]}
                repoUrl="https://github.com/contact-center"
              />
              <CollaborativeProjectCard
                title={t("collaborative.i66.title")}
                description={t("collaborative.i66.description")}
                imageSrc="/images/projects/i66-logo.png"
                technologies={["Microsoft Dynamics", "Asterisk", "API REST", "Gantt"]}
                previewUrl="https://ride66express.com"
                isLogo={true}
              />
              <CollaborativeProjectCard
                title={t("collaborative.ministerio.title")}
                description={t("collaborative.ministerio.description")}
                imageSrc="/images/projects/ministerio-logo.png"
                technologies={["Asterisk", "Zoho Projects", "GDMS"]}
                previewUrl="https://www.argentina.gob.ar/ambiente"
                isLogo={true}
                zoomLevel={1.5}
              />
              <CollaborativeProjectCard
                title={t("collaborative.pedidosya.title")}
                description={t("collaborative.pedidosya.description")}
                imageSrc="/images/projects/pedidosya-logo.png"
                technologies={["Asterisk", "Huawei Cloud", "Bitrix24", "HiperMe", "Linux", "Firebase"]}
                previewUrl="https://www.pedidosya.com"
                isLogo={true}
                zoomLevel={1.2}
                bgColor="#EC4348" // Color rojo de PedidosYa
              />
              <CollaborativeProjectCard
                title={t("collaborative.fravega.title")}
                description={t("collaborative.fravega.description")}
                imageSrc="/images/projects/fravega-logo.png"
                technologies={["Asterisk", "Zoho Projects", "GDMS"]}
                previewUrl="https://www.fravega.com"
                isLogo={true}
                whiteBg={true}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-[#01161E] to-[#022535]">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {t("contact.title")}
              </span>
              <span className="ml-2 text-white">🚀</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-[#022535] p-6 rounded-lg border border-gray-800">
                <form
                  className="space-y-4"
                  onSubmit={handleSubmit}
                  action="https://formspree.io/f/movdjvrl"
                  method="POST"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 block w-full rounded-md bg-[#032e41] border-gray-700 text-white px-4 py-3"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                      {t("contact.form.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full rounded-md bg-[#032e41] border-gray-700 text-white px-4 py-3"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="mt-1 block w-full rounded-md bg-[#032e41] border-gray-700 text-white px-4 py-3"
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-70"
                  >
                    {formStatus === "submitting" ? t("contact.form.submitting") : t("contact.form.submit")}
                  </Button>

                  {formStatus === "success" && (
                    <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-md text-green-400 text-center">
                      {t("contact.form.success")}
                    </div>
                  )}

                  {formStatus === "error" && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-400 text-center">
                      {t("contact.form.error")}
                    </div>
                  )}
                </form>
                <div className="mt-6 text-center">
                  <p className="text-gray-400 mb-2">{t("contact.meeting")}</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                      href="https://calendly.com/boreikobrian/talkwithme"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {t("contact.meeting.schedule")}
                    </a>
                    <a
                      href="https://drive.google.com/file/d/1Prtj5UBWzvVys8TviXZL-yN_551cRQJQ/view"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {t("contact.cv")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with Social Links */}
      <footer className="py-12 bg-gradient-to-t from-[#022535] to-[#01161E]">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <SocialIcon icon={<Github />} href="https://github.com/boreikobrian" label="GitHub" />
            <SocialIcon icon={<Linkedin />} href="https://linkedin.com/in/boreikobrian" label="LinkedIn" />
            <SocialIcon
              icon={<Smartphone />}
              href="#"
              label="Mobile Apps"
              className="opacity-50 cursor-not-allowed"
              onClick={(e) => {
                e.preventDefault()
                console.log("Mobile icon click prevented")
              }}
            />
          </div>
          <div className="text-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} Brian Boreiko. {t("footer.rights")}
            </p>
            <ContactEmail />
          </div>
        </div>
      </footer>
    </div>
  )
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg bg-[#022535] border border-gray-800 hover:border-purple-500 transition-all duration-300 text-center md:text-left">
      <div className="mb-4 flex justify-center md:justify-start">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function ProjectCard({ title, description, tags, image, icon }) {
  return (
    <div className="p-6 rounded-lg bg-[#022535] border border-gray-800 hover:border-purple-500 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {icon && <div>{icon}</div>}
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function ContactEmail() {
  return (
    <div className="mt-2">
      <a href="mailto:boreikobrian@gmail.com" className="text-purple-400 hover:text-purple-300">
        boreikobrian@gmail.com
      </a>
    </div>
  )
}
