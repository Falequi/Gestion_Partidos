import { Router } from "express";
import { PartidoJugadoresDatasourceImpl } from '../../infrastructure/datasource/partidojugadores.datasource.impl';
import { PartidoJugadoresRepositoryImp } from '../../infrastructure/repositories/partidojugadores.repository.imp';
import { PartidoJugadoresController } from "./partidojugadores.controller";


export class PartidoJugadoresRoutes{
    
    static get routes(): Router{
        
        const router = Router();

        const datasource = new PartidoJugadoresDatasourceImpl();
        const partidoJugadoresRepository = new PartidoJugadoresRepositoryImp(datasource);
        const partidoJugadoresController = new PartidoJugadoresController(partidoJugadoresRepository);

        router.get('/', partidoJugadoresController.getPartidoJugadores);
        router.get('/:id', partidoJugadoresController.getPartidoJugadoresById);

        router.post('/', partidoJugadoresController.createPartidoJugadores);
        router.post('/crearvarios', partidoJugadoresController.createAllPartidoJugadores);
        router.post('/actualizarvarios', partidoJugadoresController.updatePartidoJugadoresAll);
        router.put('/:id', partidoJugadoresController.updatePartidoJugadores);
        router.delete('/:id', partidoJugadoresController.deletePartidoJugadores);

        router.post('/asistencia_partidos',partidoJugadoresController.getAsistenciaPartidos);
        router.post('/calificacion_por_partidoj_jugador',partidoJugadoresController.getCalificacionPorPartidoJugador);
        router.post('/goleador',partidoJugadoresController.getGoleador);
        router.post('/goleador_por_partido',partidoJugadoresController.getGoleadorPorPartido);
        router.post('/partido_ganados_como_dt',partidoJugadoresController.getPartidoGanadosComoDt);
        router.post('/partido_ganados_por_jugador',partidoJugadoresController.getPartidoGanadosPorJugador);
        router.post('/vaya_menos_vencida',partidoJugadoresController.getVayaMenosVencida);
        router.post('/tarjetas_amarillas',partidoJugadoresController.getTarjetasAmarillas);
        router.post('/tarjetas_rojas',partidoJugadoresController.getTarjetasRojas);

        return router;
    }
}