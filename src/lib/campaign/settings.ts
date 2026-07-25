import { prisma } from "@/lib/prisma"

export type CampaignPeriod = "before" | "during" | "after"

export interface CampaignSettings {
  name: string
  startDate: string
  endDate: string
  quotaTotal: number
  quotaRegistered: number
  active: boolean
  status: CampaignPeriod
}

export async function getCampaignSettings(): Promise<CampaignSettings> {
  const rows = await prisma.setting.findMany({
    where: { key: { startsWith: "campaign_" } },
  })

  const map: Record<string, string> = {}
  for (const r of rows) map[r.key] = r.value

  const startDate = map.campaign_start_date || "2026-07-26T00:00:00+07:00"
  const endDate = map.campaign_end_date || "2026-08-04T23:59:00+07:00"
  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)

  let status: CampaignPeriod = "before"
  if (now >= start && now <= end) status = "during"
  else if (now > end) status = "after"

  const active = map.campaign_active !== "false"

  return {
    name: map.campaign_name || "Program Apresiasi Penulis",
    startDate,
    endDate,
    quotaTotal: parseInt(map.campaign_quota_total || "50"),
    quotaRegistered: parseInt(map.campaign_quota_registered || "0"),
    active: active && status === "during",
    status,
  }
}

export const DEFAULT_CAMPAIGN_SETTINGS: Record<string, string> = {
  campaign_name: "Program Apresiasi Penulis",
  campaign_start_date: "2026-07-26T00:00:00+07:00",
  campaign_end_date: "2026-08-04T23:59:00+07:00",
  campaign_quota_total: "50",
  campaign_quota_registered: "0",
  campaign_active: "true",
}

export async function seedCampaignSettings(): Promise<void> {
  for (const [key, value] of Object.entries(DEFAULT_CAMPAIGN_SETTINGS)) {
    const existing = await prisma.setting.findUnique({ where: { key } })
    if (!existing) {
      await prisma.setting.create({ data: { key, value } })
    }
  }
}
