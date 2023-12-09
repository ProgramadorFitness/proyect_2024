import { QueryError } from "sequelize";
import { connection1 } from "../db/connection";
import Client from "../models/clients";
import { Request, RequestHandler, Response } from "express";



export const list: RequestHandler = async (req: Request, res: Response) => {
    try {
        const clients = await Client.findAll()
        return res.status(200).json(clients)
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}

export const create: RequestHandler = async (req: Request, res: Response) => {
  
  try {
      await Client.create({ ...req.body })
      console.log(req)
      return res.status(200).json({"message":"Client save"})
  } catch (error) {
      return res.status(500).json({"message": "Hubo un error", "error": error})
  }
}


export  function ClientsConsult(id:string) {
    
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM clients WHERE id_number LIKE '%${id}%'`;
      
      connection1.query(sql, (error: QueryError, results: any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }