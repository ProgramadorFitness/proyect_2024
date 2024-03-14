"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsConsult = exports.update = exports.create = exports.One = exports.delet = exports.list = void 0;
const connection_1 = require("../models/db/connection");
const clients_1 = __importDefault(require("../models/clients"));
const list = async (req, res) => {
    try {
        const clients = await clients_1.default.findAll();
        return res.status(200).json(clients);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.list = list;
const delet = async (req, res) => {
    const { id } = req.params;
    try {
        const clients = await clients_1.default.destroy({ where: { id } });
        return res.status(200).json({ clients, "message": "Client Destroy" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.delet = delet;
const One = async (req, res) => {
    const { id } = req.params;
    try {
        const clients = await clients_1.default.findOne({ where: { id: id } });
        return res.status(200).json(clients);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.One = One;
const create = async (req, res) => {
    try {
        await clients_1.default.create(Object.assign({}, req.body));
        console.log(req);
        return res.status(200).json({ "message": "Client save" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.create = create;
const update = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const client = await clients_1.default.findByPk(id);
        if (client) {
            await client.update(body);
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
function ClientsConsult(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM clients WHERE id_number LIKE '%${id}%' LIMIT 1`;
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
exports.ClientsConsult = ClientsConsult;
