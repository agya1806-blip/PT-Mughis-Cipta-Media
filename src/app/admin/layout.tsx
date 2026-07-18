import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 min-h-0">
      <aside className="w-64 bg-zinc-900 text-white flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-4 border-b border-zinc-700">
          <Link href="/admin" className="text-lg font-bold text-amber-400">
            Admin Panel
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarLink href="/admin" exact>
            Dashboard
          </SidebarLink>
          <SidebarLink href="/admin/books">Buku</SidebarLink>
          <SidebarLink href="/admin/categories">Kategori</SidebarLink>
          <SidebarLink href="/admin/pages">Halaman</SidebarLink>
          <SidebarLink href="/admin/articles">Artikel</SidebarLink>
          <SidebarLink href="/admin/orders">Pesanan</SidebarLink>
          <SidebarLink href="/admin/resellers">Reseller</SidebarLink>
          <SidebarLink href="/admin/settings">Pengaturan</SidebarLink>
          <div className="border-t border-zinc-700 pt-4 mt-4">
            <Link
              href="/"
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
            >
              &larr; Ke Toko
            </Link>
          </div>
        </nav>
      </aside>
      <main className="flex-1 bg-zinc-50 overflow-y-auto p-6">{children}</main>
    </div>
  )
}

function SidebarLink({
  href,
  exact,
  children,
}: {
  href: string
  exact?: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
    >
      {children}
    </Link>
  )
}
