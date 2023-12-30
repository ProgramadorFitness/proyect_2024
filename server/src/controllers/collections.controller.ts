import { QueryError } from "mysql2";
import { connection1 } from "../db/connection";
import Payment from "../models/payment";
import { Request, RequestHandler, Response } from "express";



export const list: RequestHandler = async (req: Request, res: Response) => {
  try {
      const payment = await Payment.findAll({where:{
        state:"pay"
      }})
      return res.status(200).json(payment)
  } catch (error) {
      return res.status(500).json({"message": "Hubo un error", "error": error})
  }
}

export  function listJoin(){
  return new Promise((resolve, reject) => {
    const sql = `Select clients.id as id_client, payments.id, loans.id as id_loan, clients.id_number as id_number, payments.state, paymentF, loans.dues as dues, payments.dues as duesPaid ,loans.duesValue,payments.outBalance, payments.payment as duesRealPay, payments.date as datePay, payments.realDate as realDatePay from payments inner join loans inner join clients on payments.id_loan = loans.id and loans.id_client = clients.id where payments.state = 'pay' OR payments.state = 'pay of part' `;

    connection1.query(sql, (error: QueryError, results:any) => {
      if (error) {  
          reject(error);
        } else { 
          resolve(results);
        }
    })
  });
}

export  function listJoinID(id_loan:string){
  return new Promise((resolve, reject) => {
    const sql = `Select clients.id as id_client, payments.id, loans.id as id_loan, clients.id_number as id_number, payments.state, paymentF, loans.dues as dues, payments.dues as duesPaid ,loans.duesValue,payments.outBalance, payments.payment as duesRealPay, payments.date as datePay, payments.realDate as realDatePay from payments inner join loans inner join clients on payments.id_loan = loans.id and loans.id_client = clients.id where payments.state = 'pay' OR payments.state = 'pay of part' and loans.id = ${id_loan} `;

    connection1.query(sql, (error: QueryError, results:any) => {
      if (error) {  
          reject(error);
        } else { 
          resolve(results);
        }
    })
  });
}