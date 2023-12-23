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
        await Payment.create({...req.body})
        return res.status(200).json({"message":"Client save"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
  }

  export  function createSql(id:string){
    return new Promise((resolve, reject) => {
      const sql = `Insert into payments (id_loan) values (${id})`;

      connection1.query(sql, (error: QueryError, results:any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }

  export  function payJoinId(id:string){
    return new Promise((resolve, reject) => {
      const sql = `Select clients.id as id_client, payments.id, loans.id as id_loan, clients.id_number as id_number, payments.state, paymentF, loans.dues as dues, payments.dues as duesPaid ,loans.duesValue,payments.outBalance, payments.payment as duesRealPay, payments.date as datePay, payments.realDate as realDatePay from payments inner join loans inner join clients on payments.id_loan = loans.id and loans.id_client = clients.id  where id_loan = ${id}`;

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
      const sql = `Select clients.id as id_client, payments.id, loans.id as id_loan, clients.id_number as id_number, payments.state, paymentF, loans.dues as dues, payments.dues as duesPaid ,loans.duesValue,payments.outBalance, payments.payment as duesRealPay, payments.date as datePay, payments.realDate as realDatePay from payments inner join loans inner join clients on payments.id_loan = loans.id and loans.id_client = clients.id `;

      connection1.query(sql, (error: QueryError, results:any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }

  export  function payConsultId(id:string){
    return new Promise((resolve, reject) => {
      const sql = `Select payments.id as id, id_wallet , loans.id as id_loan, clients.genre as genre, payments.dues as duesPaid, clients.id as id_client, clients.neighborhood, clients.name as name, clients.lastName,  clients.city, clients.email, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state, loans.value_initial, loans.value_end, loans.interest, loans.startLoan, loans.finishLoan, loans.dues, loans.duesValue, loans.paymentF, payments.dues as duesPay from loans inner join clients inner join payments on loans.id_client = clients.id and payments.id_loan = loans.id and payments.id = ${id}`;
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

  export const create2: RequestHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req;
  
    try {
    const payment = await Payment.findByPk(id);
      if(payment){
        await payment.update(body)
        return res.status(200).json({"message":"payment complete"})
      }else{
        res.status(404).json({
          msg: "Not found payment"
        })
      }      
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
  }