/*
  Warnings:

  - Added the required column `commentToId` to the `ChildComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `childcomment` ADD COLUMN `commentToId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ChildComment` ADD CONSTRAINT `ChildComment_commentToId_fkey` FOREIGN KEY (`commentToId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
