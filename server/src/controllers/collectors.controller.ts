import { RequestHandler } from "express";
import Collector from "../models/collectors";
import { connection1 } from "../db/connection";
import { QueryError } from "sequelize";

export const list: RequestHandler = async (req, res) => {
    try {
        const collector = await Collector.findAll()
        return res.status(200).json(collector)
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}

export const create: RequestHandler = async (req, res) => {
    try {
        await Collector.create({ ...req.body })
        return res.status(200).json({"message":"Collector save"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}

export const delet: RequestHandler = async (req, res) => {
    const {id} = req.params
    try {
        await Collector.destroy({where: {id}})
        return res.status(200).json({"message":"Collector Destroy"})
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", "error": error})
    }
}

export  function collectorConsult(id:string) {
    
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM collectors WHERE id_number = '${id}'`;
      
      connection1.query(sql, (error: QueryError, results: any) => {
        if (error) {
            reject(error);
          } else {
            resolve(results);
          }
      })
    });
  }