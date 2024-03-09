-- AlterTable
ALTER TABLE "Partido_Jugadores" ALTER COLUMN "tarjeta_roja" DROP NOT NULL,
ALTER COLUMN "goles" DROP NOT NULL,
ALTER COLUMN "autogoles" DROP NOT NULL,
ALTER COLUMN "comentarios" DROP NOT NULL,
ALTER COLUMN "calificacion" DROP NOT NULL,
ALTER COLUMN "tarjeta_amarilla" DROP NOT NULL;
