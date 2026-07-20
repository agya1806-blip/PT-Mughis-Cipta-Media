import { PrismaClient } from '../src/lib/__generated__/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import * as fs from 'fs';
import * as path from 'path';

const connectionString = process.env.DATABASE_URL || '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const articles = await prisma.article.findMany({ orderBy: { id: 'asc' } });
  const books = await prisma.book.findMany({ orderBy: { id: 'asc' } });
  const categories = await prisma.category.findMany({ orderBy: { id: 'asc' } });
  const pages = await prisma.page.findMany({ orderBy: { id: 'asc' } });
  const contacts = await prisma.contactSubmission.findMany({ orderBy: { id: 'asc' } });
  const settings = await prisma.setting.findMany({ orderBy: { key: 'asc' } });
  const users = await prisma.user.findMany({ orderBy: { id: 'asc' } });

  const dump = {
    exportedAt: new Date().toISOString(),
    articles,
    books,
    categories,
    pages,
    contacts,
    settings,
    users,
  };

  const outPath = path.resolve(__dirname, '../db-backup.json');
  fs.writeFileSync(outPath, JSON.stringify(dump, null, 2), 'utf-8');
  console.log(`✅ Exported to ${outPath}`);
  console.log(`   Articles: ${articles.length}`);
  console.log(`   Books: ${books.length}`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Pages: ${pages.length}`);
  console.log(`   Contacts: ${contacts.length}`);
  console.log(`   Settings: ${settings.length}`);
  console.log(`   Users: ${users.length}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
