-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_key" ON "orders"("id");
