import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // --- ユーザー作成 ---
  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {},
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: 'password-sabin', // TODO: 本番ではハッシュ化必須
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {},
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: 'password-alex', // TODO: 本番ではハッシュ化必須
    },
  });

  // --- Todo作成 ---
  const todo1 = await prisma.todo.create({
    data: {
      text: 'Learn NestJS',
      userId: user1.id,
    },
  });

  const todo2 = await prisma.todo.create({
    data: {
      text: 'Prisma',
      userId: user2.id,
    },
  });

  const todo3 = await prisma.todo.create({
    data: {
      text: 'TypeScript',
      userId: user1.id,
    },
  });

  // --- 出力 ---
  console.log('Users:');
  console.log(user1, user2);
  console.log('Todos:');
  console.log(todo1, todo2, todo3);
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
