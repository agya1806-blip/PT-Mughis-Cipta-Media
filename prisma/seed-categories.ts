import { PrismaClient } from '../src/lib/__generated__/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const categories = [
  { name: 'Fiksi', slug: 'fiksi' },
  { name: 'Non-Fiksi', slug: 'non-fiksi' },
  { name: 'Pendidikan', slug: 'pendidikan' },
  { name: 'Agama & Spiritual', slug: 'agama-spiritual' },
  { name: 'Bisnis & Ekonomi', slug: 'bisnis-ekonomi' },
  { name: 'Teknologi', slug: 'teknologi' },
  { name: 'Sejarah', slug: 'sejarah' },
  { name: 'Anak & Remaja', slug: 'anak-remaja' },
  { name: 'Self-Development', slug: 'self-development' },
  { name: 'Sastra', slug: 'sastra' },
];

async function main() {
  for (const c of categories) {
    const existing = await prisma.category.findUnique({ where: { slug: c.slug } });
    if (existing) {
      console.log('SKIP (exists):', c.name);
    } else {
      await prisma.category.create({ data: c });
      console.log('OK:', c.name);
    }
  }
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
