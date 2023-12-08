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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertLoan = exports.loansConsult = exports.delet = exports.create = exports.list = void 0;
const loans_models_1 = require("../models/loans.models");
const connection_1 = require("../connection/connection");
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield loans_models_1.Loans.findAll();
        return res.status(200).json(loans);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.list = list;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield loans_models_1.Loans.create(Object.assign({}, req.body));
        return res.status(200).json({ "message": "Client save" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.create = create;
const delet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield loans_models_1.Loans.destroy({ where: { id } });
        return res.status(200).json({ "message": "Client Destroy" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.delet = delet;
function loansConsult() {
    return new Promise((resolve, reject) => {
        const sql = 'Select loans.id, clients.name, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state, loans.value_initial, loans.value_end, loans.interest from loans inner join clients on loans.id_client = clients.id ';
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
exports.loansConsult = loansConsult;
function InsertLoan() {
    return new Promise((resolve, reject) => {
        const sql = '';
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
exports.InsertLoan = InsertLoan;
