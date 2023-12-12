"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsConsult = exports.update = exports.create = exports.One = exports.list = void 0;
const connection_1 = require("../db/connection");
const clients_1 = __importDefault(require("../models/clients"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield clients_1.default.findAll();
        return res.status(200).json(clients);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.list = list;
const One = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const clients = yield clients_1.default.findOne({ where: { id: id } });
        return res.status(200).json(clients);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.One = One;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield clients_1.default.create(Object.assign({}, req.body));
        console.log(req);
        return res.status(200).json({ "message": "Client save" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const client = yield clients_1.default.findByPk(id);
        if (client) {
            yield client.update(body);
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
});
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
