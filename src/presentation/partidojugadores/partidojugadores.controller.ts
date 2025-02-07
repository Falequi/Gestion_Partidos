import { Request, Response } from 'express';
import {
    PartidoJugadoresRepository, AsistenciaPartidos, CalificacionPorPartidoJugador, CreateAllPartidoJugadores,
    CreatePartidoJugadoresIdJugadorIdPartido,
    CreatePartidoJugadores, DeletePartidoJugadores, DeletePartidoJugadoresIdjugadorIdPartido,
    GetPartidoJugador, GetPartidosJugadores, Goleador, GoleadorPorPartido, PartidosGanadosComoDT,
    PartidosGanadosPorJugador, TarjetasAmarillas, TarjetasRojas, UpdateAllPartidoJugadores,
    UpdatePartidoJugadores, VayaMenosVencida,
    GetPartidosJugadoresIdpartido,
    PartidosMarcador
} from '../../domain';
import { CreatePartidoJugadoresDto } from '../../domain/dto/partido_jugadores/create-partidojugadores-dto';
import { UpdatePartidoJugadoresDto } from '../../domain/dto/partido_jugadores/update-partidojugadores-dto';
import { GetPartidosJugadoresIdjugadorIdpartido } from '../../domain/uses-cases/partidosjugadores/get-partidojugadores-idjugador-idpartido';


export class PartidoJugadoresController {

    constructor(
        private readonly partidoJugadoresRepository: PartidoJugadoresRepository,
    ) { }

    public getPartidoJugadoresByIdPartido = (req: Request, res: Response) => {

        const id_partido = +req.params.id_partido;

        new GetPartidosJugadoresIdpartido(this.partidoJugadoresRepository)
            .execute(id_partido)
            .then(partidojugador => res.json(partidojugador))
            .catch(error => res.status(400).json({ error }));

    };

    public getPartidoJugadoresByIdJugadorIdPartido = (req: Request, res: Response) => {

        const id_jugador = +req.params.id_jugador;
        const id_partido = +req.params.id_partido;

        new GetPartidosJugadoresIdjugadorIdpartido(this.partidoJugadoresRepository)
            .execute(id_jugador, id_partido)
            .then(partidojugador => res.json(partidojugador))
            .catch(error => res.status(400).json({ error }));

    };

    public deletePartidoJugadoresIdJugadorIdPartido = (req: Request, res: Response) => {

        const id_jugador = +req.params.id_jugador;
        const id_partido = +req.params.id_partido;

        new DeletePartidoJugadoresIdjugadorIdPartido(this.partidoJugadoresRepository)
            .execute(id_jugador, id_partido)
            .then(partidojugadores => res.json(partidojugadores))
            .catch(error => res.status(400).json({ error }));
    };

    public createPartidoJugadoresIdJugadorIdPartido = (req: Request, res: Response) => {

        const [error, createPartidoJugadoresDto] = CreatePartidoJugadoresDto.create(req.body);

        if (error) return res.status(400).json({ error })

        new CreatePartidoJugadoresIdJugadorIdPartido(this.partidoJugadoresRepository)
            .execute(createPartidoJugadoresDto!)
            .then(PartidoJugador => res.json(PartidoJugador))
            .catch(error => res.json({ error }))
    };


    public getAsistenciaPartidos = (req: Request, res: Response) => {
        new AsistenciaPartidos(this.partidoJugadoresRepository)
            .execute()
            .then(asistenciapartidos => res.json(asistenciapartidos))
            .catch(error => res.status(400).json({ error }));
    };

    public getCalificacionPorPartidoJugador = (req: Request, res: Response) => {
        const fecha = req.body.fecha;
        new CalificacionPorPartidoJugador(this.partidoJugadoresRepository)
            .execute(fecha)
            .then(calificacionPorPartido => res.json(calificacionPorPartido))
            .catch(error => res.status(400).json({ error }));
    };

    public getGoleador = (req: Request, res: Response) => {
        new Goleador(this.partidoJugadoresRepository)
            .execute()
            .then(goleadores => res.json(goleadores))
            .catch(error => res.status(400).json({ error }));
    };

    public getGoleadorPorPartido = (req: Request, res: Response) => {
        const fecha = req.body.fecha;
        new GoleadorPorPartido(this.partidoJugadoresRepository)
            .execute(fecha)
            .then(goleadorPorPartido => res.json(goleadorPorPartido))
            .catch(error => res.status(400).json({ error }));
    };

    public getPartidoGanadosComoDt = (req: Request, res: Response) => {
        new PartidosGanadosComoDT(this.partidoJugadoresRepository)
            .execute()
            .then(partidoGanadoComoDT => res.json(partidoGanadoComoDT))
            .catch(error => res.status(400).json({ error }));
    };

    public getPartidoGanadosPorJugador = (req: Request, res: Response) => {
        new PartidosGanadosPorJugador(this.partidoJugadoresRepository)
            .execute()
            .then(partidoGanadoPorJugador => res.json(partidoGanadoPorJugador))
            .catch(error => res.status(400).json({ error }));
    };

    public getVayaMenosVencida = (req: Request, res: Response) => {
        new VayaMenosVencida(this.partidoJugadoresRepository)
            .execute()
            .then(vayaMenosVencida => res.json(vayaMenosVencida))
            .catch(error => res.status(400).json({ error }));
    };

    public getTarjetasAmarillas = (req: Request, res: Response) => {
        new TarjetasAmarillas(this.partidoJugadoresRepository)
            .execute()
            .then(tarjetaAmarilla => res.json(tarjetaAmarilla))
            .catch(error => res.status(400).json({ error }));
    };

    public getTarjetasRojas = (req: Request, res: Response) => {
        new TarjetasRojas(this.partidoJugadoresRepository)
            .execute()
            .then(tarjetaRoja => res.json(tarjetaRoja))
            .catch(error => res.status(400).json({ error }));
    };

    public getPartidoJugadores = (req: Request, res: Response) => {
        new GetPartidosJugadores(this.partidoJugadoresRepository)
            .execute()
            .then(partidojugadores => res.json(partidojugadores))
            .catch(error => res.status(400).json({ error }));
    };

    public getPartidoJugadoresById = (req: Request, res: Response) => {

        const id = +req.params.id;


        new GetPartidoJugador(this.partidoJugadoresRepository)
            .execute(id)
            .then(partidojugador => res.json(partidojugador))
            .catch(error => res.status(400).json({ error }));

    };

    public createPartidoJugadores = (req: Request, res: Response) => {

        const [error, createPartidoJugadoresDto] = CreatePartidoJugadoresDto.create(req.body);
        const { nombre_corto } = req.body;
        const { fecha } = req.body;

        if (error) return res.status(400).json({ error })

        new CreatePartidoJugadores(this.partidoJugadoresRepository)
            .execute(createPartidoJugadoresDto!, nombre_corto, fecha)
            .then(PartidoJugador => res.json(PartidoJugador))
            .catch(error => res.json({ error }))
    };

    public createAllPartidoJugadores = (req: Request, res: Response) => {

        new CreateAllPartidoJugadores(this.partidoJugadoresRepository)
            .execute(req.body)
            .then(PartidoJugador => res.json(PartidoJugador))
            .catch(error => res.json({ error }))
    };

    public updatePartidoJugadores = (req: Request, res: Response) => {

        const id = +req.params.id;

        const [error, updatePartidoJugadoresDto] = UpdatePartidoJugadoresDto.create({ ...req.body, id });

        
        if (error) return res.status(400).json({ error });
        
        new UpdatePartidoJugadores(this.partidoJugadoresRepository)
            .execute(updatePartidoJugadoresDto!)
            .then(partidojugadores => res.json(partidojugadores))
            .catch(error => res.status(400).json({ error }));


    };

    public deletePartidoJugadores = (req: Request, res: Response) => {

        const id = +req.params.id;

        new DeletePartidoJugadores(this.partidoJugadoresRepository)
            .execute(id)
            .then(partidojugadores => res.json(partidojugadores))
            .catch(error => res.status(400).json({ error }));
    };

    public updatePartidoJugadoresAll = (req: Request, res: Response) => {
        new UpdateAllPartidoJugadores(this.partidoJugadoresRepository)
            .execute(req.body)
            .then(partidoJugadores => res.json(partidoJugadores))
            .catch(error => res.status(400).json({ error }))
    }

    public getPartidosMarcadores = (req: Request, res: Response) => {
        new PartidosMarcador(this.partidoJugadoresRepository)
            .execute()
            .then(partidosMarcador => res.json(partidosMarcador))
            .catch(error => res.status(400).json({ error }))
    }

}