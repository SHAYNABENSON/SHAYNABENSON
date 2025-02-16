"use client"

import { useState, useEffect } from 'react'

export function LogoPreloader({ onLoadingComplete }: { onLoadingComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onLoadingComplete) {
        onLoadingComplete()
      }
    }, 3000) // 3 seconds loading time

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className={`flex flex-col items-center space-y-6 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <svg viewBox="0 0 240 240" className="w-full h-full">
            <defs>
              <linearGradient id="outlineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="50%" stopColor="#ff00ff" />
                <stop offset="100%" stopColor="#ffff00" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <g transform="translate(20, 20)">
              <circle 
                cx="100" 
                cy="100" 
                r="90" 
                fill="#111111" 
                className="transition-all duration-1000 ease-in-out origin-center"
                style={{ 
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                }}
              />
              <path
                d="M100 85 L125 135 L100 160 L75 135 Z"
                fill="#10b981"
                className="transition-all duration-1000 ease-in-out origin-bottom"
                style={{ 
                  opacity: isHovered ? '1' : '0.7',
                  transform: isHovered ? 'scale(1.1) translateY(-15%)' : 'scale(1)',
                }}
              />
              <path
                d="M100 85 L100 160 M87.5 110 L112.5 110 M80 125 L120 125"
                stroke="#0d9488"
                strokeWidth="2"
                fill="none"
                className="transition-all duration-1000 ease-in-out origin-bottom"
                style={{ 
                  opacity: isHovered ? '1' : '0',
                  transform: isHovered ? 'scale(1.1) translateY(-15%)' : 'scale(1)',
                }}
              />
              <path
                d="M100 85 L125 135 L100 160 L75 135 Z"
                fill="none"
                stroke="url(#outlineGradient)"
                strokeWidth="2"
                className="transition-all duration-1000 ease-in-out origin-bottom"
                style={{ 
                  opacity: isHovered ? '1' : '0',
                  strokeDasharray: 300,
                  strokeDashoffset: isHovered ? 0 : 300,
                  transform: isHovered ? 'scale(1.1) translateY(-15%)' : 'scale(1)',
                  filter: 'url(#glow)',
                }}
              />
            </g>
          </svg>
        </div>
        
        <div className="text-center transition-all duration-1000 ease-in-out" style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#111111] mb-2" style={{ fontFamily: 'Avenir, sans-serif' }}>QURAH</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#10b981] tracking-wider" style={{ fontFamily: 'Avenir, sans-serif' }}>GROW</p>
        </div>
      </div>
    </div>
  )
}

