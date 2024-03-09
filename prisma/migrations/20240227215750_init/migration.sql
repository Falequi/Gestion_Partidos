-- CreateTable
CREATE TABLE "Partido" (
    "id" SERIAL NOT NULL,
    "fecha" TEXT NOT NULL,
    "lugar" TEXT NOT NULL,
    "hora" TEXT NOT NULL,

    CONSTRAINT "Partido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partido_jugadores" (
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

    CONSTRAINT "partido_jugadores_pkey" PRIMARY KEY ("id")
);
