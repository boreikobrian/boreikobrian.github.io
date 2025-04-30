"use client"

import Image from "next/image"
import { useTranslation } from "@/context/language-context"

interface TechBadgeProps {
  name: string
  color?: string
}

const TechBadge = ({ name, color = "bg-blue-500/20" }: TechBadgeProps) => (
  <span className={`text-xs px-2 py-1 rounded-full ${color} text-white`}>{name}</span>
)

interface CollaborativeProjectCardProps {
  title: string
  description: string
  imageSrc: string
  technologies: string[]
  repoUrl?: string
  previewUrl?: string
  isLogo?: boolean
  whiteBg?: boolean
  zoomLevel?: number
  bgColor?: string
}

export default function CollaborativeProjectCard({
  title,
  description,
  imageSrc,
  technologies,
  repoUrl,
  previewUrl,
  isLogo = false,
  whiteBg = false,
  zoomLevel = 1,
  bgColor,
}: CollaborativeProjectCardProps) {
  // Corregido: useTranslation devuelve directamente la función de traducción
  const t = useTranslation

  // Mapa de colores para diferentes tecnologías
  const getTechColor = (tech: string) => {
    const techColors: Record<string, string> = {
      HTML: "bg-orange-500/30",
      CSS: "bg-blue-500/30",
      JavaScript: "bg-yellow-500/30",
      Docker: "bg-blue-600/30",
      k6: "bg-purple-500/30",
      Grafana: "bg-orange-400/30",
      Playwright: "bg-green-600/30",
      Prometheus: "bg-red-500/30",
      "Microsoft Dynamics": "bg-blue-700/30",
      Asterisk: "bg-red-600/30",
      "API REST": "bg-green-500/30",
      Gantt: "bg-purple-600/30",
      "Zoho Projects": "bg-blue-400/30",
      GDMS: "bg-cyan-500/30",
      "Huawei Cloud": "bg-red-500/30",
      Bitrix24: "bg-blue-500/30",
      HiperMe: "bg-green-500/30",
      Linux: "bg-yellow-600/30",
      Firebase: "bg-orange-500/30",
    }

    return techColors[tech] || "bg-gray-500/30"
  }

  // Determinar el estilo de fondo
  let bgStyle = {}
  if (whiteBg) {
    bgStyle = { backgroundColor: "white" }
  } else if (bgColor) {
    bgStyle = { backgroundColor: bgColor }
  }

  return (
    <div className="p-6 rounded-lg bg-[#022535] border border-gray-800 hover:border-purple-500 transition-all duration-300 flex flex-col h-full">
      <div
        className={`mb-4 overflow-hidden rounded-lg ${isLogo ? "flex items-center justify-center p-4 h-48" : "aspect-video"} relative ${
          whiteBg || bgColor ? "" : "bg-white/5"
        }`}
        style={bgStyle}
      >
        {isLogo ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={title}
              className={`object-contain rounded-lg`}
              style={{ transform: `scale(${zoomLevel})` }}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-500 hover:scale-105 rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>

      <p className="text-gray-400 mb-4 flex-grow">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <TechBadge key={index} name={tech} color={getTechColor(tech)} />
        ))}
      </div>
    </div>
  )
}
