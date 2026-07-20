import { PrismaClient } from '../src/lib/__generated__/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const articles = [
  // === INDUSTRI PENERBITAN ===
  { title: 'Masa Depan Industri Penerbitan di Era Digital', slug: 'masa-depan-penerbitan-digital' },
  { title: 'Cara Menulis Buku yang Laris di Pasaran', slug: 'cara-menulis-buku-laris' },
  { title: 'Tips Memilih Penerbit untuk Naskah Pertama Anda', slug: 'tips-memilih-penerbit' },
  { title: 'Proses Penerbitan Buku dari Naskah ke Rak Toko', slug: 'proses-penerbitan-buku' },
  { title: 'Mengenal ISBN: Fungsi dan Cara Mendapatkannya', slug: 'mengenal-isbn' },
  { title: 'Perbedaan Penerbit Mayor dan Penerbit Indie', slug: 'penerbit-mayor-vs-indie' },
  { title: 'Kontrak Penerbitan: Hal Penting yang Harus Diketahui Penulis', slug: 'kontrak-penerbitan' },
  { title: 'Royalti Penulis: Cara Kerja dan Tips Negosiasi', slug: 'royalti-penulis' },
  { title: 'Self-Publishing vs Traditional Publishing: Mana yang Tepat?', slug: 'self-publishing-vs-traditional' },
  { title: 'Mengelola Hak Cipta Buku di Indonesia', slug: 'hak-cipta-buku-indonesia' },
  { title: 'Tren Penerbitan Buku 2025: Apa yang Sedang Populer?', slug: 'tren-penerbitan-2025' },
  { title: 'Penerbitan Buku Digital: Peluang dan Tantangan', slug: 'penerbitan-buku-digital' },
  { title: 'Biaya Cetak Buku: Faktor yang Mempengaruhi Harga', slug: 'biaya-cetak-buku' },
  { title: 'Memilih Kertas yang Tepat untuk Cetak Buku', slug: 'memilih-kertas-cetak-buku' },
  { title: 'Proses Editing Naskah: Tahapan dan Pentingnya', slug: 'proses-editing-naskah' },
  { title: 'Desain Sampul Buku yang Menarik Pembaca', slug: 'desain-sampul-buku-menarik' },
  { title: 'Layout dan Tipografi dalam Penerbitan Buku', slug: 'layout-tipografi-buku' },
  { title: 'Strategi Pemasaran Buku untuk Penerbit Baru', slug: 'strategi-pemasaran-buku' },
  { title: 'Distribusi Buku: Saluran dan Cara Efektif', slug: 'distribusi-buku-efektif' },
  { title: 'Mengelola Stok Buku di Gudang Penerbit', slug: 'mengelola-stok-buku-gudang' },

  // === LITERASI & MEMBACA ===
  { title: 'Manfaat Membaca Buku untuk Kesehatan Mental', slug: 'manfaat-membaca-kesehatan-mental' },
  { title: 'Cara Membangun Kebiasaan Membaca Setiap Hari', slug: 'membangun-kebiasaan-membaca' },
  { title: '10 Buku Wajib Dibaca Sebelum Usia 30 Tahun', slug: '10-buku-wajib-sebelum-30' },
  { title: 'Membaca Cepat: Teknik dan Manfaatnya', slug: 'teknik-membaca-cepat' },
  { title: 'Perpustakaan Digital: Masa Depan Literasi', slug: 'perpustakaan-digital-literasi' },
  { title: 'Mengapa Literasi Penting untuk Kemajuan Bangsa', slug: 'pentingnya-literasi-bangsa' },
  { title: 'Book Club Online: Cara Bergabung dan Manfaatnya', slug: 'book-club-online' },
  { title: 'Rekomendasi Buku untuk Pengusaha Muda', slug: 'rekomendasi-buku-pengusaha-muda' },
  { title: 'Dongeng Sebelum Tidur: Manfaat untuk Anak', slug: 'dongeng-sebelum-tidur' },
  { title: 'Membaca vs Menonton: Mana yang Lebih Efektif?', slug: 'membaca-vs-menonton' },
  { title: 'Cara Mendidik Anak Gemar Membaca', slug: 'mendidik-anak-gemar-membaca' },
  { title: 'Gerakan Literasi Sekolah: Implementasi dan Dampak', slug: 'gerakan-literasi-sekolah' },
  { title: 'Biblioterapi: Menyembuhkan Jiwa dengan Buku', slug: 'biblioterapi-buku' },
  { title: '5 Buku Self-Development yang Mengubah Hidup', slug: 'buku-self-development-mengubah-hidup' },
  { title: 'Membaca Buku Fisik vs E-Book: Perbandingan', slug: 'buku-fisik-vs-ebook' },

  // === KEISLAMAN ===
  { title: 'Memahami Makna Ihsan dalam Kehidupan Sehari-hari', slug: 'makna-ihsan-kehidupan' },
  { title: 'Kisah Nabi Muhammad SAW: Teladan Sepanjang Masa', slug: 'kisah-nabi-muhammad-teladan' },
  { title: 'Keutamaan Membaca Al-Qur\'an Setiap Hari', slug: 'keutamaan-membaca-alquran' },
  { title: 'Pendidikan Akhlak untuk Anak Usia Dini', slug: 'pendidikan-akhlak-anak-usia-dini' },
  { title: 'Tafsir Surat Pendek yang Wajib Diketahui', slug: 'tafsir-surat-pendek' },
  { title: 'Sejarah Peradaban Islam: Dari Masa ke Masa', slug: 'sejarah-peradaban-islam' },
  { title: 'Doa-doa Harian yang Dianjurkan Rasulullah', slug: 'doa-harian-rasulullah' },
  { title: 'Hikmah Puasa Ramadhan untuk Kesehatan', slug: 'hikmah-puasa-ramadhan-kesehatan' },
  { title: 'Meneladani Sifat Siddiq, Amanah, Tabligh, Fathonah', slug: 'sifat-siddiq-amanah-tabligh-fathonah' },
  { title: 'Adab Menuntut Ilmu dalam Islam', slug: 'adab-menuntut-ilmu-islam' },
  { title: 'Keutamaan Sedekah dan Infak dalam Al-Qur\'an', slug: 'keutamaan-sedekah-infak' },
  { title: 'Hukum Ekonomi Syariah di Indonesia', slug: 'hukum-ekonomi-syariah-indonesia' },
  { title: 'Pernikahan dalam Islam: Syarat dan Rukun', slug: 'pernikahan-dalam-islam' },
  { title: 'Mengenal Rukun Iman dan Rukun Islam', slug: 'rukun-iman-rukun-islam' },
  { title: 'Keistimewaan Bulan Muharram dan Amalannya', slug: 'keistimewaan-bulan-muharram' },

  // === BISNIS PENERBITAN ===
  { title: 'Modal Awal Memulai Usaha Penerbitan Buku', slug: 'modal-memulai-usaha-penerbitan' },
  { title: 'Strategi Pemasaran Digital untuk Penerbit', slug: 'strategi-pemasaran-digital-penerbit' },
  { title: 'Membangun Brand Penerbit yang Kuat', slug: 'membangun-brand-penerbit' },
  { title: 'Analisis Target Pasar Buku di Indonesia', slug: 'analisis-target-pasar-buku' },
  { title: 'Harga Jual Buku: Strategi dan Pertimbangan', slug: 'harga-jual-buku-strategi' },
  { title: 'Mengelola Hubungan dengan Penulis dan Distributor', slug: 'hubungan-penulis-distributor' },
  { title: 'Teknologi Cetak Digital vs Offset untuk Penerbit', slug: 'cetak-digital-vs-offset' },
  { title: 'Tips Mengikuti Pameran Buku Internasional', slug: 'tips-pameran-buku-internasional' },
  { title: 'Menerbitkan Buku untuk Pasar Pendidikan', slug: 'menerbitkan-buku-pasar-pendidikan' },
  { title: 'Keuntungan Menjadi Reseller Buku', slug: 'keuntungan-reseller-buku' },
  { title: 'Manajemen Gudang Penerbit yang Efisien', slug: 'manajemen-gudang-penerbit' },
  { title: 'Peran Editor dalam Industri Penerbitan Modern', slug: 'peran-editor-penerbitan-modern' },
  { title: 'Membuat Katalog Buku yang Menjual', slug: 'membuat-katalog-buku-menjual' },
  { title: 'Sistem Pre-Order Buku: Cara dan Manfaatnya', slug: 'sistem-pre-order-buku' },
  { title: 'Menulis Proposal Buku yang Disukai Penerbit', slug: 'proposal-buku-disukai-penerbit' },

  // === KEWIRAUSAHAAN ===
  { title: 'Cara Memulai Bisnis Buku Online Modal Kecil', slug: 'bisnis-buku-online-modal-kecil' },
  { title: 'Membangun Toko Buku Online dengan WordPress', slug: 'toko-buku-online-wordpress' },
  { title: 'Tips Menjadi Reseller Buku Sukses', slug: 'tips-reseller-buku-sukses' },
  { title: 'Strategi Konten Marketing untuk Toko Buku', slug: 'konten-marketing-toko-buku' },
  { title: 'Mengelola Keuangan untuk Usaha Kecil Penerbitan', slug: 'mengelola-keuangan-penerbitan' },
  { title: 'Ide Bisnis Kreatif di Industri Buku', slug: 'ide-bisnis-kreatif-buku' },
  { title: 'Pajak untuk Usaha Penerbitan dan Percetakan', slug: 'pajak-usaha-penerbitan' },
  { title: 'Membuat Website Toko Buku yang Profesional', slug: 'website-toko-buku-profesional' },
  { title: 'Belajar dari Pengusaha Buku Sukses di Indonesia', slug: 'pengusaha-buku-sukses-indonesia' },
  { title: 'Teknik Negosiasi dengan Penerbit dan Supplier', slug: 'teknik-negosiasi-penerbit' },

  // === MENULIS ===
  { title: '10 Tips Menulis Buku Pertama bagi Pemula', slug: 'tips-menulis-buku-pertama' },
  { title: 'Mengatasi Writer\'s Block: Strategi Jitu', slug: 'mengatasi-writers-block' },
  { title: 'Menulis Buku Non-Fiksi: Panduan Lengkap', slug: 'menulis-buku-nonfiksi' },
  { title: 'Menulis Buku Fiksi: Membangun Karakter dan Plot', slug: 'menulis-buku-fiksi' },
  { title: 'Teknik Menulis Artikel SEO untuk Website', slug: 'teknik-menulis-artikel-seo' },
  { title: 'Menulis Buku Anak: Tips dan Trik', slug: 'menulis-buku-anak' },
  { title: 'Menulis Buku Ajar yang Efektif untuk Dosen', slug: 'menulis-buku-ajar-dosen' },
  { title: 'Membuat Outline Buku yang Sistematis', slug: 'membuat-outline-buku' },
  { title: 'Menulis dengan Suara: Mengembangkan Gaya Penulisan', slug: 'mengembangkan-gaya-penulisan' },
  { title: 'Proofreading vs Editing: Apa Bedanya?', slug: 'proofreading-vs-editing' },

  // === TEKNOLOGI & INOVASI ===
  { title: 'Revolusi AI dalam Industri Penerbitan Buku', slug: 'ai-dalam-industri-penerbitan' },
  { title: 'Aplikasi Menulis Terbaik untuk Penulis Profesional', slug: 'aplikasi-menulis-profesional' },
  { title: 'E-Book vs Audiobook: Perbandingan dan Tren', slug: 'ebook-vs-audiobook' },
  { title: 'Platform Self-Publishing Terbaik di Indonesia', slug: 'platform-self-publishing-indonesia' },
  { title: 'Mencetak Buku dengan Mesin Digital Printing', slug: 'mesin-digital-printing-buku' },
  { title: 'Penggunaan Blockchain untuk Hak Cipta Buku', slug: 'blockchain-hak-cipta-buku' },
  { title: 'Aplikasi Manajemen Referensi untuk Penulis', slug: 'aplikasi-manajemen-referensi' },
  { title: 'Pemasaran Buku dengan Media Sosial: Panduan', slug: 'pemasaran-buku-media-sosial' },
  { title: 'Google Books dan Amazon KDP: Peluang Publikasi Global', slug: 'google-books-amazon-kdp' },
  { title: 'Tren Augmented Reality dalam Buku Anak', slug: 'augmented-reality-buku-anak' },
];

function generateContent(title: string): string {
  const paragraphs = [
    `<p>Industri penerbitan buku di Indonesia terus berkembang seiring dengan meningkatnya kesadaran literasi masyarakat. PT Mughis Cipta Media hadir sebagai mitra terpercaya dalam menerbitkan dan mendistribusikan buku-buku berkualitas. Artikel ini akan membahas secara mendalam tentang <strong>${title}</strong>.</p>`,

    `<p>Dalam perkembangannya, dunia penerbitan menghadapi berbagai tantangan dan peluang. Mulai dari transformasi digital, perubahan perilaku konsumen, hingga hadirnya platform-platform baru yang memudahkan penulis untuk menerbitkan karyanya. Memahami dinamika ini menjadi kunci sukses bagi para pelaku industri.</p>`,

    `<p>PT Mughis Cipta Media berkomitmen untuk selalu memberikan layanan terbaik dalam setiap proses penerbitan. Mulai dari editing, layout, desain sampul, hingga distribusi ke berbagai toko buku di seluruh Indonesia. Dengan pengalaman dan tim profesional, kami siap membantu mewujudkan karya terbaik Anda.</p>`,

    `<p>Aspek penting yang perlu diperhatikan dalam topik ini meliputi pemahaman mendalam tentang pasar, strategi yang tepat, serta konsistensi dalam menjalankan setiap tahapan. Tidak kalah pentingnya adalah kemampuan untuk beradaptasi dengan perubahan tren dan teknologi yang terus berkembang.</p>`,

    `<p>Kami percaya bahwa setiap karya memiliki nilai dan potensinya masing-masing. Oleh karena itu, PT Mughis Cipta Media selalu memberikan pendekatan personal kepada setiap mitra penulis dan penerbit. Dengan kolaborasi yang baik, hasil yang maksimal dapat dicapai bersama.</p>`,

    `<p>Kesimpulannya, pemahaman yang baik tentang ${title.toLowerCase()} akan memberikan manfaat besar bagi perkembangan industri penerbitan di Indonesia. Teruslah belajar dan berkarya bersama PT Mughis Cipta Media.</p>`,
  ];

  return `<!DOCTYPE html>
<html>
<body>
${paragraphs.join('\n\n')}
</body>
</html>`;
}

async function main() {
  console.log('Seeding articles...\n');

  let created = 0;
  let skipped = 0;

  for (const article of articles) {
    const slug = article.slug;
    const existing = await prisma.article.findUnique({ where: { slug } });

    if (existing) {
      console.log(`SKIP: "${article.title}" (slug: ${slug}) already exists`);
      skipped++;
      continue;
    }

    await prisma.article.create({
      data: {
        title: article.title,
        slug,
        content: generateContent(article.title),
        featuredImage: null,
        fileUrl: null,
      },
    });

    console.log(`OK: "${article.title}" (slug: ${slug})`);
    created++;
  }

  console.log(`\nDone! Created: ${created}, Skipped (already exist): ${skipped}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
