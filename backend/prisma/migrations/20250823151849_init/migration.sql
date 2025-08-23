-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ALTER COLUMN "avatar" DROP NOT NULL;
