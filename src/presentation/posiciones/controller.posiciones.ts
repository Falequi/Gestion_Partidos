import { Request, Response } from "express";
import { CreatePosicion, DeletePosicion, GetPosicion, GetPosiciones, PosicionRepository, UpdatePosicion } from "../../domain";
import { CreatePosicionDto, UpdatePosicionDto } from "../../domain/dto";


export class PosicionesController {

    constructor(
        private readonly posicioneRepository: PosicionRepository
    ){}

    public getPosiciones = (req: Request, res: Response) =>{  
        new GetPosiciones( this.posicioneRepository)
        .execute( )
        .then( posicion => res.json(posicion))
        .catch( error => res.status(400).json({ error }));
        
    }

    public getPosicionById = (req: Request, res: Response) =>{

        const id = +req.params.id;

        new GetPosicion( this.posicioneRepository)
        .execute( id )
        .then( posicion => res.json(posicion))
        .catch( error => res.status(400).json({ error }));
    }

    public createPosicion = (req: Request, res: Response) =>{

        const [error, createPosicionDto] = CreatePosicionDto.create(req.body);
        if(error) return res.status(400).json({ error });
        
        new CreatePosicion( this.posicioneRepository)
        .execute( createPosicionDto! )
        .then( posicion => res.json(posicion))
        .catch( error => res.status(400).json({ error }));
    }
    public updatePosicion = (req: Request, res: Response) =>{

        const id = +req.params.id;
        const [error, updatePosicionDto] = UpdatePosicionDto.create({...req.body, id });

        if(error) return res.status(400).json({ error });
        
        new UpdatePosicion( this.posicioneRepository)
        .execute( updatePosicionDto! )
        .then( posicion => res.json(posicion))
        .catch( error => res.status(400).json({ error,"mesaje":"error" }));

    }
    public deletePosicion = (req: Request, res: Response) =>{
        const id = +req.params.id;
        
        new DeletePosicion( this.posicioneRepository)
        .execute( id )
        .then( posicion => res.json(posicion))
        .catch( error => res.status(400).json({ error }));
    }

}