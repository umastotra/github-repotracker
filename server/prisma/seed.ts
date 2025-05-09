import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.repository.createMany({
    data: [
      { owner: "facebook", name: "react" },
      { owner: "githubtraining", name: "github-games" },
      { owner: "githubtraining", name: "training-manual" },
    ],
  });
}

main().finally(() => prisma.$disconnect());
