-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "alreadyUsedContext" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "smartMerges" INTEGER NOT NULL DEFAULT 0;
