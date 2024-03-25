import { Router } from "express";
import { JugadoresController } from "./controller.jugadores";
import { JugadorDatasourceImpl } from "../../infrastructure/datasource/jugador.datasource.impl";
import { JugadorRepositoryImpl } from "../../infrastructure/repositories/jugadores.repository.impl";



export class JugadoresRoutes{

    static get routes(): Router {

        const router = Router();
    
        const datasource          = new JugadorDatasourceImpl();
        const jugadorRepository   = new JugadorRepositoryImpl( datasource );
        const jugadoresController = new JugadoresController(jugadorRepository);
    
        router.get('/', jugadoresController.getJugadores );
        router.get('/:id', jugadoresController.getJugadorById );
        router.get('/id_jugador/pornombrecorto/:nombre_corto', jugadoresController.getJugadorId );
        router.get('/jugadorporcedula/:cedula', jugadoresController.getJugadorCedula );
        router.get('/jugadoridteletram/:id_telegram', jugadoresController.getJugadorIdTelegram );
        
        router.post('/', jugadoresController.createJugador );
        router.put('/:id', jugadoresController.updateJugador );
        router.delete('/:id', jugadoresController.deleteJugador );
    
    
        return router;
      }


}