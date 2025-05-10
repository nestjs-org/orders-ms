-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('PENDING', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "totalItems" INTEGER NOT NULL,
    "paidAt" TIMESTAMP(3),
    "status" "STATUS" NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderItem" (
    "id" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ordersId" TEXT NOT NULL,

    CONSTRAINT "orderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderStripe" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "stripeId" TEXT NOT NULL,
    "receipt" TEXT NOT NULL,

    CONSTRAINT "orderStripe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orderStripe_orderId_key" ON "orderStripe"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "orderStripe_stripeId_key" ON "orderStripe"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "orderStripe_receipt_key" ON "orderStripe"("receipt");

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderStripe" ADD CONSTRAINT "orderStripe_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
