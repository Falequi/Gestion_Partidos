-- AddForeignKey
ALTER TABLE "Jugador_Posiciones" ADD CONSTRAINT "Jugador_Posiciones_id_posicion_fkey" FOREIGN KEY ("id_posicion") REFERENCES "Posicion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
