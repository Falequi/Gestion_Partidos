/*
  Warnings:

  - You are about to drop the column `id_telegram` on the `Partido_Jugadores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Jugador" ADD COLUMN     "id_telegram" TEXT;

-- AlterTable
ALTER TABLE "Partido_Jugadores" DROP COLUMN "id_telegram";
