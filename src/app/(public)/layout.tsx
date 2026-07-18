import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"
import { PreviewModal } from "@/components/PreviewModal"

export const dynamic = "force-dynamic"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <PreviewModal />
    </div>
  )
}
