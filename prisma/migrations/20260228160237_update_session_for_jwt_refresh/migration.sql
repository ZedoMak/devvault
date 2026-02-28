/*
  Warnings:

  - You are about to drop the column `tokenHash` on the `sessions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "sessions_tokenHash_idx";

-- DropIndex
DROP INDEX "sessions_tokenHash_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "tokenHash",
ADD COLUMN     "isRevoked" BOOLEAN NOT NULL DEFAULT false;
