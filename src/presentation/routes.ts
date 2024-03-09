import { Router } from "express";

import { JugadoresRoutes } from "./jugadores/routes";
import { PosicionesRoutes } from "./posiciones/routes";
import { PartidosRoutes } from "./partidos/router";
import { PartidoJugadoresRoutes } from "./partidojugadores/routes";




export class AppRoutes {
    static get routes(): Router{
        const router = Router();

        router.use('/jugadores', JugadoresRoutes.routes );
        router.use('/posiciones', PosicionesRoutes.routes );
        router.use('/partidos', PartidosRoutes.routes );
        router.use('/partido_jugadores', PartidoJugadoresRoutes.routes );
        
        return router;
    }
}