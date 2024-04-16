import { Request, Response } from 'express';
import {
  CreateJugador, DeleteJugador, GetJugador, GetJugadorCedula, GetJugadorId,
  GetJugadorIdTelegram, GetJugadores, JugadorRepository, UpdateJugador
} from '../../domain';
import { CreateJugadorDto, UpdateJugadorDto } from '../../domain/dto';



export class JugadoresController {

  //* DI
  constructor(
    private readonly jugadorRepository: JugadorRepository,
  ) { }

  public getJugadorIdTelegram = (req: Request, res: Response) => {
    const id_telegram = req.params.id_telegram;

    new GetJugadorIdTelegram(this.jugadorRepository)
      .execute(id_telegram)
      .then(jugador => res.json(jugador))
      .catch(error => res.status(400).json({ error }));
  }

  public getJugadorCedula = (req: Request, res: Response) => {
    const cedula = req.params.cedula;
    new GetJugadorCedula(this.jugadorRepository)
      .execute(cedula)
      .then(jugador => res.json(jugador))
      .catch(error => res.status(400).json({ error }));

  }


  public getJugadores = (req: Request, res: Response) => {

    new GetJugadores(this.jugadorRepository)
      .execute()
      .then(todos => res.json(todos))
      .catch(error => res.status(400).json({ error }));

  };

  public getJugadorId = (req: Request, res: Response) => {

    const nombre_corto = req.params.nombre_corto;

    new GetJugadorId(this.jugadorRepository)
      .execute(nombre_corto)
      .then(jugador => res.json(jugador))
      .catch(error => res.status(400).json({ error }));
  }

  public getJugadorById = (req: Request, res: Response) => {

    const id = +req.params.id;
    new GetJugador(this.jugadorRepository)
      .execute(id)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }));

  };

  public createJugador = (req: Request, res: Response) => {

    const [error, createJugadorDto] = CreateJugadorDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateJugador(this.jugadorRepository)
      .execute(createJugadorDto!)
      .then(jugador => res.json(jugador))
      .catch(error => res.status(400).json({ error }));
  };

  public updateJugador = (req: Request, res: Response) => {

    const id = +req.params.id;
    const [error, updateJugadorDto] = UpdateJugadorDto.create({ ...req.body, id });
    

    if (error) return res.status(400).json({ error });

    new UpdateJugador(this.jugadorRepository)
      .execute(updateJugadorDto!)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }));

  };


  public deleteJugador = (req: Request, res: Response) => {
    const id = +req.params.id;

    new DeleteJugador(this.jugadorRepository)
      .execute(id)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }));

  };

} 