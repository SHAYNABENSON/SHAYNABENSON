import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { LogoPreloader } from "@/components/logo-preloader"

export const metadata: Metadata = {
  title: 'Qurah - Business and Personal Growth Catalyst',
  description: 'Qurah helps companies tap into new markets, expand businesses, and empowers individuals through personal development and investment platforms.',
  keywords: 'business growth, personal development, investment, market expansion, entrepreneurship',
  openGraph: {
    title: 'Qurah - Business and Personal Growth Catalyst',
    description: 'Empowering businesses and individuals for success',
    images: [
      {
        url: 'https://qurah.co/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Qurah - Business and Personal Growth Catalyst',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qurah - Business and Personal Growth Catalyst',
    description: 'Empowering businesses and individuals for success',
    images: ['https://qurah.co/twitter-image.jpg'],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LogoPreloader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'