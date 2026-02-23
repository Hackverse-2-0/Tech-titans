-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "description" DROP NOT NULL;
