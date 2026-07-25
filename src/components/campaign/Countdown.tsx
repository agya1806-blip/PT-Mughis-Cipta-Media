"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock } from "lucide-react"
import { useCampaignStatus } from "@/lib/campaign/useCampaignStatus"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown() {
  const { status, startDate, endDate, isBefore, isDuring } = useCampaignStatus()
  const target = isBefore ? new Date(startDate) : new Date(endDate)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(target))

  const tick = useCallback(() => {
    setTimeLeft(calcTimeLeft(target))
  }, [target])

  useEffect(() => {
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [tick])

  const label = isBefore ? "Pendaftaran dibuka dalam" : "Program berakhir dalam"

  const pad = (n: number) => String(n).padStart(2, "0")

  const boxClass =
    "bg-cream/10 backdrop-blur-sm rounded-lg border border-cream/10 min-w-[56px] sm:min-w-[64px] py-2.5 text-center"

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-green-dark/85">
        <Clock className="w-3.5 h-3.5 text-gold" />
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={boxClass}>
          <div className="text-xl sm:text-2xl font-bold text-green-dark tabular-nums">
            {pad(timeLeft.days)}
          </div>
          <div className="text-[10px] text-green-dark/70 uppercase tracking-wider mt-0.5">
            Hari
          </div>
        </div>
        <span className="text-gold text-lg font-bold">:</span>
        <div className={boxClass}>
          <div className="text-xl sm:text-2xl font-bold text-green-dark tabular-nums">
            {pad(timeLeft.hours)}
          </div>
          <div className="text-[10px] text-green-dark/70 uppercase tracking-wider mt-0.5">
            Jam
          </div>
        </div>
        <span className="text-gold text-lg font-bold">:</span>
        <div className={boxClass}>
          <div className="text-xl sm:text-2xl font-bold text-green-dark tabular-nums">
            {pad(timeLeft.minutes)}
          </div>
          <div className="text-[10px] text-green-dark/70 uppercase tracking-wider mt-0.5">
            Menit
          </div>
        </div>
        <span className="text-gold text-lg font-bold">:</span>
        <div className={boxClass}>
          <div className="text-xl sm:text-2xl font-bold text-green-dark tabular-nums">
            {pad(timeLeft.seconds)}
          </div>
          <div className="text-[10px] text-green-dark/70 uppercase tracking-wider mt-0.5">
            Detik
          </div>
        </div>
      </div>
    </div>
  )
}
