import { PrismaClient } from '../src/lib/__generated__/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const settings: { key: string; value: string }[] = [
  { key: 'site_name', value: 'PT Mughis Cipta Media' },
  { key: 'contact_phone', value: '085217706587' },
  { key: 'contact_email', value: 'mughisciptamedia@gmail.com' },
  { key: 'address', value: 'Samalanga, Bireuen, Aceh' },
  { key: 'instagram_url', value: 'https://www.instagram.com/ptmughis' },
  { key: 'facebook_url', value: '' },
  { key: 'legal_nib', value: '1807260050954' },
  { key: 'legal_nib_date', value: '' },
  { key: 'legal_nib_status', value: 'Aktif' },
  { key: 'legal_akta', value: 'PT Perorangan (UU Cipta Kerja)' },
  { key: 'legal_akta_date', value: '' },
  { key: 'legal_npwp', value: '1108043110010001' },
  { key: 'legal_npwp_date', value: '' },
  { key: 'legal_sku', value: '' },
  { key: 'legal_sku_date', value: '' },
  { key: 'legal_ikapi', value: '' },
  { key: 'legal_ikapi_date', value: '' },
];

async function main() {
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
    console.log('OK:', s.key, '=', s.value || '(empty)');
  }
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
