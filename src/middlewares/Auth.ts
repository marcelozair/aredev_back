import {Request, Response, NextFunction} from "express"

import { config } from "../config/config"
import jsw from "jsonwebtoken"


export function isAuthenticated (req: Request, res:Response, next: NextFunction) {
  const token: any = req.headers["token"]
  if(!token) return res.json({message: "No permisos para realizar esta acción"})
  
  try {
    const dataToken: any = jsw.verify(token, config.KEY)
    req.body.userID = dataToken.id
    next();
  } catch(err) {
    return res.json({message: "algo salio mal", error: err})
  }

}