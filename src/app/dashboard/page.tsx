import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Dashboard Penulis",
  description: "Kelola naskah, pantau progres, dan atur akun penulis Anda di PT Mughis Cipta Media.",
}

export default function DashboardPage() {
  redirect("/dashboard/overview")
}
