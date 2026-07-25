"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { TeamRole, TeamMemberStatus } from "@/lib/team/types"

interface TeamMemberItem {
  id: number
  name: string
  position: string
  division: string
  role: TeamRole
  status: TeamMemberStatus
  displayOrder: number
}

export default function AdminTeam() {
  const [members, setMembers] = useState<TeamMemberItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/team")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setMembers(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Hapus ${name}?`)) return
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" })
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id))
      } else {
        const data = await res.json()
        alert(data.error || "Gagal menghapus")
      }
    } catch {
      alert("Gagal menghapus")
    }
  }

  const roleLabel: Record<string, string> = {
    FOUNDER: "Founder",
    GENERAL_MANAGER: "General Manager",
    HEAD_OF_DIVISION: "Ketua Divisi",
  }

  const divisionLabel: Record<string, string> = {
    executive: "Eksekutif",
    administration: "Administrasi & Keuangan",
    editorial: "Editorial & Produksi",
    technology: "Teknologi Informasi",
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-green/60">Memuat...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-dark">
          Manajemen Tim
        </h1>
        <Link
          href="/admin/team/create"
          className="h-10 px-4 rounded-lg bg-gold text-white text-sm font-medium hover:bg-gold-dark flex items-center"
        >
          Tambah Anggota
        </Link>
      </div>

      <Link
        href="/admin/team/manage"
        className="inline-flex items-center gap-1.5 text-sm text-green/70 hover:text-green-dark mb-4"
      >
        Kelola Hero & Statistik
      </Link>

      <div className="bg-cream rounded-xl border border-gold/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gold/5 border-b border-gold/20">
              <th className="text-left px-4 py-3 font-medium text-green/70">
                Urutan
              </th>
              <th className="text-left px-4 py-3 font-medium text-green/70">
                Nama
              </th>
              <th className="text-left px-4 py-3 font-medium text-green/70">
                Jabatan
              </th>
              <th className="text-left px-4 py-3 font-medium text-green/70">
                Divisi
              </th>
              <th className="text-left px-4 py-3 font-medium text-green/70">
                Role
              </th>
              <th className="text-center px-4 py-3 font-medium text-green/70">
                Status
              </th>
              <th className="text-center px-4 py-3 font-medium text-green/70">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                className="border-b border-gold/10 hover:bg-gold/5"
              >
                <td className="px-4 py-3 text-green/60 text-xs">
                  {member.displayOrder}
                </td>
                <td className="px-4 py-3 font-medium text-green-dark">
                  {member.name}
                </td>
                <td className="px-4 py-3 text-green/70 text-xs max-w-[200px] truncate">
                  {member.position}
                </td>
                <td className="px-4 py-3 text-green/70 text-xs">
                  {divisionLabel[member.division] || member.division}
                </td>
                <td className="px-4 py-3 text-xs text-green/70">
                  {roleLabel[member.role] || member.role}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      member.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {member.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <Link
                    href={`/admin/team/${member.id}`}
                    className="text-green hover:underline text-xs"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(member.id, member.name)}
                    className="text-red-500 hover:text-red-700 text-xs disabled:opacity-30"
                    disabled={member.role === "FOUNDER"}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-green/50 mt-3">
        Founder tidak dapat dihapus. Untuk menonaktifkan akun, gunakan halaman
        edit.
      </p>
    </div>
  )
}
