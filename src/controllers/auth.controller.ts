import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { users } from "../entity/Users"
import jsw from "jsonwebtoken"

import { config } from "./../config/config"
import { iUser, iUserCreate, iToken } from "../models/user.model"
import { comparePassword, createToken, passwordEncrypt } from "../service/service"

class ResultToken {

  message: string;
  expired: Boolean;
  user: any;

  constructor(message: string, expired: Boolean, user: any) {
    this.message = message;
    this.expired = expired;
    this.user = user;
  }
}

const getUserByEmail = async (email: string) => await getRepository(users).findOne({ email });

export const signup = async (req: Request, res: Response) => {
  const userDB = getRepository(users)

  const userFound: iUser | undefined = await getUserByEmail(req.body.email)
  if (userFound) return res.status(422).json({ message: "Este usuario ya esta registrado" })

  const password: string = await passwordEncrypt(req.body.password)

  const userCreate: iUserCreate = userDB.create({
    name: req.body.name,
    surname: req.body.surname,
    gender: req.body.gender,
    age: req.body.age,
    dedication: req.body.dedication,
    email: req.body.email,
    password,
    token: ""
  })

  const user: iUser = await userDB.save(userCreate)
  const token: string = await createToken(user.id)
  user.token = token
  const newUser = await userDB.save(user)
  return res.status(201).json(newUser)
}

export const signin = async (req: Request, res: Response) => {

  const { password, email } = req.body

  if (!email) return res.status(400).json({ message: "Algo salio mal" })

  const user: iUser | undefined = await getUserByEmail(email)
  if (!user) return res.status(400).json({ message: "Este usuario no esta registrado" })

  const isPassword: Boolean = await comparePassword(password, user.password)
  if (!isPassword) return res.status(400).json({ message: "contraseña incorrecta" })

  const token: string = await createToken(user.id)
  const AuthenticatedUser = await getRepository(users).save({ ...user, token })

  return res.status(200).json(AuthenticatedUser)
}

export const validatioToken = async (req: Request, res: Response) => {

  const token: string | undefined = req.headers.token

  if (!token || token === "null") {
    return res.status(400).json(new ResultToken("Token expirado", true, {}))
  }

  try {
    const dataToken: any = jsw.verify(token, config.KEY)
    const user: iUser | undefined = await getRepository(users).findOne({ id: dataToken.id })

    if (user && user.token !== token) {
      return (
        res.status(400).json(new ResultToken("Token expirado", true, {}))
      )
    }
    return res.status(200).json(new ResultToken("Token exitoso", false, user))
  } catch (error) {
    return res.status(400).json(new ResultToken("Token invalido", true, {}))
  }
}