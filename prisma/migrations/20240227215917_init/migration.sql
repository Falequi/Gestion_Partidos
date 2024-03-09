/*
  Warnings:

  - You are about to drop the `partido_jugadores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "partido_jugadores";

-- CreateTable
CREATE TABLE "Partido_Jugadores" (
    "id" SERIAL NOT NULL,
    "id_jugador" INTEGER NOT NULL,
    "id_partido" INTEGER NOT NULL,
    "equipo" TEXT NOT NULL,
    "tarjea_amarilla" INTEGER NOT NULL,
    "tarjeta_roja" INTEGER NOT NULL,
    "goles" INTEGER NOT NULL,
    "autogoles" INTEGER NOT NULL,
    "comentarios" INTEGER NOT NULL,
    "calificacion" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Partido_Jugadores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Partido_Jugadores" ADD CONSTRAINT "Partido_Jugadores_id_jugador_fkey" FOREIGN KEY ("id_jugador") REFERENCES "Jugador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partido_Jugadores" ADD CONSTRAINT "Partido_Jugadores_id_partido_fkey" FOREIGN KEY ("id_partido") REFERENCES "Partido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
