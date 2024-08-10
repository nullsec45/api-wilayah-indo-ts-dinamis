-- CreateTable
CREATE TABLE `disctricts` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `regency_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `disctricts` ADD CONSTRAINT `disctricts_regency_id_fkey` FOREIGN KEY (`regency_id`) REFERENCES `regencies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
