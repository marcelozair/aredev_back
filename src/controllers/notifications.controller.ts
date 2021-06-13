import {Request, Response} from "express" 
import {getRepository} from "typeorm"
import { notifications } from "../entity/Notifications"

export const getNotifications = async (req: Request, res: Response) => {
  const notificationsAll = await getRepository(notifications).find()
  return res.json(notificationsAll)
}