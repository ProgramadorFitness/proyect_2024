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
        const loans = await Loan.create({...req.body, returning: true})
        //console.log(loans)
        return res.status(200).json({loans,"message":"Loan save"})
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
      const sql = 'Select id_wallet, loans.id, clients.id as id_client, clients.name, clients.lastName, clients.email, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state, loans.value_initial, loans.value_end, loans.interest, loans.startLoan, loans.finishLoan, loans.dues, loans.duesValue, loans.paymentF from loans inner join clients on loans.id_client = clients.id ';
      
      connection1.query(sql, (error: QueryError, results:any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }

  export  function loansConsultIdClient(id:string){
    return new Promise((resolve, reject) => {
      const sql = `Select loans.id_wallet as id_wallet, loans.id as id, clients.id as id_client, clients.name as name, clients.lastName, clients.email, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state as state, loans.value_initial, loans.value_end, loans.interest, loans.startLoan, loans.finishLoan, loans.dues, loans.duesValue, loans.paymentF from loans inner join clients inner join payments on loans.id_client = clients.id and payments.id_loan = loans.id and clients.id = ${id}`;
      //const sql = `Select * from loans  where id = ${id}`;
      connection1.query(sql, (error: QueryError, results:any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }

  export  function loansConsultIdCollector(id:string){
    return new Promise((resolve, reject) => {
      const sql = `Select wallets.id as id_wallet, loans.id, clients.id as id_client, clients.id_number as id_number, clients.lastName, clients.email, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state, loans.value_initial, loans.value_end, loans.interest, loans.startLoan, loans.finishLoan, loans.dues, loans.duesValue, loans.paymentF from loans inner join clients inner join payments inner join wallets inner join collectors on loans.id_client = clients.id and payments.id_loan = loans.id and loans.id_wallet = wallets.id and wallets.id = collectors.id_wallet and collectors.id = ${id}`;
      //const sql = `Select * from payments  where id = ${id}`;
      connection1.query(sql, (error: QueryError, results:any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }

  export  function loansConsultId(id:string){
    return new Promise((resolve, reject) => {
      const sql = `Select id_wallet , loans.id as id_loan, clients.genre as genre, clients.id as id_client, clients.neighborhood, clients.name as name, clients.lastName,  clients.city, clients.email, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state, loans.value_initial, loans.value_end, loans.interest, loans.startLoan, loans.finishLoan, loans.dues, loans.duesValue, loans.paymentF, payments.dues as duesPay from loans inner join clients inner join payments on loans.id_client = clients.id and payments.id_loan = loans.id and loans.id = ${id}`;
      //const sql = `Select * from payments  where id = ${id}`;
      connection1.query(sql, (error: QueryError, results:any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results[0]);
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