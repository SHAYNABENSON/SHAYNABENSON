import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const targetRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry)
    }, options)

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current)
      }
    }
  }, [options])

  return [targetRef, entry]
}

