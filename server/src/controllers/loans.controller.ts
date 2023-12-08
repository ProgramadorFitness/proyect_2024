import { RequestHandler } from "express";
import { Loans} from "../models/loans.models";
import connectioDB, {connection1} from "../connection/connection";
import { QueryError } from "mysql2";


export const list: RequestHandler = async (req, res) => {
    try {
        const loans: Loans[] = await Loans.findAll()
        return res.status(200).json(loans)
    } catch (error) {
        return res.status(500).json({"message":"Hubo un error", "error": error})
    }
}

export const create: RequestHandler = async (req, res) => {
    try {
        await Loans.create({...req.body})
        return res.status(200).json({"message":"Client save"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}

export const delet: RequestHandler = async (req, res) => {
    const {id} = req.params
    try {
        await Loans.destroy({where: {id}})
        return res.status(200).json({"message":"Client Destroy"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}

export  function loansConsult(): Promise<Loans[]> {
    return new Promise((resolve, reject) => {
      const sql = 'Select loans.id, clients.name, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state, loans.value_initial, loans.value_end, loans.interest from loans inner join clients on loans.id_client = clients.id ';
      
      connection1.query(sql, (error: QueryError, results: Loans[]) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }

  export  function InsertLoan(): Promise<Loans[]> {
    return new Promise((resolve, reject) => {
      const sql = '';
      
      connection1.query(sql, (error: QueryError, results: Loans[]) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }