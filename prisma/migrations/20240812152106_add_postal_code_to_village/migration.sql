/*
  Warnings:

  - Added the required column `postal_code` to the `villages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `villages` ADD COLUMN `postal_code` VARCHAR(10) NOT NULL;
