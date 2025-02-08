/*
  Warnings:

  - Made the column `equipo` on table `Partido_Jugadores` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Partido_Jugadores" ALTER COLUMN "equipo" SET NOT NULL,
ALTER COLUMN "equipo" SET DEFAULT '';
