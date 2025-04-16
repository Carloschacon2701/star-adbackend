/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `amount` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `amount` on the `stock` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `previous_amount` on the `stock` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to drop the `client_company` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company_id` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `client_company` DROP FOREIGN KEY `client_company_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `client_company` DROP FOREIGN KEY `client_company_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `sale_client_id_fkey`;

-- DropIndex
DROP INDEX `sale_client_id_fkey` ON `sale`;

-- AlterTable
ALTER TABLE `client` ADD COLUMN `company_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `company_id` INTEGER NOT NULL,
    MODIFY `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `product_stock` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `sale` ADD COLUMN `total` DOUBLE NOT NULL,
    MODIFY `amount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `stock` MODIFY `amount` INTEGER NOT NULL,
    MODIFY `previous_amount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `lastName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `client_company`;

-- AddForeignKey
ALTER TABLE `client` ADD CONSTRAINT `client_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
