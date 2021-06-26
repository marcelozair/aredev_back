import { FORMERR } from "dns";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { equipos } from "../entity/Equipos";
import { equipos_users } from "../entity/EquiposUsers";
import { iTeam } from "../models/equipos.model";
import { sendComplete, sendError } from "../service/sendingFormant";

export async function createTeam(req: Request, res: Response) {
 const { teamBody } = req.body;
 const repTeam = getRepository(equipos);

 if(!teamBody.name) return res.status(400).json(sendError("Se necesita un nombre para crear el grupo"));

 const structureTeam: any = getRepository(equipos).create(teamBody);
 const newTeam : iTeam = await getRepository(equipos).save(structureTeam)

 const ownerUser = {
  equipo_id: newTeam.id,
  user_id: req.body.userID,
  rol: 1
 }

 const structureOwnerUser = getRepository(equipos_users).create(ownerUser);
 await getRepository(equipos_users).save(structureOwnerUser)

 return res.status(200).json(sendComplete("Se creo el equipo correctamente"));

}

export async function addUsersToTeam(req: Request, res: Response){
 const { users_ids } = req.body;
 if(users_ids < 1) res.status(400).json(sendError());

 const team : iTeam | undefined = await getRepository(equipos).findOne(req.params.id)

 if(!team) return res.status(400).json(sendError());
 
 for(let user_id of users_ids) {
  const newUser = {
   equipo_id: team.id,
   user_id: user_id,
   rol: 3
  }

  const structureOwnerUser = getRepository(equipos_users).create(newUser);
  await getRepository(equipos_users).save(structureOwnerUser)
 }

 return res.status(200).json(sendComplete());

}