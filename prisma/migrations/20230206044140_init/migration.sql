/*
  Warnings:

  - Added the required column `brand` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `models` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceName` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicePrice` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "models" TEXT NOT NULL,
ADD COLUMN     "serviceName" TEXT NOT NULL,
ADD COLUMN     "servicePrice" TEXT NOT NULL;
