/*
  Warnings:

  - You are about to drop the column `PaidAt` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Invoice` DROP COLUMN `PaidAt`,
    ADD COLUMN `paidAt` DATETIME(3) NULL;
