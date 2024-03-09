import { Router } from "express";
import { PosicionesController } from "./controller.posiciones";
import { PosicionDatasourceImpl } from '../../infrastructure/datasource/posicion.datasource.impl';
import { PosicionRepositoryImpl } from "../../infrastructure/repositories/posicions.repository.impl";

export class PosicionesRoutes{

    static get routes(): Router{
        const router = Router();

        const datasource = new PosicionDatasourceImpl();
        const posicionRepository = new PosicionRepositoryImpl( datasource );
        const posicionesController = new PosicionesController( posicionRepository );

        router.get('/', posicionesController.getPosiciones);
        router.get('/:id', posicionesController.getPosicionById);

        router.post('/', posicionesController.createPosicion);
        router.put('/:id', posicionesController.updatePosicion);
        router.delete('/:id', posicionesController.deletePosicion);

        return router;
        
    }
}