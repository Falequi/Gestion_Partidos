-- AddForeignKey
ALTER TABLE "Jugador_Posiciones" ADD CONSTRAINT "Jugador_Posiciones_id_jugador_fkey" FOREIGN KEY ("id_jugador") REFERENCES "Jugador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
