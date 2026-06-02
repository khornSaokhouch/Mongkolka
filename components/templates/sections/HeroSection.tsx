"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { HeroSectionData, TemplateTheme } from "@/lib/types/template"
import { useEffect, useState } from "react"

interface Props {
  data: HeroSectionData
  theme: TemplateTheme
}

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) return clearInterval(interval)
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 min-w-[70px]">
          <span className="text-3xl font-bold text-white leading-none">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-white/70 text-xs mt-1 tracking-wider uppercase">{label}</span>
        </div>
      ))}
    </div>
  )
}

export function HeroSection({ data, theme }: Props) {
  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      {data.coverImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.coverImage})` }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: theme.primaryColor }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: theme.secondaryColor }} />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 py-20 max-w-3xl mx-auto">
        {/* Divider ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl mb-6 select-none"
        >
          ❋
        </motion.div>

        {(data.boyName || data.girlName) && (
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-2 tracking-wide"
            style={{ fontFamily: theme.fontFamily }}
          >
            {data.boyName} &amp; {data.girlName}
          </motion.h2>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tight"
          style={{ fontFamily: theme.fontFamily }}
        >
          {data.title}
        </motion.h1>

        {data.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-8"
          >
            {data.subtitle}
          </motion.p>
        )}

        {formattedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-2 text-white/70 mb-10"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase">{formattedDate}</span>
          </motion.div>
        )}

        {data.showCountdown && data.date && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-10"
          >
            <Countdown targetDate={data.date} />
          </motion.div>
        )}

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          href="#rsvp"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: theme.primaryColor, color: "#fff" }}
        >
          RSVP Now
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs flex flex-col items-center gap-1"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <span>↓</span>
      </motion.div>
    </section>
  )
}
