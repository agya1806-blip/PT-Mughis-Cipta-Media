export const TEAM_CONFIG = {
  hero: {
    title: "Tim Profesional PT Mughis Cipta Media",
    subtitle:
      "Di balik setiap buku yang diterbitkan terdapat tim profesional yang bekerja dengan dedikasi untuk memberikan pelayanan terbaik kepada para penulis Indonesia.",
  },
  stats: [
    { value: "5", label: "Pimpinan Perusahaan" },
    { value: "3", label: "Divisi Utama" },
    { value: "2023", label: "Berdiri" },
    { value: "Nasional", label: "Melayani Seluruh Indonesia" },
  ],
  orgChart: [
    {
      level: 1,
      title: "Founder & Chief Executive Officer",
      name: "Muhammad Aghisna",
      reportsTo: null,
    },
    {
      level: 2,
      title: "General Manager",
      name: "Ulfa Hasanah",
      reportsTo: "Muhammad Aghisna",
    },
    {
      level: 3,
      title: "Head of Administration & Finance Division",
      name: "Muhammad Zakki",
      reportsTo: "Ulfa Hasanah",
      team: "Administration & Finance Team",
    },
    {
      level: 3,
      title: "Head of Editorial & Production Division",
      name: "Almurtaza",
      reportsTo: "Ulfa Hasanah",
      team: "Editorial & Production Team",
    },
    {
      level: 3,
      title: "Head of Information Technology & Digital Services Division",
      name: "Rahmad Yunan",
      reportsTo: "Ulfa Hasanah",
      team: "IT & Digital Services Team",
    },
  ],
  divisionNames: {
    executive: "Eksekutif",
    administration: "Administrasi & Keuangan",
    editorial: "Editorial & Produksi",
    technology: "Teknologi Informasi & Layanan Digital",
  },
  internalTeamNotice: "Divisi ini didukung oleh beberapa anggota internal yang tidak ditampilkan pada website.",
}
