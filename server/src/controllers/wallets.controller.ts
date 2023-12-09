import express,{ RequestHandler, Request, Response} from "express";
import { QueryError } from "mysql2";
import Wallet from "../models/wallets";
import { connection1 } from "../db/connection";


export const list: RequestHandler = async (req, res) => {
    const {id} = req.params
    try {
        const loans = await Wallet.findAll()
        return res.status(200).json(loans)
    } catch (error) {
        return res.status(500).json({"message":"Hubo un error", "error": error})
    }
}

export const create: RequestHandler = async (req, res) => {
    try {
        await Wallet.create({...req.body})
        return res.status(200).json({"message":"wallet save"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}

export const delet: RequestHandler = async (req, res) => {
    const {id} = req.params
    try {
        await Wallet.destroy({where: {id}})
        return res.status(200).json({"message":"wallet Destroy"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }

}
export  function walletsConsult(id:string) {
    return new Promise((resolve, reject) => {
      const sql = `Select loans.id, clients.name, clients.email, clients.lastName, clients.id_number, clients.address, clients.phone, clients.phone2, loans.state, loans.value_initial, loans.value_end, loans.interest from loans inner join clients join wallets join collectors  on loans.id_client = clients.id and loans.id_wallet = wallets.id and  wallets.id_collector = collectors.id  and wallets.id = ${id}`;
      
      connection1.query(sql, (error: QueryError, results: any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }

/*
  const app = express();

  app.get("/api/wallets/listjoin/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const results = await walletsConsult(id);
        res.json(results)
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).send('Error interno del servidor');
        
    }
} )*/
