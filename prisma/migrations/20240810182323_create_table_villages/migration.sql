-- CreateTable
CREATE TABLE `villages` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `district_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `villages` ADD CONSTRAINT `villages_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `disctricts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
