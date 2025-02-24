/*
  Warnings:

  - You are about to drop the column `productId` on the `orders` table. All the data in the column will be lost.
  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalItems` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('PENDING', 'DELIVERED', 'CANCELLED');

-- DropIndex
DROP INDEX "orders_id_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "productId",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "status" "STATUS" NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalItems" INTEGER NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "orders_id_seq";
