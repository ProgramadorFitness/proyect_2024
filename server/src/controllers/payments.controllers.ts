import { QueryError } from "mysql2";
import { connection1 } from "../db/connection";
import Payment from "../models/payment";
import { Request, RequestHandler, Response } from "express";



export const list: RequestHandler = async (req: Request, res: Response) => {
  try {
      const payment = await Payment.findAll()
      return res.status(200).json(payment)
  } catch (error) {
      return res.status(500).json({"message": "Hubo un error", "error": error})
  }
}

export const create: RequestHandler = async (req: Request, res: Response) => {
  
    try {
        await Payment.create({ ...req.body })
        console.log(req)
        return res.status(200).json({"message":"Client save"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
  }

  export  function payJoinId(id:string){
    return new Promise((resolve, reject) => {
      const sql = `Select payments.id, loans.id as id_loan, clients.id_number as id_number, payments.state, paymentF, loans.dues as dues, payments.dues as duesPaid ,loans.duesValue,payments.outBalance, payments.payment as duesRealPay, payments.date as datePay, payments.realDate as realDatePay from payments inner join loans inner join clients on payments.id_loan = loans.id and loans.id_client = clients.id  where id_loan = ${id}`;

      connection1.query(sql, (error: QueryError, results:any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }

  export  function payJoin(){
    return new Promise((resolve, reject) => {
      const sql = `Select payments.id, loans.id as id_loan, clients.id_number as id_number, payments.state, paymentF, loans.dues as dues, payments.dues as duesPaid ,loans.duesValue,payments.outBalance, payments.payment as duesRealPay, payments.date as datePay, payments.realDate as realDatePay from payments inner join loans inner join clients on payments.id_loan = loans.id and loans.id_client = clients.id `;

      connection1.query(sql, (error: QueryError, results:any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }