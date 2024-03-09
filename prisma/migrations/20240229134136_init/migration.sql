/*
  Warnings:

  - You are about to drop the column `tarjea_amarilla` on the `Partido_Jugadores` table. All the data in the column will be lost.
  - Added the required column `tarjeta_amarilla` to the `Partido_Jugadores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partido_Jugadores" DROP COLUMN "tarjea_amarilla",
ADD COLUMN     "tarjeta_amarilla" INTEGER NOT NULL;
