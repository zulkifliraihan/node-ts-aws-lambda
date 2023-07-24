/*
  Warnings:

  - You are about to alter the column `total_payment` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - Made the column `expiredAt` on table `Invoice` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Invoice` MODIFY `total_payment` INTEGER NOT NULL,
    MODIFY `expiredAt` DATETIME(3) NOT NULL;
