"use client"
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, Briefcase, Users, Zap, Moon, Sun } from 'lucide-react'
import { LogoPreloader } from "@/components/logo-preloader"
import { BackToTop } from "@/components/back-to-top"
import { ScrollButtons } from "@/components/ScrollButtons"
import Link from 'next/link'
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Head from 'next/head'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const servicesRef = useRef(null)
  const portfolioRef = useRef(null)
  const contactRef = useRef(null)
  const logoRef = useRef(null)

  const [servicesInView, servicesEntry] = useIntersectionObserver({
    threshold: 0.2,
  })
  const [portfolioInView, portfolioEntry] = useIntersectionObserver({
    threshold: 0.2,
  })
  const [contactInView, contactEntry] = useIntersectionObserver({
    threshold: 0.2,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sections = [
        { ref: servicesRef, entry: servicesEntry },
        { ref: portfolioRef, entry: portfolioEntry },
        { ref: contactRef, entry: contactEntry }
      ]

      sections.forEach((section, index) => {
        const elements = section.ref.current.querySelectorAll('.animate-on-scroll')
        
        gsap.set(elements, { autoAlpha: 0, y: 50 })

        ScrollTrigger.create({
          trigger: section.ref.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(elements, {
              duration: 0.8,
              autoAlpha: 1,
              y: 0,
              stagger: 0.2,
              ease: "power3.out",
              overwrite: "auto",
            })
          },
          onLeaveBack: () => {
            gsap.to(elements, {
              duration: 0.8,
              autoAlpha: 0,
              y: 50,
              stagger: 0.1,
              ease: "power3.in",
              overwrite: "auto",
            })
          }
        })

        // Parallax effect
        gsap.to(section.ref.current, {
          backgroundPositionY: () => {
            const progress = ScrollTrigger.create({
              trigger: section.ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }).progress
            return `${progress * 50}%`
          },
          ease: "none",
          scrollTrigger: {
            trigger: section.ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        })
      })
    }
  }, [servicesEntry, portfolioEntry, contactEntry])

  useEffect(() => {
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

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Qurah",
            "url": "https://qurah.co",
            "logo": "https://qurah.co/logo.png",
            "sameAs": [
              "https://www.facebook.com/qurahco",
              "https://www.linkedin.com/company/qurahco",
              "https://twitter.com/qurahco"
            ]
          })}
        </script>
      </Head>
      <LogoPreloader />
      <ScrollButtons />
      <div className={`min-h-screen flex flex-col transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <header className="absolute top-2 left-2 sm:top-4 sm:left-4 z-50">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" ref={logoRef}>
              <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
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
                    />
                    <path
                      d="M100 85 L125 135 L100 160 L75 135 Z"
                      fill="#10b981"
                      className="transition-all duration-1000 ease-in-out origin-bottom"
                    />
                    <path
                      d="M100 85 L100 160 M87.5 110 L112.5 110 M80 125 L120 125"
                      stroke="#0d9488"
                      strokeWidth="2"
                      fill="none"
                      className="transition-all duration-1000 ease-in-out origin-bottom"
                    />
                    <path
                      d="M100 85 L125 135 L100 160 L75 135 Z"
                      fill="none"
                      stroke="url(#outlineGradient)"
                      strokeWidth="2"
                      className="transition-all duration-1000 ease-in-out origin-bottom"
                      style={{ filter: 'url(#glow)' }}
                    />
                  </g>
              </svg>
            </div>
            <span className="font-bold text-lg sm:text-xl md:text-2xl font-avenir text-white drop-shadow-md ml-2 sm:ml-3">Qurah</span>
          </Link>
        </header>
        <main>
          {/* Hero Section */}
          <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <video
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/qurah%20hero-X6NPXVyFgiFwtfkhbIb5LaZ2MVBsa0.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
                aria-hidden="true"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-background transition-colors duration-500" aria-hidden="true" />

            {/* Theme toggle placement */}
            <div className="absolute top-0 right-0 p-4 z-50">
              {mounted && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="transition-colors duration-500">
                      {theme === 'dark' ? (
                        <Moon className="h-[1.2rem] w-[1.2rem] text-white transition-colors duration-500" />
                      ) : (
                        <Sun className="h-[1.2rem] w-[1.2rem] text-white transition-colors duration-500" />
                      )}
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 mt-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 bg-gradient-to-r from-[#10b981] via-[#0ee8b7] to-[#0d9488] bg-clip-text text-transparent">
                Business and Personal<br className="hidden sm:inline" /> Growth Catalyst
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white">
                We help companies tap into new markets and expand their businesses, and help individuals grow through personal development and investment platforms.
              </p>
              <Button 
                variant="cta" 
                size="lg" 
                className="text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4"
                onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-16 sm:py-24 bg-background relative" ref={servicesRef}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center animate-on-scroll">Our Services</h2>
              <div className="grid gap-8 md:grid-cols-3">
                <Card className="animate-on-scroll">
                  <CardHeader>
                    <Briefcase className="h-8 w-8 mb-2 text-primary" aria-hidden="true" />
                    <CardTitle>Business Expansion</CardTitle>
                    <CardDescription>Co-develop and initiate new projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>We help companies tap into new markets and expand their businesses through strategic partnerships and innovative projects.</p>
                  </CardContent>
                </Card>
                <Card className="animate-on-scroll">
                  <CardHeader>
                    <Users className="h-8 w-8 mb-2 text-primary" aria-hidden="true" />
                    <CardTitle>Personal Growth</CardTitle>
                    <CardDescription>Platforms for development and investment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Empower individuals with opportunities for personal development and smart investment strategies.</p>
                  </CardContent>
                </Card>
                <Card className="animate-on-scroll">
                  <CardHeader>
                    <Zap className="h-8 w-8 mb-2 text-primary" aria-hidden="true" />
                    <CardTitle>Industry Insights</CardTitle>
                    <CardDescription>Research-driven approach</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Leverage our extensive industry research and global networks to make informed decisions and drive growth.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="py-16 sm:py-24 bg-accent relative" ref={portfolioRef}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center animate-on-scroll">Future Portfolio</h2>
              <p className="text-xl mb-8 text-center animate-on-scroll">Here's a glimpse of our upcoming projects and initiatives:</p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="animate-on-scroll">
                  <h3 className="font-bold text-lg mb-2">WEVE Podcast</h3>
                  <p className="text-sm text-muted-foreground">An upcoming podcast series focusing on entrepreneurship and innovation.</p>
                </div>
                <div className="animate-on-scroll">
                  <h3 className="font-bold text-lg mb-2">Adro Agency</h3>
                  <p className="text-sm text-muted-foreground">A digital marketing agency specializing in growth hacking, launching soon.</p>
                </div>
                <div className="animate-on-scroll">
                  <h3 className="font-bold text-lg mb-2">Startup Radio</h3>
                  <p className="text-sm text-muted-foreground">An online radio station dedicated to startup news and interviews, coming to your airwaves soon.</p>
                </div>
                <div className="animate-on-scroll">
                  <h3 className="font-bold text-lg mb-2">Quest Projects</h3>
                  <p className="text-sm text-muted-foreground">A project management tool for distributed teams, currently in development.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-16 sm:py-24 bg-background relative" ref={contactRef}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 animate-on-scroll">Contact Us</h2>
              <p className="text-lg mb-4 animate-on-scroll">
                Have questions or want to learn more? We'd love to hear from you!
              </p>
              <p className="text-xl animate-on-scroll">
                <a 
                  href="mailto:info@qurah.co" 
                  className="text-primary hover:underline transition-colors duration-300"
                >
                  info@qurah.co
                </a>
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-background py-8 border-t relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <p className="text-center">&copy; 2024 Qurah. All rights reserved.</p>
          </div>
          <BackToTop />
        </footer>
      </div>
    </>
  )
}

