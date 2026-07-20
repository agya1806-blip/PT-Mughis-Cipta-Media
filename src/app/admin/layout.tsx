import type { Metadata } from "next"
import Link from "next/link"
import AdminShell from "@/components/admin/AdminShell"

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Panel administrasi PT Mughis Cipta Media — kelola buku, artikel, kategori, halaman, dan pengaturan.",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell>
    <div className="flex flex-1 min-h-0">
      <MobileSidebar />
      <aside className="w-64 bg-green-dark text-cream flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-4 border-b border-gold/20">
          <Link href="/admin" className="text-lg font-bold text-gold">
            Admin Panel
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarLink href="/admin">Dashboard</SidebarLink>
          <SidebarLink href="/admin/books">Buku</SidebarLink>
          <SidebarLink href="/admin/categories">Kategori</SidebarLink>
          <SidebarLink href="/admin/pages">Halaman</SidebarLink>
          <SidebarLink href="/admin/articles">Artikel</SidebarLink>
          <SidebarLink href="/admin/contact-submissions">Kontak Masuk</SidebarLink>
          <SidebarLink href="/admin/settings">Pengaturan</SidebarLink>
          <div className="border-t border-gold/20 pt-4 mt-4">
            <Link
              href="/"
              className="block text-sm text-gold/80 hover:text-cream transition-colors"
            >
              &larr; Ke Beranda
            </Link>
          </div>
        </nav>
      </aside>
      <main className="flex-1 bg-cream overflow-y-auto p-4 sm:p-6">{children}</main>
    </div>
    </AdminShell>
  )
}

function MobileSidebar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-cream border-t border-gold/20 flex items-center justify-around px-2 py-2 safe-area-bottom">
      <MobileNav href="/admin" label="Dashboard" icon={<span className="text-xs">📊</span>} />
      <MobileNav href="/admin/books" label="Buku" icon={<span className="text-xs">📚</span>} />
      <MobileNav href="/admin/articles" label="Artikel" icon={<span className="text-xs">📝</span>} />
      <MobileNav href="/admin/categories" label="Kategori" icon={<span className="text-xs">🏷️</span>} />
      <MobileNav href="/" label="Site" icon={<span className="text-xs">🌐</span>} />
    </div>
  )
}

function MobileNav({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-green/70 hover:text-gold transition-colors">
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  )
}

function SidebarLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-lg text-sm text-gold/80 hover:bg-green/20 hover:text-cream transition-colors"
    >
      {children}
    </Link>
  )
}
