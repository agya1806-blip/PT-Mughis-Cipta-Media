import { PrismaClient } from '../src/lib/__generated__/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
const connectionString = process.env.DATABASE_URL || '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const books = await prisma.book.findMany();
  for (const b of books) {
    let slug = b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 100);
    if (!slug) slug = 'book-' + b.id;
    let finalSlug = slug;
    let i = 1;
    while (await prisma.book.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = slug + '-' + i;
      i++;
    }
    await prisma.book.update({ where: { id: b.id }, data: { slug: finalSlug } });
    console.log(b.id + ' -> ' + finalSlug);
  }
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
