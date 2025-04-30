"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Actualizado para incluir portugués
type Language = "es" | "en" | "pt"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  translations: Record<string, string>
}

const defaultTranslations = {
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.about": "Sobre Mí",
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.collaborative": "Colaboraciones",
    "nav.contact": "Contacto",
    "nav.career": "Mi Camino",

    // Hero
    "hero.greeting": "¡Hola, soy Brian Boreiko!",
    "hero.title": "Arquitecto Cloud & Ingeniero DevOps | AWS, GCP, Docker, Kubernetes",
    "hero.cta.projects": "Ver Proyectos",
    "hero.cta.contact": "Contáctame",

    // About
    "about.title": "Código, Café y Yo",
    "about.greeting": "¡Hola, soy Brian Boreiko!",
    "about.description.1":
      "<strong>Cloud Architect</strong> y <strong>DevOps Engineer</strong> de Buenos Aires, Argentina, enfocado en transformar infraestructuras en <strong>soluciones escalables y eficientes</strong>. Trabajo con tecnologías como <strong>AWS</strong>, <strong>GCP</strong>, <strong>Huawei Cloud</strong>, <strong>Docker</strong> y <strong>Kubernetes</strong>.",
    "about.description.2":
      "Apasionado por diseñar <strong>arquitecturas cloud sólidas</strong>, <strong>automatizar procesos</strong> y <strong>optimizar entornos de desarrollo</strong>. Siempre con una taza de buen café a mano, estoy en <strong>constante aprendizaje</strong> y exploración de nuevas herramientas y prácticas DevOps para seguir mejorando día a día.",
    "about.description.3":
      "Estoy abierto a nuevas oportunidades para construir <strong>infraestructuras seguras, resilientes y preparadas para el futuro</strong>. ☁️⚙️🔒",
    "about.skills.title": "Arsenal de Código",

    // Services
    "services.title": "Mi Experiencia",
    "services.cloud.title": "Arquitectura Cloud",
    "services.cloud.description":
      "Diseño e implementación de arquitecturas cloud escalables y seguras en AWS, GCP y Huawei Cloud.",
    "services.devops.title": "Ingeniería DevOps",
    "services.devops.description":
      "Implementación de prácticas DevOps, CI/CD pipelines y automatización de infraestructura como código.",
    "services.container.title": "Containerización",
    "services.container.description":
      "Desarrollo y orquestación de aplicaciones containerizadas con Docker y Kubernetes.",
    "services.security.title": "Seguridad Cloud",
    "services.security.description":
      "Implementación de mejores prácticas de seguridad en entornos cloud y configuración de políticas IAM.",
    "services.monitoring.title": "Monitoreo y Observabilidad",
    "services.monitoring.description":
      "Configuración de sistemas de monitoreo, logging y alertas para infraestructura y aplicaciones.",
    "services.automation.title": "Automatización",
    "services.automation.description":
      "Creación de scripts y workflows para automatizar tarefas repetitivas y procesos de infraestructura.",

    // Projects
    "projects.title": "Lo Que He Construido",

    // Collaborative
    "collaborative.title": "Lo Que Ayudé a Construir",

    // Contact
    "contact.title": "Contáctame",
    "contact.form.name": "Nombre",
    "contact.form.email": "Correo",
    "contact.form.message": "Mensaje",
    "contact.form.submit": "Enviar Mensaje",
    "contact.form.submitting": "Enviando...",
    "contact.form.success": "¡Gracias por tu mensaje! Te responderé pronto.",
    "contact.form.error": "¡Ups! Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.",
    "contact.meeting": "¿Prefieres agendar una reunión?",
    "contact.meeting.schedule": "Agendar una Reunión",
    "contact.cv": "Ver CV",

    // Footer
    "footer.rights": "Todos los derechos reservados.",

    // Skills
    "skills.title": "Arsenal de Código",
    "skills.cloud": "Cloud Platforms",
    "skills.devops": "DevOps & Containerización",
    "skills.languages": "Lenguajes & Herramientas",

    // Projects
    "projects.blog.title": "Blog Serverless Web3",
    "projects.blog.description":
      "Plataforma de blogs descentralizada con almacenamiento permanente en Arweave y micropagos en criptomonedas.",
    "projects.bridge.title": "Puente Cross-Chain",
    "projects.bridge.description": "Puente seguro para transferencias de activos entre diferentes redes blockchain.",
    "projects.identity.title": "Solución de Identidad Descentralizada",
    "projects.identity.description": "Solución de identidad auto-soberana utilizando tecnología blockchain.",
    "projects.generator.title": "Generador de Código Solidity",
    "projects.generator.description":
      "Herramienta para el desarrollo rápido y pruebas de contratos inteligentes seguros.",

    // Collaborative Projects
    "collaborative.hiperme.title": "HiperMe",
    "collaborative.hiperme.description":
      "Junto al equipo de desarrollo colaboro actualmente en la mejora continua de la plataforma, proponiendo cambios, probándolos y diseñando la aplicación con buenas prácticas de UX/UI.",
    "collaborative.contact.title": "Contact Center",
    "collaborative.contact.description":
      "Colaboré con un equipo de desarrolladores tercerizados en el desarrollo del Contact Center para HiperPBX. Agregamos pruebas de funcionalidades manuales y automatizadas con Playwright, y monitoreamos el rendimiento con Grafana y k6.",
    "collaborative.i66.title": "I-66 Express Lanes",
    "collaborative.i66.description":
      "Proyecto de integración de sistema telefónico con el CRM de Microsoft, para la empresa de peajes de la ruta interestatal N°66 en Virginia, Estados Unidos. Se llevó adelante junto a Telefónica Global Solutions y se desplegó en 1 mes.",
    "collaborative.ministerio.title": "Ministerio de ambiente de la Nación",
    "collaborative.ministerio.description":
      "Proyecto de migración de telefonía analógica a IP del Ministerio de Medioambiente de la Nación, en Buenos Aires - Argentina. Se llevó a cabo junto a la encargada de sistemas informáticos, con una duración de 2 meses.",
    "collaborative.pedidosya.title": "PedidosYa!",
    "collaborative.pedidosya.description":
      "Llevé adelante la PoC para la migración del sistema de atención de agentes de PedidosYa!, junto al IT Manager del cliente. Se replicó el sistema actual y se proyectaron las mejoras necesarias, organizando la migración en caliente.",
    "collaborative.fravega.title": "Frávega",
    "collaborative.fravega.description":
      "Proyecto de migración de telefonía Cisco UC a IP del centro de distribución de Frávega en Monte Grande, Buenos Aires. El proyecto tuvo una duración de 1 mes y medio, e incluyó la migración de software de los teléfonos Cisco.",

    // Buttons and common elements
    "button.code": "Código",
    "button.preview": "Vista previa",

    // Career
    "career.title": "Mi Camino Profesional",
    "career.subtitle": "Un vistazo a mi trayectoria",
    "career.position1.title": "Cloud Architect",
    "career.position1.company": "Empresa A",
    "career.position2.title": "DevOps Engineer",
    "career.position2.company": "Empresa B",
    "career.position3.title": "Senior Cloud Engineer",
    "career.position3.company": "Empresa C",
    "career.fulltime": "Tiempo completo",
    "career.present": "Presente",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.collaborative": "Collaborations",
    "nav.contact": "Contact",
    "nav.career": "My Path",

    // Hero
    "hero.greeting": "Hello, I'm Brian Boreiko!",
    "hero.title": "Cloud Architect & DevOps Engineer | AWS, GCP, Docker, Kubernetes",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Contact Me",

    // About
    "about.title": "Code, Coffee and Me",
    "about.greeting": "Hello, I'm Brian Boreiko!",
    "about.description.1":
      "<strong>Cloud Architect</strong> and <strong>DevOps Engineer</strong> from Buenos Aires, Argentina, focused on transforming infrastructures into <strong>scalable and efficient solutions</strong>. I work with technologies such as <strong>AWS</strong>, <strong>GCP</strong>, <strong>Huawei Cloud</strong>, <strong>Docker</strong>, and <strong>Kubernetes</strong>.",
    "about.description.2":
      "Passionate about designing <strong>solid cloud architectures</strong>, <strong>automating processes</strong>, and <strong>optimizing development environments</strong>. Always with a cup of good coffee at hand, I am <strong>constantly learning</strong> and exploring new DevOps tools and practices to keep improving day by day.",
    "about.description.3":
      "I am open to new opportunities to build <strong>secure, resilient, and future-ready infrastructures</strong>. ☁️⚙️🔒",
    "about.skills.title": "Code Arsenal",

    // Services
    "services.title": "My Expertise",
    "services.cloud.title": "Cloud Architecture",
    "services.cloud.description":
      "Design and implementation of scalable and secure cloud architectures in AWS, GCP, and Huawei Cloud.",
    "services.devops.title": "DevOps Engineering",
    "services.devops.description":
      "Implementation of DevOps practices, CI/CD pipelines, and infrastructure as code automation.",
    "services.container.title": "Containerization",
    "services.container.description":
      "Development and orchestration of containerized applications with Docker and Kubernetes.",
    "services.security.title": "Cloud Security",
    "services.security.description":
      "Implementation of security best practices in cloud environments and IAM policy configuration.",
    "services.monitoring.title": "Monitoring and Observability",
    "services.monitoring.description":
      "Configuration of monitoring systems, logging, and alerts for infrastructure and applications.",
    "services.automation.title": "Automation",
    "services.automation.description":
      "Creation of scripts and workflows to automate repetitive tasks and infrastructure processes.",

    // Projects
    "projects.title": "What I've Built",

    // Collaborative
    "collaborative.title": "What I've Helped Build",

    // Contact
    "contact.title": "Contact Me",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.form.submitting": "Sending...",
    "contact.form.success": "Thank you for your message! I'll get back to you soon.",
    "contact.form.error": "Oops! There was a problem sending your message. Please try again.",
    "contact.meeting": "Prefer to schedule a meeting?",
    "contact.meeting.schedule": "Schedule a Meeting",
    "contact.cv": "View CV",

    // Footer
    "footer.rights": "All rights reserved.",

    // Skills
    "skills.title": "Code Arsenal",
    "skills.cloud": "Cloud Platforms",
    "skills.devops": "DevOps & Containerization",
    "skills.languages": "Languages & Tools",

    // Projects
    "projects.blog.title": "Serverless Web3 Blog",
    "projects.blog.description":
      "Decentralized blog platform with permanent storage on Arweave and cryptocurrency micropayments.",
    "projects.bridge.title": "Cross-Chain Bridge",
    "projects.bridge.description": "Secure bridge for asset transfers between different blockchain networks.",
    "projects.identity.title": "Decentralized Identity Solution",
    "projects.identity.description": "Self-sovereign identity solution using blockchain technology.",
    "projects.generator.title": "Solidity Code Generator",
    "projects.generator.description": "Tool for rapid development and testing of secure smart contracts.",

    // Collaborative Projects
    "collaborative.hiperme.title": "HiperMe",
    "collaborative.hiperme.description":
      "Working with the development team, I currently collaborate on the continuous improvement of the platform, proposing changes, testing them, and designing the application with good UX/UI practices.",
    "collaborative.contact.title": "Contact Center",
    "collaborative.contact.description":
      "I collaborated with a team of outsourced developers on the development of the Contact Center for HiperPBX. We added manual and automated functionality tests with Playwright, and monitored performance with Grafana and k6.",
    "collaborative.i66.title": "I-66 Express Lanes",
    "collaborative.i66.description":
      "Telephone system integration project with Microsoft CRM for the toll company of Interstate Route 66 in Virginia, United States. It was carried out together with Telefónica Global Solutions and was deployed in 1 month.",
    "collaborative.ministerio.title": "Ministry of Environment",
    "collaborative.ministerio.description":
      "Project to migrate from analog to IP telephony for the National Ministry of Environment in Buenos Aires, Argentina. It was carried out together with the IT systems manager, with a duration of 2 months.",
    "collaborative.pedidosya.title": "PedidosYa!",
    "collaborative.pedidosya.description":
      "I led the PoC for the migration of the PedidosYa! agent service system, together with the client's IT Manager. The current system was replicated and the necessary improvements were projected, organizing the hot migration.",
    "collaborative.fravega.title": "Frávega",
    "collaborative.fravega.description":
      "Cisco UC to IP telephony migration project for the Frávega distribution center in Monte Grande, Buenos Aires. The project lasted 1.5 months and included the migration of Cisco phone software.",

    // Buttons and common elements
    "button.code": "Code",
    "button.preview": "Preview",

    // Career
    "career.title": "My Professional Path",
    "career.subtitle": "A glimpse into my journey",
    "career.position1.title": "Cloud Architect",
    "career.position1.company": "Company A",
    "career.position2.title": "DevOps Engineer",
    "career.position2.company": "Company B",
    "career.position3.title": "Senior Cloud Engineer",
    "career.position3.company": "Company C",
    "career.fulltime": "Full-time",
    "career.present": "Present",
  },
  // Añadimos las traducciones en portugués
  pt: {
    // Navbar
    "nav.home": "Início",
    "nav.about": "Sobre Mim",
    "nav.services": "Serviços",
    "nav.projects": "Projetos",
    "nav.collaborative": "Colaborações",
    "nav.contact": "Contato",
    "nav.career": "Meu Caminho",

    // Hero
    "hero.greeting": "Olá, sou Brian Boreiko!",
    "hero.title": "Arquiteto Cloud & Engenheiro DevOps | AWS, GCP, Docker, Kubernetes",
    "hero.cta.projects": "Ver Projetos",
    "hero.cta.contact": "Contate-me",

    // About
    "about.title": "Código, Café e Eu",
    "about.greeting": "Olá, sou Brian Boreiko!",
    "about.description.1":
      "<strong>Arquiteto Cloud</strong> e <strong>Engenheiro DevOps</strong> de Buenos Aires, Argentina, focado em transformar infraestruturas em <strong>soluções escaláveis e eficientes</strong>. Trabalho com tecnologias como <strong>AWS</strong>, <strong>GCP</strong>, <strong>Huawei Cloud</strong>, <strong>Docker</strong> e <strong>Kubernetes</strong>.",
    "about.description.2":
      "Apaixonado por projetar <strong>arquiteturas cloud sólidas</strong>, <strong>automatizar processos</strong> e <strong>otimizar ambientes de desenvolvimento</strong>. Sempre com uma xícara de bom café à mão, estou em <strong>constante aprendizado</strong> e exploração de novas ferramentas e práticas DevOps para continuar melhorando dia após dia.",
    "about.description.3":
      "Estou aberto a novas oportunidades para construir <strong>infraestruturas seguras, resilientes e preparadas para o futuro</strong>. ☁️⚙️🔒",
    "about.skills.title": "Arsenal de Código",

    // Services
    "services.title": "Minha Experiência",
    "services.cloud.title": "Arquitetura Cloud",
    "services.cloud.description":
      "Design e implementação de arquiteturas cloud escaláveis e seguras em AWS, GCP e Huawei Cloud.",
    "services.devops.title": "Engenharia DevOps",
    "services.devops.description":
      "Implementação de práticas DevOps, pipelines CI/CD e automação de infraestrutura como código.",
    "services.container.title": "Conteinerização",
    "services.container.description":
      "Desenvolvimento e orquestração de aplicações conteinerizadas com Docker e Kubernetes.",
    "services.security.title": "Segurança Cloud",
    "services.security.description":
      "Implementação de melhores práticas de segurança em ambientes cloud e configuração de políticas IAM.",
    "services.monitoring.title": "Monitoramento e Observabilidade",
    "services.monitoring.description":
      "Configuração de sistemas de monitoramento, logging e alertas para infraestrutura e aplicações.",
    "services.automation.title": "Automação",
    "services.automation.description":
      "Criação de scripts e workflows para automatizar tarefas repetitivas e processos de infraestrutura.",

    // Projects
    "projects.title": "O Que Construí",

    // Collaborative
    "collaborative.title": "O Que Ajudei a Construir",

    // Contact
    "contact.title": "Contate-me",
    "contact.form.name": "Nome",
    "contact.form.email": "Email",
    "contact.form.message": "Mensagem",
    "contact.form.submit": "Enviar Mensagem",
    "contact.form.submitting": "Enviando...",
    "contact.form.success": "Obrigado pela sua mensagem! Responderei em breve.",
    "contact.form.error": "Ops! Houve um problema ao enviar sua mensagem. Por favor, tente novamente.",
    "contact.meeting": "Prefere agendar uma reunião?",
    "contact.meeting.schedule": "Agendar uma Reunião",
    "contact.cv": "Ver CV",

    // Footer
    "footer.rights": "Todos os direitos reservados.",

    // Skills
    "skills.title": "Arsenal de Código",
    "skills.cloud": "Plataformas Cloud",
    "skills.devops": "DevOps & Conteinerização",
    "skills.languages": "Linguagens & Ferramentas",

    // Projects
    "projects.blog.title": "Blog Serverless Web3",
    "projects.blog.description":
      "Plataforma de blogs descentralizada com armazenamento permanente em Arweave e micropagamentos em criptomoedas.",
    "projects.bridge.title": "Ponte Cross-Chain",
    "projects.bridge.description": "Ponte segura para transferências de ativos entre diferentes redes blockchain.",
    "projects.identity.title": "Solução de Identidade Descentralizada",
    "projects.identity.description": "Solução de identidade auto-soberana utilizando tecnologia blockchain.",
    "projects.generator.title": "Gerador de Código Solidity",
    "projects.generator.description":
      "Ferramenta para o desenvolvimento rápido e testes de contratos inteligentes seguros.",

    // Collaborative Projects
    "collaborative.hiperme.title": "HiperMe",
    "collaborative.hiperme.description":
      "Junto com a equipe de desenvolvimento, colaboro atualmente na melhoria contínua da plataforma, propondo mudanças, testando-as e projetando o aplicativo com boas práticas de UX/UI.",
    "collaborative.contact.title": "Contact Center",
    "collaborative.contact.description":
      "Colaborei com uma equipe de desenvolvedores terceirizados no desenvolvimento do Contact Center para HiperPBX. Adicionamos testes de funcionalidade manuais e automatizados com Playwright, e monitoramos o desempenho com Grafana e k6.",
    "collaborative.i66.title": "I-66 Express Lanes",
    "collaborative.i66.description":
      "Projeto de integração de sistema telefônico com o CRM da Microsoft, para a empresa de pedágios da rodovia interestadual N°66 na Virgínia, Estados Unidos. Foi realizado junto com a Telefónica Global Solutions e foi implantado em 1 mês.",
    "collaborative.ministerio.title": "Ministério do Meio Ambiente",
    "collaborative.ministerio.description":
      "Projeto de migração de telefonia analógica para IP do Ministério do Meio Ambiente Nacional em Buenos Aires, Argentina. Foi realizado junto com o gerente de sistemas de TI, com duração de 2 meses.",
    "collaborative.pedidosya.title": "PedidosYa!",
    "collaborative.pedidosya.description":
      "Liderei o PoC para a migração do sistema de atendimento de agentes do PedidosYa!, junto com o Gerente de TI do cliente. O sistema atual foi replicado e as melhorias necessárias foram projetadas, organizando a migração a quente.",
    "collaborative.fravega.title": "Frávega",
    "collaborative.fravega.description":
      "Projeto de migração de telefonia Cisco UC para IP do centro de distribuição da Frávega em Monte Grande, Buenos Aires. O projeto durou 1 mês e meio e incluiu a migração do software dos telefones Cisco.",

    // Buttons and common elements
    "button.code": "Código",
    "button.preview": "Visualizar",

    // Career
    "career.title": "Meu Caminho Profissional",
    "career.subtitle": "Uma visão da minha trajetória",
    "career.position1.title": "Arquiteto Cloud",
    "career.position1.company": "Empresa A",
    "career.position2.title": "Engenheiro DevOps",
    "career.position2.company": "Empresa B",
    "career.position3.title": "Engenheiro Cloud Sênior",
    "career.position3.company": "Empresa C",
    "career.fulltime": "Tempo integral",
    "career.present": "Presente",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")
  const [translations, setTranslations] = useState(defaultTranslations.es)

  useEffect(() => {
    // Detectar el idioma del navegador
    const detectBrowserLanguage = () => {
      const browserLang = navigator.language.split("-")[0]
      // Actualizado para incluir portugués
      if (browserLang === "en") return "en"
      if (browserLang === "pt" || browserLang === "pt-BR" || browserLang === "pt-PT") return "pt"
      return "es" // Por defecto español
    }

    // Intentar obtener el idioma guardado en localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    const initialLanguage = savedLanguage || detectBrowserLanguage()

    setLanguage(initialLanguage)
    setTranslations(defaultTranslations[initialLanguage])
  }, [])

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setTranslations(defaultTranslations[newLanguage])
    localStorage.setItem("language", newLanguage)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function useTranslation(key: string) {
  const { translations } = useLanguage()
  return translations[key] || key
}
