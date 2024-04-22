-- AddForeignKey
ALTER TABLE "Partido" ADD CONSTRAINT "Partido_id_tipo_fkey" FOREIGN KEY ("id_tipo") REFERENCES "Tipo_Partido"("id") ON DELETE SET NULL ON UPDATE CASCADE;
