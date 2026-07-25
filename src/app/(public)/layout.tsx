import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BreadcrumbWrapper from "@/components/layout/BreadcrumbWrapper"
import { PreviewModal } from "@/components/PreviewModal"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <BreadcrumbWrapper />
      <main className="flex-1">{children}</main>
      <Footer />
      <PreviewModal />
    </div>
  )
}
