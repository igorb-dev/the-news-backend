/*
  Warnings:

  - You are about to drop the column `current` on the `Streak` table. All the data in the column will be lost.
  - You are about to drop the column `lastOpen` on the `Streak` table. All the data in the column will be lost.
  - You are about to drop the column `max` on the `Streak` table. All the data in the column will be lost.
  - Added the required column `lastOpened` to the `Streak` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Streak" DROP CONSTRAINT "Streak_userId_fkey";

-- AlterTable
ALTER TABLE "Streak" DROP COLUMN "current",
DROP COLUMN "lastOpen",
DROP COLUMN "max",
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "lastOpened" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Streak" ADD CONSTRAINT "Streak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
