"use client"

import Image from "next/image"
import { Globe, Instagram, Facebook, Twitter } from "lucide-react"
import Avatar from "@/components/ui/Avatar"
import type { Author } from "@/data/authors"

interface Props {
  author: Author
  bookCount: number
}

const socialIcons: Record<string, { icon: typeof Globe; label: string; color: string }> = {
  website: { icon: Globe, label: "Website", color: "text-zinc-500" },
  instagram: { icon: Instagram, label: "Instagram", color: "text-pink-500" },
  facebook: { icon: Facebook, label: "Facebook", color: "text-blue-500" },
  twitter: { icon: Twitter, label: "Twitter", color: "text-sky-500" },
}

export default function AuthorProfile({ author, bookCount }: Props) {
  const socialLinks = Object.entries(author.social) as [string, string][]

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
      <div className="h-32 sm:h-40 bg-gradient-to-r from-gold/10 via-gold/5 to-zinc-100" />
      <div className="px-6 sm:px-8 pb-8 -mt-14 sm:-mt-16">
        <div className="flex flex-col sm:flex-row sm:items-end gap-5 mb-6">
          {author.photo ? (
            <Image
              src={author.photo}
              alt={author.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-2xl border-4 border-white bg-gold/10 flex items-center justify-center text-gold-dark font-bold text-3xl shadow-lg shrink-0">
              {author.name.charAt(0)}
            </div>
          )}
          <div className="pt-14 sm:pt-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">{author.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-1.5">
              <span className="inline-flex items-center text-xs font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">
                {author.field}
              </span>
              <span className="text-xs text-zinc-400">
                {bookCount} buku terbitan
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-3xl">
          {author.bio}
        </p>

        {socialLinks.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-zinc-100">
            {socialLinks.map(([platform, url]) => {
              const info = socialIcons[platform]
              if (!info) return null
              const Icon = info.icon
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-all"
                >
                  <Icon className={`w-4 h-4 ${info.color}`} />
                  {info.label}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
