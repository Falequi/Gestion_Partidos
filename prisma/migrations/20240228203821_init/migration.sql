/*
  Warnings:

  - Made the column `tipo` on table `Jugador` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Jugador" ALTER COLUMN "tipo" SET NOT NULL;
