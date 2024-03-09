/*
  Warnings:

  - A unique constraint covering the columns `[cedula]` on the table `Jugador` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Jugador_cedula_key" ON "Jugador"("cedula");
