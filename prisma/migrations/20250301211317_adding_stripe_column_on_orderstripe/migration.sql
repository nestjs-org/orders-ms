/*
  Warnings:

  - A unique constraint covering the columns `[stripeId]` on the table `orderStripe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeId` to the `orderStripe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderStripe" ADD COLUMN     "stripeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orderStripe_stripeId_key" ON "orderStripe"("stripeId");
