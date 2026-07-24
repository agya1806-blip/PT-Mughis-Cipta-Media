import { PrismaClient } from '../src/lib/__generated__/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Update publisher
  const result = await prisma.book.updateMany({
    where: { publisher: { contains: 'Maktabah' } },
    data: { publisher: 'PT Mughis Cipta Media' },
  });
  console.log(`Buku diupdate: ${result.count}`);

  // Update site_name di settings
  const settings = await prisma.setting.updateMany({
    where: { key: 'site_name', value: { contains: 'Maktabah' } },
    data: { value: 'PT Mughis Cipta Media' },
  });
  console.log(`Settings diupdate: ${settings.count}`);

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
