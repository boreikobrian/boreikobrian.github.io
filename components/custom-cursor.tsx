"use client"

import { useState, useEffect } from "react"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isTextField, setIsTextField] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Actualizar la posición del cursor inmediatamente sin animación
      const lightsaber = document.getElementById("lightsaber")
      const lightsaberGlow = document.getElementById("lightsaber-glow")
      const textCursor = document.getElementById("text-cursor")

      if (lightsaber && lightsaberGlow) {
        // Posicionamiento directo sin animación para eliminar cualquier delay
        lightsaber.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        lightsaberGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }

      if (textCursor) {
        textCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        textCursor.style.backgroundColor = "#00FF00" // Verde
        textCursor.style.boxShadow = `0 0 5px 1px rgba(0, 255, 0, 0.6)` // Brillo verde
      }

      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        (e.target.tagName === "A" ||
          e.target.tagName === "BUTTON" ||
          e.target.closest("a") ||
          e.target.closest("button"))
      ) {
        setIsHovering(true)
        setIsTextField(false)
      } else if (
        e.target instanceof HTMLElement &&
        (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable)
      ) {
        setIsTextField(true)
        setIsHovering(false)
      } else {
        setIsHovering(false)
        setIsTextField(false)
      }
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isHovering, isTextField])

  // Determinar el color del sable de luz (azul por defecto)
  const saberColor = "#00FF00" // Verde
  const saberGlowColor = "rgba(0, 255, 0, 0.6)" // Versión con transparencia

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, [role="button"], input, textarea {
          cursor: none;
        }
        
        @keyframes hum {
          0% {
            box-shadow: 0 0 5px 2px ${saberGlowColor}, 0 0 10px 5px ${saberGlowColor};
          }
          50% {
            box-shadow: 0 0 5px 3px ${saberGlowColor}, 0 0 15px 8px ${saberGlowColor};
          }
          100% {
            box-shadow: 0 0 5px 2px ${saberGlowColor}, 0 0 10px 5px ${saberGlowColor};
          }
        }
        
        @keyframes attack {
          0% {
            width: 25px;
          }
          50% {
            width: 35px;
          }
          100% {
            width: 25px;
          }
        }
        
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>

      {/* Lightsaber cursor */}
      <div
        id="lightsaber"
        className="fixed pointer-events-none z-[100]"
        style={{
          willChange: "transform",
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          opacity: isTextField ? 0 : 1, // Ocultar el sable en campos de texto
        }}
      >
        <div
          className="relative"
          style={{
            transform: "rotate(45deg)", // Apunta hacia arriba y a la izquierda
            transformOrigin: "0 0", // Punto de origen en la punta
          }}
        >
          {/* Lightsaber blade (hoja) */}
          <div
            className={`absolute rounded-full`}
            style={{
              left: "0px",
              top: "0px",
              width: isClicking ? "35px" : "25px",
              height: "4px",
              backgroundColor: saberColor,
              animation: isHovering
                ? "hum 1.5s infinite, attack 0.3s ease-in-out"
                : isClicking
                  ? "attack 0.3s ease-in-out"
                  : "hum 1.5s infinite",
              boxShadow: `0 0 5px 2px ${saberGlowColor}, 0 0 10px 5px ${saberGlowColor}`,
              transition: "width 0.1s ease-out",
              transformOrigin: "left center",
            }}
          />

          {/* Lightsaber handle (empuñadura) */}
          <div
            style={{
              position: "absolute",
              left: "25px", // Posicionado después de la hoja
              top: "-5px",
              width: "15px",
              height: "6px",
              backgroundColor: "#777",
              borderRadius: "1px",
              border: "1px solid #555",
              transform: "translateY(3px)", // Ajuste fino para centrar con la hoja
            }}
          >
            {/* Detalles de la empuñadura */}
            <div
              className="absolute"
              style={{
                width: "3px",
                height: "8px",
                backgroundColor: "#999",
                borderRadius: "1px",
                left: "3px",
                top: "-1px",
              }}
            />
            <div
              className="absolute"
              style={{
                width: "3px",
                height: "8px",
                backgroundColor: "#999",
                borderRadius: "1px",
                right: "3px",
                top: "-1px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Text cursor (I-beam) */}
      {isTextField && (
        <div
          id="text-cursor"
          className="fixed pointer-events-none z-[100]"
          style={{
            willChange: "transform",
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            width: "3px",
            height: "20px",
            backgroundColor: saberColor,
            boxShadow: `0 0 5px 1px ${saberGlowColor}`,
            animation: "blink 1s infinite",
          }}
        />
      )}

      {/* Glow effect for interactive elements */}
      <div
        id="lightsaber-glow"
        className={`fixed pointer-events-none z-[99] transition-opacity duration-300 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${saberGlowColor} 0%, rgba(14, 165, 233, 0.2) 50%, transparent 70%)`,
          transform: `translate(${mousePosition.x - 25}px, ${mousePosition.y - 25}px)`,
          willChange: "transform",
        }}
      />
    </>
  )
}
