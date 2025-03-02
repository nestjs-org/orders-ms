/*
  Warnings:

  - A unique constraint covering the columns `[receipt]` on the table `orderStripe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receipt` to the `orderStripe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderStripe" ADD COLUMN     "receipt" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orderStripe_receipt_key" ON "orderStripe"("receipt");
