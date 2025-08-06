/*
  Warnings:

  - Made the column `parent_id` on table `node` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `node` MODIFY `parent_id` INTEGER NOT NULL;
