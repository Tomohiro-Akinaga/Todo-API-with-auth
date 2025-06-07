// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy todo
  const post1 = await prisma.todo.create({
    data: { text: '牛乳がないので、買います。' },
  });

  const post2 = await prisma.todo.create({
    data: { text: 'パンを買います。' },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
