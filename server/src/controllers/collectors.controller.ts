import { RequestHandler } from "express";
import { Collectors } from "../models/collectors.models";

export const list: RequestHandler = async (req, res) => {
    try {
        const collector: Collectors[] = await Collectors.findAll()
        return res.status(200).json(collector)
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}

export const create: RequestHandler = async (req, res) => {
    try {
        await Collectors.create({...req.body})
        return res.status(200).json({"message":"Collector save"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}

export const delet: RequestHandler = async (req, res) => {
    const {id} = req.params
    try {
        await Collectors.destroy({where: {id}})
        return res.status(200).json({"message":"Collector Destroy"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}