import {Request, Response} from "express" 
import {getRepository} from "typeorm"
import { notas } from "../entity/Notas"
import { notas_users } from "../entity/NotasUsers"

export const createNota =  async (req: Request, res: Response) => {
  if(!req.body.userID) {
    return res.status(205).json({message: "Algo a salido mal"})
  }

  const bodyNota = {
    title: req.body.title ? req.body.title : "Nueva nota",
    body: req.body.body ? req.body.body : ""
  }

  const notaCreate = getRepository(notas).create(bodyNota)
  const nota = await getRepository(notas).save(notaCreate)

  const notaByUser = await getRepository(notas_users).create({
    user_id: Number(req.body.userID),
    nota_id: nota.id
  })

  await getRepository(notas_users).save(notaByUser);
  
  return res.json(nota)
}

export const getNotas = async (req: Request, res: Response) => {
  const notasForUser = await getRepository(notas_users).find({user_id: req.body.userID})
  const notaList: notas[] = []

  for(let nota of notasForUser) {
    const notaResult: undefined | notas = await getRepository(notas).findOne({id: nota.nota_id})
    
    if(notaResult)
      notaList.push(notaResult)
  }

  return res.json(notaList)
}

export const getNotaById = async (req: Request, res: Response) => {
  const nota = await getRepository(notas).findOne(req.params.id)
  if(!nota) return res.json({message: "Esa nota no existe"})
  const notaUser = await getRepository(notas_users)
    .createQueryBuilder("nu")
    .where("nu.nota_id = :nota_id", {nota_id: nota.id})
    .getOne()

  if(notaUser) {
    if(notaUser.user_id !== req.body.userID) return res.json({message: "No tienes permisos para hacer esto"})
  } else {
    return res.json({message: "Algo a salido mal"})
  }

  return res.json(nota)
}

export const updateNota = async (req: Request, res: Response) => {
  const notaModify = {
    title: req.body.title,
    body: req.body.body
  }

  const nota = await  getRepository(notas).findOne(req.params.id)
  if(!nota) return res.json({message: "Esa nota no existe"})
  
  const notaUser = await getRepository(notas_users)
    .createQueryBuilder("nu")
    .where("nu.nota_id = :nota_id", {nota_id: nota.id})
    .getOne()

  if(notaUser) {
    if(notaUser.user_id !== req.body.userID) return res.json({message: "No tienes permisos para hacer esto"})
  } else {
    return res.json({message: "Algo a salido mal"})
  }

  getRepository(notas).merge(nota, notaModify)
  const newNota = await getRepository(notas).save(nota)
  return res.json(newNota)
}

export const deleteNota = async (req: Request, res: Response) => {
  const deleteNota = await getRepository(notas).delete(req.params.id)
  if(!deleteNota.affected) res.json({message: "Está nota ya a sido eliminada"})

  return res.json({message: "Se elimino correctamente"})
}