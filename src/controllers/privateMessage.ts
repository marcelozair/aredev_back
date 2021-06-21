import { messages } from "./../entity/Messages"

import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { sendComplete, sendError } from "../service/sendingFormant";
import { iMessage } from "../models/message.model";
import { users } from "../entity/Users";
import { salas } from "../entity/Salas";
import { contactos } from "../entity/Contactos";

export async function sendMessage(req: Request, res: Response) {
  const { userID, sendingMessage } = req.body;
  const salaId = req.params.id;
  
  if (!sendingMessage && !req.params.id) {
    return res.status(400).json(sendError())
  }

  if (sendingMessage.message.length === 0) return res.status(400).json(sendError())

  let sala = await getRepository(salas).findOne(salaId);
  if(!sala) {
    const user_contact = sendingMessage.user_seding_id
    const estructureSala = getRepository(salas).create({})
    const newSala =  await getRepository(salas).save(estructureSala)
    sala = newSala;

    const contactoUser = await getRepository(contactos)
      .createQueryBuilder("c")
      .where("c.user_id IN (:...userIds)", { userIds: [userID, user_contact] })
      .where("c.user_contact_id IN (:...userContactIds)", { userContactIds: [userID, user_contact] })
      .getOne()

     const contactAddSala = {
      ...contactoUser,
      sala_id: sala.id
     }

     await getRepository(contactos).save(contactAddSala)
  }

  const message = {
    user_id: userID,
    sala_id: sala.id,
    ...sendingMessage
  };

  const estrutureMessage = getRepository(messages).create(message);
  await getRepository(messages).save(estrutureMessage);

  return res.status(200).json(sendComplete("Se envio el mensaje correctamente"))
}

export async function deleteMessage(req: Request, res: Response) {
  const { id } = req.params;
  const messageDelete = await getRepository(messages).delete(id);

  if (messageDelete.affected != 1) {
    return res.status(400).json(sendError())
  }

  return res.json(sendComplete("Se elimino el mensaje"))
}

export async function getAllMessage(req: Request, res: Response) {
  const { id } = req.params;
  const userId: number = req.body.userID;

  let sala = await getRepository(salas).findOne(id);

  if(!sala) return res.status(400).json(sendError("No hay una sala de mensages registrada"))

  const queryResult = await getRepository(messages)
    .createQueryBuilder("m")
    .where("m.sala_id = :sala_id", { sala_id: sala.id })
    .getMany()

  /* 
    createQueryBuilder("user")
    .where("user.id IN (:...ids)", { ids: [1, 2, 3, 4] })
  */

  const sendingUser = await getRepository(users).findOne(id)

  const messagesAll = queryResult.map((msg: any) => {
    return ({
      id: msg.id,
      message: msg.message,
      send_time: msg.updated_at,
    })
  })

  return res.json({ user: sendingUser, messages: messagesAll })

}