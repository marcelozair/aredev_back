import { messages } from "./../entity/Messages"

import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { sendComplete, sendError } from "../service/sendingFormant";

export async function sendMessage(req: Request, res: Response) {

  const { userID, sendingMessage } = req.body;
  
  if (!sendingMessage && !req.params.id ) {
    return res.status(400).json(sendError())
  }
  
  if(sendingMessage.message.length === 0) return res.status(400).json(sendError())
  
  const message = {
    user_id: userID,
    sending_user_id: req.params.id,
    ...sendingMessage
  };

  const estrutureMessage = getRepository(messages).create(message);
  await getRepository(messages).save(estrutureMessage);

  return res.status(200).json(sendComplete("Se envio el mensaje correctamente"))

}