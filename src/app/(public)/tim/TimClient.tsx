"use client"

import { useCallback } from "react"
import { TeamHero } from "@/components/team/TeamHero"
import { TeamStats } from "@/components/team/TeamStats"
import { TeamGrid } from "@/components/team/TeamGrid"
import { TeamOrgChart } from "@/components/team/TeamOrgChart"

export function TimClient() {
  return (
    <>
      <TeamHero />
      <TeamStats />
      <TeamGrid />
      <TeamOrgChart />
    </>
  )
}
