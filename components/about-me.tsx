"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslation } from "@/context/language-context"

export default function AboutMe() {
  const t = useTranslation

  return (
    <div className="container px-4 mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            {t("about.title")}
          </span>
          <span className="ml-2">☕💻</span>
        </h2>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
          <div className="md:w-1/3">
            <div className="relative w-64 h-64 mx-auto">
              <div className="w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-blue-700/30 p-0">
                <Image
                  src="/images/profile.png"
                  alt="Brian Boreiko"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
                {/* Overlay con efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent pointer-events-none rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="prose prose-invert max-w-none text-center md:text-left">
              {/* Mobile description */}
              <p className="text-lg leading-relaxed md:hidden">
                <strong className="text-[#e04000]">{t("about.greeting")}</strong>
              </p>
              <div className="text-lg leading-relaxed md:hidden">
                <p dangerouslySetInnerHTML={{ __html: t("about.description.1") }} />
              </div>

              {/* Desktop description */}
              <div className="hidden md:block">
                <p className="text-xl mb-4">
                  🚀 <strong className="text-[#e04000]">{t("about.greeting")}</strong>
                </p>
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: t("about.description.1") }} />
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: t("about.description.2") }} />
                <p dangerouslySetInnerHTML={{ __html: t("about.description.3") }} />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              {t("about.skills.title")}
            </span>
            <span className="ml-2 text-white">⚔️</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkillCategory
              title={t("skills.cloud")}
              skills={[
                { name: "AWS", proficiency: 95 },
                { name: "GCP", proficiency: 85 },
                { name: "Huawei Cloud", proficiency: 80 },
                { name: "Azure", proficiency: 70 },
              ]}
            />
            <SkillCategory
              title={t("skills.devops")}
              skills={[
                { name: "Docker", proficiency: 90 },
                { name: "Kubernetes", proficiency: 85 },
                { name: "CI/CD", proficiency: 80 },
                { name: "Terraform", proficiency: 75 },
              ]}
            />
            <SkillCategory
              title={t("skills.languages")}
              skills={[
                { name: "Python", proficiency: 85 },
                { name: "Bash", proficiency: 80 },
                { name: "Git", proficiency: 90 },
                { name: "Linux", proficiency: 95 },
              ]}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function SkillCategory({ title, skills }) {
  return (
    <div className="p-6 bg-[#030045]/50 rounded-xl backdrop-blur-sm border border-gray-800">
      <h4 className="text-xl font-bold mb-4 text-purple-400 text-center md:text-left">{title}</h4>
      {skills.map((skill) => (
        <SkillBar key={skill.name} name={skill.name} proficiency={skill.proficiency} />
      ))}
    </div>
  )
}

function SkillBar({ name, proficiency }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300">{name}</span>
        <span className="text-gray-400">{proficiency}%</span>
      </div>
      <div className="h-2 bg-[#040055] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
        />
      </div>
    </div>
  )
}
