import { PrismaClient } from '../src/lib/__generated__/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const books = [
  {
    title: 'Jalan Cahaya: Menemukan Makna di Setiap Langkah',
    author: 'Ahmad Fauzi',
    translator: '',
    publisher: 'PT Mughis Cipta Media',
    isbn: '978-602-1234-01-8',
    pageCount: 220,
    price: 75000,
    resellerPrice: 60000,
    categorySlug: 'fiksi',
    synopsis: 'Sebuah novel inspiratif yang mengajak pembaca merenungi setiap perjalanan hidup. Mengisahkan seorang pemuda yang mencari jati diri di tengah hiruk-pikuk kota besar.',
    stock: 50,
    weight: 300,
    dimensions: '14 x 21 cm',
    language: 'Indonesia',
    publicationYear: 2025,
    whatsapp: '085217706587',
  },
  {
    title: 'Pendidikan Karakter untuk Generasi Milenial',
    author: 'Dr. Siti Nurhaliza, M.Pd.',
    translator: '',
    publisher: 'PT Mughis Cipta Media',
    isbn: '978-602-1234-02-5',
    pageCount: 180,
    price: 65000,
    resellerPrice: 52000,
    categorySlug: 'pendidikan',
    synopsis: 'Buku ini membahas pentingnya pendidikan karakter di era digital. Dilengkapi dengan studi kasus dan strategi praktis untuk pendidik dan orang tua.',
    stock: 40,
    weight: 250,
    dimensions: '14 x 21 cm',
    language: 'Indonesia',
    publicationYear: 2025,
    whatsapp: '085217706587',
  },
  {
    title: 'Fiqh Muamalah Kontemporer',
    author: 'KH. Hasan Basri, Lc., M.E.I.',
    translator: '',
    publisher: 'PT Mughis Cipta Media',
    isbn: '978-602-1234-03-2',
    pageCount: 350,
    price: 95000,
    resellerPrice: 76000,
    categorySlug: 'agama-spiritual',
    synopsis: 'Kajian komprehensif tentang fiqh muamalah dalam konteks kekinian. Membahas transaksi keuangan syariah, ekonomi digital, dan etika bisnis Islam.',
    stock: 30,
    weight: 400,
    dimensions: '15 x 23 cm',
    language: 'Indonesia',
    publicationYear: 2024,
    whatsapp: '085217706587',
  },
  {
    title: 'Aceh dalam Lintasan Sejarah Nusantara',
    author: 'Teuku Muhammad Ali, S.S., M.Hum.',
    translator: '',
    publisher: 'PT Mughis Cipta Media',
    isbn: '978-602-1234-04-9',
    pageCount: 280,
    price: 85000,
    resellerPrice: 68000,
    categorySlug: 'sejarah',
    synopsis: 'Menelusuri peran penting Aceh dalam perjalanan sejarah Nusantara, dari masa kerajaan Islam hingga era kemerdekaan.',
    stock: 25,
    weight: 350,
    dimensions: '15 x 23 cm',
    language: 'Indonesia',
    publicationYear: 2024,
    whatsapp: '085217706587',
  },
  {
    title: 'Bisnis Digital untuk Pemula: Panduan Lengkap dari Nol',
    author: 'Rizky Pratama, S.Kom., M.M.',
    translator: '',
    publisher: 'PT Mughis Cipta Media',
    isbn: '978-602-1234-05-6',
    pageCount: 200,
    price: 70000,
    resellerPrice: 56000,
    categorySlug: 'bisnis-ekonomi',
    synopsis: 'Panduan praktis memulai bisnis digital bagi pemula. Mencakup strategi pemasaran online, manajemen keuangan, dan tips membangun brand.',
    stock: 45,
    weight: 280,
    dimensions: '14 x 21 cm',
    language: 'Indonesia',
    publicationYear: 2025,
    whatsapp: '085217706587',
  },
];

async function main() {
  for (const b of books) {
    const category = await prisma.category.findUnique({ where: { slug: b.categorySlug } });
    if (!category) {
      console.log('SKIP (category not found):', b.title);
      continue;
    }
    const existing = await prisma.book.findFirst({ where: { isbn: b.isbn } });
    if (existing) {
      console.log('SKIP (exists):', b.title);
      continue;
    }
    await prisma.book.create({
      data: {
        title: b.title,
        author: b.author,
        translator: b.translator || null,
        publisher: b.publisher,
        isbn: b.isbn,
        pageCount: b.pageCount,
        price: b.price,
        resellerPrice: b.resellerPrice,
        categoryId: category.id,
        synopsis: b.synopsis,
        stock: b.stock,
        weight: b.weight,
        dimensions: b.dimensions,
        language: b.language,
        publicationYear: b.publicationYear,
        whatsapp: b.whatsapp || null,
      },
    });
    console.log('OK:', b.title);
  }
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
