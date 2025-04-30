# Portfolio de Brian Boreiko - Arquitecto Cloud & Ingeniero DevOps

![Portfolio Preview](/public/images/portfolio-preview.png)

## 📋 Descripción

Portfolio profesional de Brian Boreiko, Arquitecto Cloud y DevOps Engineer. Este sitio web está construido con Next.js, React y Tailwind CSS, ofreciendo una experiencia interactiva y multilingüe para mostrar habilidades, proyectos y experiencia profesional.

## ✨ Características

- **Diseño Responsivo**: Adaptado para todos los dispositivos
- **Multilingüe**: Soporte para Español, Inglés y Portugués
- **Animaciones Interactivas**: Efectos visuales con Framer Motion y Three.js
- **Modo Oscuro**: Diseño optimizado para modo oscuro
- **Formulario de Contacto**: Integración con Formspree
- **Cursor Personalizado**: Efecto de cursor tipo sable de luz
- **Secciones Completas**: Sobre mí, Servicios, Proyectos, Trayectoria Profesional y Contacto

## 🛠️ Tecnologías

- **Framework**: Next.js 14
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **3D**: Three.js, React Three Fiber
- **Partículas**: tsParticles
- **Iconos**: Lucide React
- **Componentes UI**: shadcn/ui

## 🚀 Instalación

1. Clona el repositorio:
   \`\`\`bash
   git clone https://github.com/tu-usuario/portfolio-brian-boreiko.git
   cd portfolio-brian-boreiko
   \`\`\`

2. Instala las dependencias:
   \`\`\`bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   \`\`\`

3. Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables (si es necesario):
   \`\`\`
   # Ejemplo de variables de entorno
   NEXT_PUBLIC_FORMSPREE_ID=tu-id-de-formspree
   \`\`\`

## 🖥️ Ejecución Local

\`\`\`bash
npm run dev
# o
yarn dev
# o
pnpm dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 📁 Estructura del Proyecto

\`\`\`
/
├── app/                    # Rutas y páginas de Next.js
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales
├── components/             # Componentes React
│   ├── about-me.tsx        # Sección Sobre Mí
│   ├── career-timeline.tsx # Línea de tiempo profesional
│   ├── custom-cursor.tsx   # Cursor personalizado
│   ├── navbar.tsx          # Barra de navegación
│   └── ...                 # Otros componentes
├── context/                # Contextos de React
│   └── language-context.tsx # Contexto para multilenguaje
├── hooks/                  # Custom hooks
├── lib/                    # Utilidades y funciones
├── public/                 # Archivos estáticos
│   └── images/             # Imágenes
└── ...
\`\`\`

## 🎨 Personalización

### Cambiar Colores

Los colores principales se definen en `app/globals.css` y `tailwind.config.js`. Puedes modificarlos para adaptar el tema a tus preferencias.

### Añadir Nuevos Idiomas

Para añadir un nuevo idioma, edita el archivo `context/language-context.tsx` y agrega las traducciones correspondientes.

### Modificar Secciones

Cada sección está implementada como un componente independiente en la carpeta `components/`. Puedes editar estos archivos para personalizar el contenido.

## 📝 Contacto

Para cualquier consulta o sugerencia, puedes contactar a:

- **Email**: boreikobrian@gmail.com
- **LinkedIn**: [linkedin.com/in/brianboreiko](https://linkedin.com/in/brianboreiko)
- **GitHub**: [github.com/boreikobrian](https://github.com/boreikobrian)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
