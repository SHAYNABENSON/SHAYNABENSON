"use client"

import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' }
]

export function ScrollButtons() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 50 },
        ease: 'power3.inOut'
      })
    }
  }

  return (
    <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <ul className="space-y-4">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => handleClick(id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
                activeSection === id
                  ? 'bg-primary scale-150'
                  : 'bg-gray-400 hover:bg-primary hover:scale-125'
              }`}
              aria-label={`Scroll to ${label}`}
            >
              <span className="sr-only">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

