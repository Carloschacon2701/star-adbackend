import { PrismaClient } from '@prisma/client';

const roles = [
  {
    id: 1,
    name: 'Admin',
  },
  {
    id: 2,
    name: 'client',
  },
];

const fields = [
  {
    name: 'technology',
    id: 1,
  },
  {
    name: 'clothing',
    id: 2,
  },
  {
    name: 'shoes',
    id: 3,
  },
  {
    name: 'medicine',
    id: 4,
  },
  {
    name: 'sports',
    id: 5,
  },
  {
    name: 'other',
  },
];

const prisma = new PrismaClient();

async function main() {
  for (const role of roles) {
    await prisma.role.create({
      data: role,
    });

    console.log(`Role ${role.name} created`);
  }

  for (const field of fields) {
    await prisma.field.create({
      data: field,
    });

    console.log(`Field ${field.name} created`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
