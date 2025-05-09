-- CreateTable
CREATE TABLE "Repository" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);
