import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.repository.createMany({
    data: [
      { owner: "microsoft", name: "vscode" },
      { owner: "facebook", name: "react" },
      { owner: "githubtraining", name: "github-games" },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
