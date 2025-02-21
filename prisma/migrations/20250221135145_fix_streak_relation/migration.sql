/*
  Warnings:

  - You are about to drop the column `streak` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "streak",
ADD COLUMN     "streakCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Streak" (
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "lastOpened" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Streak_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Streak_userId_key" ON "Streak"("userId");

-- AddForeignKey
ALTER TABLE "Streak" ADD CONSTRAINT "Streak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
