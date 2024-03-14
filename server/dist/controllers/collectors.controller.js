"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectorConsult = exports.update = exports.One = exports.delet = exports.create = exports.list = void 0;
const collectors_1 = __importDefault(require("../models/collectors"));
const connection_1 = require("../models/db/connection");
const list = async (req, res) => {
    try {
        const collector = await collectors_1.default.findAll();
        return res.status(200).json(collector);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.list = list;
const create = async (req, res) => {
    try {
        await collectors_1.default.create(Object.assign({}, req.body));
        return res.status(200).json({ "message": "Collector save" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.create = create;
const delet = async (req, res) => {
    const { id } = req.params;
    try {
        await collectors_1.default.destroy({ where: { id } });
        return res.status(200).json({ "message": "Collector Destroy" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.delet = delet;
const One = async (req, res) => {
    const { id } = req.params;
    try {
        const collector = await collectors_1.default.findOne({ where: { id: id } });
        return res.status(200).json(collector);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.One = One;
const update = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const collector = await collectors_1.default.findByPk(id);
        if (collector) {
            await collector.update(body);
            return res.status(200).json({ "message": "Client update" });
        }
        else {
            res.status(404).json({
                msg: "No existe este cliente"
            });
        }
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.update = update;
function collectorConsult(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM collectors WHERE id_number = '${id}'`;
        connection_1.connection1.query(sql, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}
exports.collectorConsult = collectorConsult;
