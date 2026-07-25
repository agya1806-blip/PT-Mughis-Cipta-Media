import "dotenv/config"
import { prisma } from "../src/lib/prisma"
import bcrypt from "bcryptjs"

async function main() {
  const existing = await prisma.teamMember.count()
  if (existing > 0) {
    console.log("Team members already seeded.")
    return
  }

  const password = await bcrypt.hash("password123", 12)

  await prisma.teamMember.createMany({
    data: [
      {
        name: "Muhammad Aghisna",
        position: "Founder & Chief Executive Officer",
        division: "executive",
        role: "FOUNDER",
        bio: "Pendiri sekaligus Chief Executive Officer PT Mughis Cipta Media yang bertanggung jawab atas arah strategis perusahaan, pengembangan bisnis, inovasi, kemitraan, dan pengambilan keputusan utama perusahaan.",
        email: "ceo@mughisciptamedia.com",
        password,
        skills: "Kepemimpinan, Strategi Bisnis, Inovasi, Kemitraan",
        quote: "Membangun peradaban melalui buku dan pengetahuan.",
        displayOrder: 1,
        status: "ACTIVE",
      },
      {
        name: "Ulfa Hasanah",
        position: "General Manager",
        division: "executive",
        role: "GENERAL_MANAGER",
        bio: "Bertanggung jawab mengoordinasikan seluruh operasional perusahaan serta memastikan setiap divisi bekerja sesuai standar pelayanan PT Mughis Cipta Media.",
        email: "gm@mughisciptamedia.com",
        password,
        skills: "Manajemen Operasional, Koordinasi Tim, Standar Pelayanan",
        quote: "Pelayanan terbaik adalah investasi kepercayaan.",
        displayOrder: 2,
        status: "ACTIVE",
      },
      {
        name: "Muhammad Zakki",
        position: "Head of Administration & Finance Division",
        division: "administration",
        role: "HEAD_OF_DIVISION",
        bio: "Memimpin Divisi Administrasi & Keuangan yang bertanggung jawab terhadap administrasi perusahaan, keuangan, arsip, dokumentasi, serta pelayanan administrasi kepada penulis dan mitra perusahaan.",
        email: "zakki@mughisciptamedia.com",
        password,
        whatsapp: "628521706587",
        skills: "Administrasi, Keuangan, Dokumentasi, Pelayanan",
        quote: "Ketertiban administrasi adalah fondasi perusahaan yang kuat.",
        displayOrder: 3,
        status: "ACTIVE",
      },
      {
        name: "Almurtaza",
        position: "Head of Editorial & Production Division",
        division: "editorial",
        role: "HEAD_OF_DIVISION",
        bio: "Memimpin Divisi Editorial & Produksi yang bertanggung jawab terhadap proses penyuntingan naskah, tata letak buku, quality control, hingga proses produksi sebelum buku diterbitkan.",
        email: "almurtaza@mughisciptamedia.com",
        password,
        whatsapp: "628521706587",
        skills: "Editing, Layout, Quality Control, Produksi Buku",
        quote: "Setiap halaman adalah cerminan kualitas kami.",
        displayOrder: 4,
        status: "ACTIVE",
      },
      {
        name: "Rahmad Yunan",
        position: "Head of Information Technology & Digital Services Division",
        division: "technology",
        role: "HEAD_OF_DIVISION",
        bio: "Memimpin Divisi Teknologi Informasi & Layanan Digital yang bertanggung jawab terhadap website perusahaan, pengembangan sistem digital, keamanan data, dan layanan teknologi perusahaan.",
        email: "yunan@mughisciptamedia.com",
        password,
        whatsapp: "628521706587",
        skills: "Web Development, Sistem Digital, Keamanan Data, Infrastruktur TI",
        quote: "Teknologi adalah jantung perusahaan modern.",
        displayOrder: 5,
        status: "ACTIVE",
      },
    ],
  })

  console.log("Team members seeded successfully!")
}

main()
  .catch((e) => {
    console.error("Seed error:", e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
