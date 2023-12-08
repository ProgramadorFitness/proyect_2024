import express,{ RequestHandler, Request, Response} from "express";
import { Wallets} from "../models/wallets.models";
import connectioDB, {connection1} from "../connection/connection";
import { Loans } from "../models/loans.models";
import { QueryError } from "mysql2";
import app from "../app";

export const list: RequestHandler = async (req, res) => {
    const {id} = req.params
    try {
        const loans: Wallets[] = await Wallets.findAll()
        return res.status(200).json(loans)
    } catch (error) {
        return res.status(500).json({"message":"Hubo un error", "error": error})
    }
}

export const create: RequestHandler = async (req, res) => {
    try {
        await Wallets.create({...req.body})
        return res.status(200).json({"message":"wallet save"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}

export const delet: RequestHandler = async (req, res) => {
    const {id} = req.params
    try {
        await Wallets.destroy({where: {id}})
        return res.status(200).json({"message":"wallet Destroy"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }

}
export  function walletsConsult(id:string): Promise<Wallets[]> {
    return new Promise((resolve, reject) => {
      const sql = `Select * from loans inner join clients join wallets join collectors join users on loans.id_client = clients.id and loans.id_wallet = wallets.id and  wallets.id_collector = collectors.id and collectors.id_user = users.id and wallets.id = ${id}`;
      
      connection1.query(sql, (error: QueryError, results: Wallets[]) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }



 /* app.get("/api/wallets/listjoin", async (req: Request, res: Response, any) => {
    try {
        const results: Wallets[] = await realizarConsulta();
        res.json(results)
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).send('Error interno del servidor');
        
    }
} )*/
