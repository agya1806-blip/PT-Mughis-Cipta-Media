import Link from "next/link"
import TextLogo from "@/components/TextLogo"

interface Props {
  scrolled: boolean
}

export default function NavLogo({ scrolled }: Props) {
  return (
    <Link href="/" className="flex items-center group shrink-0">
      <TextLogo variant="navbar" />
    </Link>
  )
}
