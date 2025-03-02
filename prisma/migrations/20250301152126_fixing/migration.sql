/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `orderStripe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `orderStripe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderStripe" ADD COLUMN     "orderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orderStripe_orderId_key" ON "orderStripe"("orderId");
