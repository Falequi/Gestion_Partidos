/*
  Warnings:

  - Added the required column `estado` to the `Jugador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jugador" ADD COLUMN     "estado" BOOLEAN NOT NULL;
