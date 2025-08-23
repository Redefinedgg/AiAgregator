/*
  Warnings:

  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'PREMIUM', 'PREMIUM_PLUS', 'PREMIUM_PLUS_PLUS', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "providerId" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';
