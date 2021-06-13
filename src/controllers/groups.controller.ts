import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { users } from "../entity/Users"

export const getUser = async (req: Request, res: Response) => {
  const user = await getRepository(users).findOne(req.params.id)
  if (!user) return res.status(400).json({ message: "user not found" })
  return res.status(200).json(user)
}