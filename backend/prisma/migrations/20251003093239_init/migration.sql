/*
  Warnings:

  - You are about to drop the column `alreadyUsedContext` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Chat" DROP COLUMN "alreadyUsedContext",
ADD COLUMN     "levelOfContext" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "isSmartMerge" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "levelOfContext" INTEGER NOT NULL DEFAULT 0;
