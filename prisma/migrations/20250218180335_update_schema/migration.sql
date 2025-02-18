/*
  Warnings:

  - You are about to drop the column `accessedAt` on the `NewsletterOpen` table. All the data in the column will be lost.
  - You are about to drop the column `newsletterId` on the `NewsletterOpen` table. All the data in the column will be lost.
  - You are about to drop the column `openDate` on the `NewsletterOpen` table. All the data in the column will be lost.
  - You are about to drop the `Streak` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postId` to the `NewsletterOpen` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Streak" DROP CONSTRAINT "Streak_userId_fkey";

-- AlterTable
ALTER TABLE "NewsletterOpen" DROP COLUMN "accessedAt",
DROP COLUMN "newsletterId",
DROP COLUMN "openDate",
ADD COLUMN     "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "postId" TEXT NOT NULL,
ADD COLUMN     "utmCampaign" TEXT,
ADD COLUMN     "utmChannel" TEXT,
ADD COLUMN     "utmMedium" TEXT,
ADD COLUMN     "utmSource" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Streak";
