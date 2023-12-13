import { QueryError } from "sequelize";
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