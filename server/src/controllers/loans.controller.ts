import { RequestHandler } from "express";
import { QueryError } from "mysql2";
import Loan from "../models/loans";
import { connection1 } from "../db/connection";


export const list: RequestHandler = async (req, res) => {
    try {
        const loans = await Loan.findAll()
        return res.status(200).json(loans)
    } catch (error) {
        return res.status(500).json({"message":"Hubo un error", "error": error})
    }
}

export const create: RequestHandler = async (req, res) => {
    try {
        await Loan.create({...req.body})
        return res.status(200).json({"message":"Client save"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}

export const delet: RequestHandler = async (req, res) => {
    const {id} = req.params
    try {
        await Loan.destroy({where: {id}})
        return res.status(200).json({"message":"Client Destroy"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}

export  function loansConsult(){
    return new Promise((resolve, reject) => {
      const sql = 'Select id_wallet, loans.id, clients.name, clients.lastName, clients.email, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state, loans.value_initial, loans.value_end, loans.interest, loans.startLoan, loans.finishLoan, loans.dues, loans.duesValue, loans.paymentF from loans inner join clients on loans.id_client = clients.id ';
      
      connection1.query(sql, (error: QueryError, results:any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }

  export  function InsertLoan() {
    return new Promise((resolve, reject) => {
      const sql = '';
      
      connection1.query(sql, (error: QueryError, results: any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }