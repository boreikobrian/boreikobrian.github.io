import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "@/context/language-context"

export const metadata: Metadata = {
  title: "Brian Boreiko - Cloud Architect & DevOps Engineer",
  description:
    "Portfolio de Brian Boreiko, Cloud Architect y DevOps Engineer especializado en AWS, GCP, Docker y Kubernetes.",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
