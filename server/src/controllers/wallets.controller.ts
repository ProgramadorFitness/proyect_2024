import express,{ RequestHandler, Request, Response} from "express";
import { QueryError } from "mysql2";
import Wallet from "../models/wallets";
import { connection1 } from "../models/db/connection";
import Loan from "../models/loans";
import { Sequelize, Op } from 'sequelize'; // Importa Sequelize y Op de sequelize



export const list: RequestHandler = async (req, res) => {
    const {id} = req.params
    try {
        const loans = await Wallet.findAll()
        return res.status(200).json(loans)
    } catch (error) {
        return res.status(500).json({"message":"Hubo un error", "error": error})
    }
}

export  function listOne() {
    return new Promise((resolve, reject) => {
  const sql = 'SELECT COUNT(*) AS loans, id_wallet as id, capital FROM loans, wallets where loans.id_wallet = wallets.id GROUP BY id_wallet'    
    connection1.query(sql, (error: QueryError, results: any) => {
      if (error) {
          reject(error);
        } else {
          resolve(results);
        }
    })
  });
}

export const One: RequestHandler = async (req: Request, res: Response) => {
  const {id} = req.params
  try {
      const wallets = await Wallet.findOne({where: {id:id}})
      return res.status(200).json(wallets)
  } catch (error) {
      return res.status(500).json({"message": "Hubo un error", "error": error})
  }
}

export const update: RequestHandler = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {body} = req;

  try {
  const wallets = await Wallet.findByPk(id);
    if(wallets){
      await wallets.update(body)
      return res.status(200).json({"message":"wallet update"})
    }else{
      res.status(404).json({
        msg: "No existe esta wallet"
      })
    }      
  } catch (error) {
      return res.status(500).json({"message": "Hubo un error", "error": error})
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
      const sql = `Select loans.id, clients.name, clients.email, clients.lastName, clients.id_number, clients.address, clients.phone, clients.phone2, loans.state, loans.value_initial, loans.value_end, loans.interest from loans inner join clients join wallets join collectors  on loans.id_client = clients.id and loans.id_wallet = wallets.id and wallets.id = collectors.id_wallet and wallets.id = ${id}`;
      
      connection1.query(sql, (error: QueryError, results: any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }

  export  function walletsjOIN() {
    return new Promise((resolve, reject) => {
      const sql = 'select count(loans.id) as loans, wallets.id as id, wallets.capital from wallets inner join loans on wallets.id = loans.id_wallet';
      
      connection1.query(sql, (error: QueryError, results: any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }

  export  function walletsConsultUser(id:string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT id_wallet FROM collectors WHERE id = ${id}`;
      
      connection1.query(sql, (error: QueryError, results: any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }

  export  function walletsConsultUserName(id:string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT name, lastName, id_wallet FROM collectors WHERE id_wallet = ${id}`;
      
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
