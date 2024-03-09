/*
  Warnings:

  - You are about to drop the column `goles_a` on the `Partido_Jugadores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Partido_Jugadores" DROP COLUMN "goles_a",
ADD COLUMN     "goles_arquero" INTEGER;
