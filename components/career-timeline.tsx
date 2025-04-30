"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Briefcase } from "lucide-react"
import { useTranslation } from "@/context/language-context"

interface JobPosition {
  title: string
  company: string
  period: string
  location: string
  type: string
  skills: string[]
  logo?: string
}

export default function CareerTimeline() {
  const t = useTranslation

  const positions: JobPosition[] = [
    {
      title: t("career.position1.title"),
      company: t("career.position1.company"),
      period: "2020 - 2022",
      location: "Buenos Aires, Argentina",
      type: t("career.fulltime"),
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    },
    {
      title: t("career.position2.title"),
      company: t("career.position2.company"),
      period: "2022 - 2023",
      location: "Buenos Aires, Argentina",
      type: t("career.fulltime"),
      skills: ["GCP", "CI/CD", "Python", "Ansible"],
    },
    {
      title: t("career.position3.title"),
      company: t("career.position3.company"),
      period: "2023 - " + t("career.present"),
      location: "Buenos Aires, Argentina",
      type: t("career.fulltime"),
      skills: ["AWS", "Huawei Cloud", "Kubernetes", "Terraform"],
    },
  ]

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>

      {positions.map((position, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className={`relative mb-16 flex ${
            index % 2 === 0 ? "flex-row" : "flex-row-reverse"
          } items-center justify-center`}
        >
          {/* Timeline dot */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 z-10"></div>

          {/* Content */}
          <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
            <div
              className={`p-6 rounded-lg bg-[#022535] border border-gray-800 hover:border-purple-500 transition-all duration-300 ${
                index % 2 === 0 ? "ml-auto" : "mr-auto"
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  {position.logo ? (
                    <img
                      src={position.logo || "/placeholder.svg"}
                      alt={position.company}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <Briefcase className="w-6 h-6 text-purple-400" />
                  )}
                </div>
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <h3 className="text-xl font-bold text-white">{position.title}</h3>
                  <p className="text-purple-400">{position.company}</p>
                </div>
              </div>

              <div className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"} gap-4 mb-3 text-gray-400`}>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{position.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{position.location}</span>
                </div>
              </div>

              <div className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"} gap-2 mb-3`}>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">{position.type}</span>
              </div>

              <div className={`flex flex-wrap ${index % 2 === 0 ? "justify-end" : "justify-start"} gap-2`}>
                {position.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Empty space for the other side */}
          <div className="w-5/12"></div>
        </motion.div>
      ))}
    </div>
  )
}
