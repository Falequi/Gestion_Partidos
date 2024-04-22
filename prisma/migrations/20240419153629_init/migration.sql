-- AlterTable
ALTER TABLE "Partido" ADD COLUMN     "id_tipo" INTEGER;

-- CreateTable
CREATE TABLE "Tipo_Partido" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Tipo_Partido_pkey" PRIMARY KEY ("id")
);
