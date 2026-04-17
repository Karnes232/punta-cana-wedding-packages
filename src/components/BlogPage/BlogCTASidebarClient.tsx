'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/i18n/navigation'

type Props = {
  heading: string
  sub: string
  button: string
}

export default function BlogCTASidebarClient({ heading, sub, button }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('article-hero')
    if (!hero) return
 
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      
      { threshold: 0.5 },
    )

    observer.observe(hero)
 
    return () => observer.disconnect()
  }, [])


  return (
    <div
      className={`fixed top-1/2 z-40 hidden w-64 -translate-y-1/2 xl:block transition-opacity duration-300 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ left: 'calc(50% + 24rem + 2rem)' }}
    >
      <div className="rounded-2xl bg-white p-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
        <div className="mb-4 h-1 w-10 rounded-full bg-[#5B9FD9]" />
        <h3 className="text-base font-semibold leading-snug text-[#1A1A1A]">
          {heading}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#777777]">
          {sub}
        </p>
        <Link
          href="/wedding-calculator"
          className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#5B9FD9] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#4A90E2] active:scale-[0.98]"
        >
          {button}
        </Link>
      </div>
    </div>
  )
}
