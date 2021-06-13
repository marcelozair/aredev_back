import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { config } from "../config/config"

export const passwordEncrypt = async (password: string) => {
  const encrtpy = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, encrtpy)
}

export const createToken = async (id: number) => {
  const payload = {id}
  return jwt.sign(payload, config.KEY, {
    expiresIn: (60 * 60) * 24
  })
}

export const comparePassword = async (curentPass: string, pass: string) => (
  await bcrypt.compare(curentPass, pass)
)
