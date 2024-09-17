/*
  Warnings:

  - You are about to drop the `disctricts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `token` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `disctricts` DROP FOREIGN KEY `disctricts_regency_id_fkey`;

-- DropForeignKey
ALTER TABLE `villages` DROP FOREIGN KEY `villages_district_id_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `token` VARCHAR(20) NOT NULL;

-- DropTable
DROP TABLE `disctricts`;

-- CreateTable
CREATE TABLE `districts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `regency_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `districts` ADD CONSTRAINT `districts_regency_id_fkey` FOREIGN KEY (`regency_id`) REFERENCES `regencies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `villages` ADD CONSTRAINT `villages_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `districts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
