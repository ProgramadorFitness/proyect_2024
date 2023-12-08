import Client from "../models/clients";
import { Request, Response } from "express";



export const list = async (req: Request, res: Response) => {
    try {
        await Client.findAll()
        return res.status(200).json(res)
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}