"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CampaignSettings } from "./settings"

interface CampaignStatusValue {
  settings: CampaignSettings | null
  loading: boolean
  status: "before" | "during" | "after"
  isOpen: boolean
  isBefore: boolean
  isAfter: boolean
  isDuring: boolean
  startDate: string
  endDate: string
  programName: string
  quotaTotal: number
  quotaRegistered: number
}

const defaultValue: CampaignStatusValue = {
  settings: null,
  loading: true,
  status: "before",
  isOpen: false,
  isBefore: true,
  isAfter: false,
  isDuring: false,
  startDate: "2026-07-26T00:00:00+07:00",
  endDate: "2026-08-04T23:59:00+07:00",
  programName: "Program Apresiasi Penulis",
  quotaTotal: 50,
  quotaRegistered: 0,
}

const CampaignStatusContext = createContext<CampaignStatusValue>(defaultValue)

export function CampaignStatusProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<CampaignSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/campaign/status")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.status) setSettings(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const status = settings?.status || "before"
  const value: CampaignStatusValue = {
    settings,
    loading,
    status,
    isOpen: settings?.active === true && status === "during",
    isBefore: status === "before",
    isAfter: status === "after",
    isDuring: status === "during",
    startDate: settings?.startDate || "2026-07-26T00:00:00+07:00",
    endDate: settings?.endDate || "2026-08-04T23:59:00+07:00",
    programName: settings?.name || "Program Apresiasi Penulis",
    quotaTotal: settings?.quotaTotal || 50,
    quotaRegistered: settings?.quotaRegistered || 0,
  }

  return (
    <CampaignStatusContext.Provider value={value}>
      {children}
    </CampaignStatusContext.Provider>
  )
}

export function useCampaignStatusContext() {
  return useContext(CampaignStatusContext)
}
