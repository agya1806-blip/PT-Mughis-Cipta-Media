import { Client } from "pg"
import { config } from "dotenv"
config({ path: ".env" })

const types = [
  { name: "Buku", icon: "Book", badge_color: "#D3C297", slug: "buku", sort_order: 1 },
  { name: "Kitab", icon: "ScrollText", badge_color: "#8B7355", slug: "kitab", sort_order: 2 },
  { name: "Kitab Terjemahan", icon: "Languages", badge_color: "#6B8E23", slug: "kitab-terjemahan", sort_order: 3 },
  { name: "Terjemahan Buku", icon: "Languages", badge_color: "#4682B4", slug: "terjemahan-buku", sort_order: 4 },
  { name: "Terjemahan Kitab", icon: "Languages", badge_color: "#556B2F", slug: "terjemahan-kitab", sort_order: 5 },
  { name: "Buku Ajar", icon: "BookOpen", badge_color: "#CD853F", slug: "buku-ajar", sort_order: 6 },
  { name: "Buku Referensi", icon: "BookMarked", badge_color: "#2E5984", slug: "buku-referensi", sort_order: 7 },
  { name: "Monograf", icon: "FileText", badge_color: "#8B4513", slug: "monograf", sort_order: 8 },
  { name: "Modul", icon: "Notebook", badge_color: "#9370DB", slug: "modul", sort_order: 9 },
  { name: "Diktat", icon: "BookTemplate", badge_color: "#708090", slug: "diktat", sort_order: 10 },
  { name: "Antologi", icon: "BookHeart", badge_color: "#C71585", slug: "antologi", sort_order: 11 },
  { name: "Kumpulan Cerpen", icon: "Feather", badge_color: "#DAA520", slug: "kumpulan-cerpen", sort_order: 12 },
  { name: "Kumpulan Puisi", icon: "Feather", badge_color: "#BA55D3", slug: "kumpulan-puisi", sort_order: 13 },
  { name: "Novel", icon: "BookHeart", badge_color: "#B22222", slug: "novel", sort_order: 14 },
  { name: "Komik", icon: "Compass", badge_color: "#FF6347", slug: "komik", sort_order: 15 },
  { name: "Ensiklopedia", icon: "BookOpen", badge_color: "#4169E1", slug: "ensiklopedia", sort_order: 16 },
  { name: "Kamus", icon: "BookText", badge_color: "#2F4F4F", slug: "kamus", sort_order: 17 },
  { name: "Pedoman", icon: "ClipboardList", badge_color: "#696969", slug: "pedoman", sort_order: 18 },
  { name: "Panduan", icon: "Compass", badge_color: "#228B22", slug: "panduan", sort_order: 19 },
  { name: "Prosiding", icon: "Files", badge_color: "#4B0082", slug: "prosiding", sort_order: 20 },
  { name: "Laporan Penelitian", icon: "FileSearch", badge_color: "#191970", slug: "laporan-penelitian", sort_order: 21 },
  { name: "Naskah Akademik", icon: "GraduationCap", badge_color: "#483D8B", slug: "naskah-akademik", sort_order: 22 },
  { name: "Terbitan Keagamaan", icon: "Church", badge_color: "#8B0000", slug: "terbitan-keagamaan", sort_order: 23 },
  { name: "Terbitan Pendidikan", icon: "School", badge_color: "#006400", slug: "terbitan-pendidikan", sort_order: 24 },
  { name: "Terbitan Umum", icon: "Newspaper", badge_color: "#555555", slug: "terbitan-umum", sort_order: 25 },
  { name: "Lainnya", icon: "MoreHorizontal", badge_color: "#999999", slug: "lainnya", sort_order: 99 },
]

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log("Connected!")

  // Insert types
  for (const t of types) {
    const existing = await client.query("SELECT id FROM publication_types WHERE slug = $1", [t.slug])
    if (existing.rows.length > 0) {
      await client.query(
        "UPDATE publication_types SET name=$1, icon=$2, badge_color=$3, sort_order=$4, updated_at=NOW() WHERE slug=$5",
        [t.name, t.icon, t.badge_color, t.sort_order, t.slug],
      )
      console.log(`  UPDATED: ${t.name}`)
    } else {
      await client.query(
        "INSERT INTO publication_types (name, slug, icon, badge_color, sort_order, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,NOW(),NOW())",
        [t.name, t.slug, t.icon, t.badge_color, t.sort_order],
      )
      console.log(`  INSERTED: ${t.name}`)
    }
  }

  // Backward compatibility: set existing books without publication_type_id to "Buku" (id=1)
  const bukuId = await client.query("SELECT id FROM publication_types WHERE slug = 'buku'")
  if (bukuId.rows.length > 0) {
    const id = bukuId.rows[0].id
    const result = await client.query(
      "UPDATE books SET publication_type_id = $1 WHERE publication_type_id IS NULL",
      [id],
    )
    console.log(`\nUpdated ${result.rowCount} existing books with publication_type_id = ${id} (Buku)`)
  }

  console.log("\nDone!")
  await client.end()
}

main().catch((e) => { console.error(e); process.exit(1) })
