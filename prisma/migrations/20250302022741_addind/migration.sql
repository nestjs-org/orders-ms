-- DropForeignKey
ALTER TABLE "orderStripe" DROP CONSTRAINT "orderStripe_id_fkey";

-- AddForeignKey
ALTER TABLE "orderStripe" ADD CONSTRAINT "orderStripe_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
