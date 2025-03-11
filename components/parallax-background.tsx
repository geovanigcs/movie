"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Transformações para diferentes camadas do parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]) // Camada mais lenta
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]) // Camada média
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]) // Camada mais rápida
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.5, 0.2])

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Camada 1 - Mais lenta */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: y1, opacity }}>
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Círculos grandes no fundo */}
          <circle cx="200" cy="200" r="80" fill="var(--accent)" fillOpacity="0.05" />
          <circle cx="1700" cy="300" r="120" fill="var(--accent)" fillOpacity="0.05" />
          <circle cx="500" cy="800" r="100" fill="var(--accent)" fillOpacity="0.05" />
          <circle cx="1300" cy="900" r="90" fill="var(--accent)" fillOpacity="0.05" />

          {/* Linhas onduladas */}
          <path
            d="M0 400 Q 400 300, 800 400 T 1600 400 T 2400 400"
            stroke="var(--accent)"
            strokeOpacity="0.1"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0 600 Q 400 500, 800 600 T 1600 600 T 2400 600"
            stroke="var(--accent)"
            strokeOpacity="0.1"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Camada 2 - Média */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: y2, opacity }}>
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Elementos de filme */}
          <rect x="100" y="100" width="120" height="80" rx="10" fill="var(--accent)" fillOpacity="0.1" />
          <rect x="1700" y="200" width="120" height="80" rx="10" fill="var(--accent)" fillOpacity="0.1" />
          <rect x="400" y="700" width="120" height="80" rx="10" fill="var(--accent)" fillOpacity="0.1" />
          <rect x="1200" y="500" width="120" height="80" rx="10" fill="var(--accent)" fillOpacity="0.1" />
          <rect x="800" y="300" width="120" height="80" rx="10" fill="var(--accent)" fillOpacity="0.1" />

          {/* Ícones de play estilizados */}
          <polygon points="110,140 110,180 150,160" fill="var(--accent)" fillOpacity="0.2" />
          <polygon points="1710,240 1710,280 1750,260" fill="var(--accent)" fillOpacity="0.2" />
          <polygon points="410,740 410,780 450,760" fill="var(--accent)" fillOpacity="0.2" />
          <polygon points="1210,540 1210,580 1250,560" fill="var(--accent)" fillOpacity="0.2" />
          <polygon points="810,340 810,380 850,360" fill="var(--accent)" fillOpacity="0.2" />
        </svg>
      </motion.div>

      {/* Camada 3 - Mais rápida */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: y3, opacity }}>
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pequenos pontos como estrelas */}
          {Array.from({ length: 50 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 1920}
              cy={Math.random() * 1080}
              r={Math.random() * 3 + 1}
              fill="var(--accent)"
              fillOpacity={Math.random() * 0.5 + 0.2}
            />
          ))}

          {/* Linhas finas conectando alguns pontos */}
          <line x1="200" y1="200" x2="400" y2="300" stroke="var(--accent)" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="1000" y1="500" x2="1200" y2="400" stroke="var(--accent)" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="600" y1="800" x2="800" y2="700" stroke="var(--accent)" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="1500" y1="300" x2="1700" y2="400" stroke="var(--accent)" strokeOpacity="0.1" strokeWidth="1" />

          {/* Formas de ondas de áudio estilizadas */}
          <path
            d="M100 900 L100 950 M150 880 L150 970 M200 850 L200 1000 M250 870 L250 980 M300 890 L300 960"
            stroke="var(--accent)"
            strokeOpacity="0.2"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M1600 200 L1600 250 M1650 180 L1650 270 M1700 150 L1700 300 M1750 170 L1750 280 M1800 190 L1800 260"
            stroke="var(--accent)"
            strokeOpacity="0.2"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Gradiente para suavizar a transição com o conteúdo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10"></div>
    </div>
  )
}

