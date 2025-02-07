-- CreateTable
CREATE TABLE "Encuesta_Partido" (
    "id" SERIAL NOT NULL,
    "id_partido_jugador" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "fecha_creacion" TEXT NOT NULL,

    CONSTRAINT "Encuesta_Partido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Votos_Partido_Jugador" (
    "id" SERIAL NOT NULL,
    "id_encuesta_partido" INTEGER NOT NULL,
    "id_jugador_calificado" INTEGER NOT NULL,
    "id_jugador_votante" INTEGER NOT NULL,
    "calificacion" INTEGER NOT NULL,

    CONSTRAINT "Votos_Partido_Jugador_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Encuesta_Partido" ADD CONSTRAINT "Encuesta_Partido_id_partido_jugador_fkey" FOREIGN KEY ("id_partido_jugador") REFERENCES "Partido_Jugadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votos_Partido_Jugador" ADD CONSTRAINT "Votos_Partido_Jugador_id_encuesta_partido_fkey" FOREIGN KEY ("id_encuesta_partido") REFERENCES "Encuesta_Partido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
