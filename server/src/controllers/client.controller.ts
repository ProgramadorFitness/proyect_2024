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

export const One: RequestHandler = async (req: Request, res: Response) => {
  const {id} = req.params
  try {
      const clients = await Client.findOne({where: {id:id}})
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

export const update: RequestHandler = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {body} = req;

  try {
  const client = await Client.findByPk(id);
    if(client){
      await client.update(body)
      return res.status(200).json({"message":"Client update"})
    }else{
      res.status(404).json({
        msg: "No existe este cliente"
      })
    }      
  } catch (error) {
      return res.status(500).json({"message": "Hubo un error", "error": error})
  }
}


export  function ClientsConsult(id:string) {
    
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM clients WHERE id_number LIKE '%${id}%' LIMIT 1`;
      
      connection1.query(sql, (error: QueryError, results: any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }