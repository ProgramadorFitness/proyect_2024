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
exports.InsertLoan = exports.loansConsultId = exports.loansConsultIdCollector = exports.loansConsultIdClient = exports.loansConsult = exports.delet = exports.create = exports.list = void 0;
const loans_1 = __importDefault(require("../models/loans"));
const connection_1 = require("../db/connection");
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield loans_1.default.findAll();
        return res.status(200).json(loans);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.list = list;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield loans_1.default.create(Object.assign(Object.assign({}, req.body), { returning: true }));
        //console.log(loans)
        return res.status(200).json({ loans, "message": "Loan save" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.create = create;
const delet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield loans_1.default.destroy({ where: { id } });
        return res.status(200).json({ "message": "Client Destroy" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.delet = delet;
function loansConsult() {
    return new Promise((resolve, reject) => {
        const sql = 'Select id_wallet, loans.id, clients.id as id_client, clients.name, clients.lastName, clients.email, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state, loans.value_initial, loans.value_end, loans.interest, loans.startLoan, loans.finishLoan, loans.dues, loans.duesValue, loans.paymentF from loans inner join clients on loans.id_client = clients.id ';
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
function loansConsultIdClient(id) {
    return new Promise((resolve, reject) => {
        const sql = `Select loans.id_wallet as id_wallet, loans.id as id, clients.id as id_client, clients.name as name, clients.lastName, clients.email, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state as state, loans.value_initial, loans.value_end, loans.interest, loans.startLoan, loans.finishLoan, loans.dues, loans.duesValue, loans.paymentF from loans inner join clients inner join payments on loans.id_client = clients.id and payments.id_loan = loans.id and clients.id = ${id}`;
        //const sql = `Select * from loans  where id = ${id}`;
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
exports.loansConsultIdClient = loansConsultIdClient;
function loansConsultIdCollector(id) {
    return new Promise((resolve, reject) => {
        const sql = `Select wallets.id as id_wallet, loans.id, clients.id as id_client, clients.id_number as id_number, clients.lastName, clients.email, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state, loans.value_initial, loans.value_end, loans.interest, loans.startLoan, loans.finishLoan, loans.dues, loans.duesValue, loans.paymentF from loans inner join clients inner join payments inner join wallets inner join collectors on loans.id_client = clients.id and payments.id_loan = loans.id and loans.id_wallet = wallets.id and wallets.id = collectors.id_wallet and collectors.id = ${id}`;
        //const sql = `Select * from payments  where id = ${id}`;
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
exports.loansConsultIdCollector = loansConsultIdCollector;
function loansConsultId(id) {
    return new Promise((resolve, reject) => {
        const sql = `Select id_wallet , loans.id as id_loan, clients.genre as genre, clients.id as id_client, clients.neighborhood, clients.name as name, clients.lastName,  clients.city, clients.email, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state, loans.value_initial, loans.value_end, loans.interest, loans.startLoan, loans.finishLoan, loans.dues, loans.duesValue, loans.paymentF, payments.dues as duesPay from loans inner join clients inner join payments on loans.id_client = clients.id and payments.id_loan = loans.id and loans.id = ${id}`;
        //const sql = `Select * from payments  where id = ${id}`;
        connection_1.connection1.query(sql, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results[0]);
            }
        });
    });
}
exports.loansConsultId = loansConsultId;
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
