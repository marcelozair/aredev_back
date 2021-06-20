import { messages } from "./../entity/Messages"

import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { sendComplete, sendError } from "../service/sendingFormant";
import { iMessage } from "../models/message.model";
import { users } from "../entity/Users";

export async function sendMessage(req: Request, res: Response) {

  const { userID, sendingMessage } = req.body;

  if (!sendingMessage && !req.params.id) {
    return res.status(400).json(sendError())
  }

  if (sendingMessage.message.length === 0) return res.status(400).json(sendError())

  const message = {
    user_id: userID,
    sending_user_id: req.params.id,
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

  const queryResult = await getRepository(messages)
    .createQueryBuilder("m")
    .where("m.user_id IN (:...userIds)", { userIds: [userId, id] })
    .where("m.sending_user_id IN (:sending_user_id)", { sending_user_id: [userId, id] })
    .getMany()

  /* 
    createQueryBuilder("user")
    .where("user.id IN (:...ids)", { ids: [1, 2, 3, 4] })
  */

  const sendingUser = await getRepository(users).findOne(id)

  const messagesAll = queryResult.map((msg: iMessage) => {
    return ({
      id: msg.id,
      url: msg.url,
      message: msg.message,
      send_time: msg.updated_at,
    })
  })

  return res.json({ user: sendingUser, messages: messagesAll })

}