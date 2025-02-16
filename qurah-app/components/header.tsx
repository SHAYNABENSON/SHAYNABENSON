"use client"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { gsap } from 'gsap'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    if (logoRef.current) {
      const tl = gsap.timeline({ repeat: -1 })
      tl.to(logoRef.current, {
        rotation: 360,
        duration: 20,
        ease: "none"
      })
      const leafPath = logoRef.current.querySelector('path[fill="#10b981"]')
      if (leafPath) {
        tl.to(leafPath, {
          y: -10,
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut"
        }, 0)
      }

      return () => {
        tl.kill()
      }
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <div className="relative w-8 h-8" ref={logoRef}>
            <svg viewBox="0 0 200 200" className="w-full h-full">
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
              <g transform="translate(10, 10) scale(0.9)">
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
          <span className="font-bold text-xl font-avenir">Qurah</span>
        </Link>
      </div>
    </header>
  )
}

