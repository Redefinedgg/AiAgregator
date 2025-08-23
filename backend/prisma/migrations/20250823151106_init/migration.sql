-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "provider" SET DEFAULT 'local',
ALTER COLUMN "providerId" SET DEFAULT 'local';
