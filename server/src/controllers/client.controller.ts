import Client from "../models/clients";
import { Request, RequestHandler, Response } from "express";



export const list = async (req: Request, res: Response) => {
    try {
        const clients = await Client.findAll()
        return res.status(200).json(clients)
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}