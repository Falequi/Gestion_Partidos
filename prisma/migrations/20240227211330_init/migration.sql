-- CreateTable
CREATE TABLE "Jugador_Posiciones" (
    "id" SERIAL NOT NULL,
    "id_jugador" INTEGER NOT NULL,
    "id_posicion" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Jugador_Posiciones_pkey" PRIMARY KEY ("id")
);
