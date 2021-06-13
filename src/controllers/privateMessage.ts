import { messages } from "./../entity/Messages"

import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

export async function sendMessage(req: Request, res: Response) {

  const { userID, sendingMessage } = req.body;


  if (!sendingMessage && !req.params.id && !sendingMessage.message) {
    return res.status(400).json({ message: "crear libreria para errores" })
  }

  console.log("yea")
  const message = {
    user_id: userID,
    sending_user_id: req.params.id,
    ...sendingMessage
  };

  const estrutureMessage = getRepository(messages).create(message);
  const saveMessage = await getRepository(messages).save(estrutureMessage);

  return res.status(200).json({ message: "crear libreria para tes"})

}