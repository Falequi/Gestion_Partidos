import { Router } from "express";
import { PartidoDatasourceImpl } from "../../infrastructure/datasource/partido.datasource.impl";
import { PartidoRepositoryImpl } from "../../infrastructure/repositories/partidos.repository.impl";
import { PartidosController } from "./partidos.controller";



export class PartidosRoutes{

    static get routes(): Router {

        const router = Router();
    
        const datasource = new PartidoDatasourceImpl();
        const partidoRepository = new PartidoRepositoryImpl( datasource );
        const partidosController = new PartidosController(partidoRepository);
    
        router.get('/', partidosController.getPartidos );
        router.get('/:id', partidosController.getPartidoById );
        
        router.post('/', partidosController.createPartido );
        router.put('/:id', partidosController.updatePartido );
        router.delete('/:id', partidosController.deletePartido );
    
    
        return router;
      }


}