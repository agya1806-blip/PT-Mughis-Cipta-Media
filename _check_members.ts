import { prisma } from "./src/lib/prisma"

async function main() {
  const members = await prisma.teamMember.findMany({
    select: { name: true, email: true, status: true },
  })
  console.log(JSON.stringify(members, null, 2))
  await prisma.$disconnect()
}

main()
