-- CreateTable
CREATE TABLE "Jugador" (
    "id" SERIAL NOT NULL,
    "nombres" VARCHAR NOT NULL,
    "apellidos" VARCHAR NOT NULL,
    "nombre_corto" VARCHAR NOT NULL,
    "cedula" VARCHAR NOT NULL,
    "RH" VARCHAR NOT NULL,
    "telefono" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "talla_camiseta" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "edad" INTEGER,

    CONSTRAINT "Jugador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posicion" (
    "id" SERIAL NOT NULL,
    "posicion" TEXT NOT NULL,

    CONSTRAINT "Posicion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Jugador_RH_key" ON "Jugador"("RH");
