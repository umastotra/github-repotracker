import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.repository.createMany({
    data: [
      { owner: "facebook", name: "react" },
      { owner: "vercel", name: "next.js" },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
