/*
  Warnings:

  - You are about to drop the `Estado` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sigla` to the `Posicion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posicion" ADD COLUMN     "sigla" TEXT NOT NULL;

-- DropTable
DROP TABLE "Estado";
