"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertLoan = exports.loansConsultId = exports.loansConsultIdCollector = exports.loansConsultIdClient = exports.loansConsult = exports.delet = exports.updateState = exports.updateStateEdit = exports.create = exports.list = void 0;
const loans_1 = __importDefault(require("../models/loans"));
const connection_1 = require("../models/db/connection");
const list = async (req, res) => {
    try {
        const loans = await loans_1.default.findAll();
        return res.status(200).json(loans);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.list = list;
const create = async (req, res) => {
    try {
        const loans = await loans_1.default.create(Object.assign(Object.assign({}, req.body), { returning: true }));
        //console.log(loans)
        return res.status(200).json({ loans, "message": "Loan save" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.create = create;
const updateStateEdit = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const client = await loans_1.default.findByPk(id);
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
exports.updateStateEdit = updateStateEdit;
const updateState = async (req, res) => {
    const { itemId } = req.params;
    const { state } = req.body;
    try {
        const loan = await loans_1.default.findByPk(itemId);
        if (!loan) {
            return res.status(404).json({ message: 'Préstamo no encontrado' });
        }
        await loan.update({ state: state });
        return res.status(200).json({ message: 'Estado actualizado correctamente' });
    }
    catch (error) {
        console.error('Error al actualizar el estado en la base de datos:', error);
        return res.status(500).json({ message: 'Hubo un error', error: error });
    }
};
exports.updateState = updateState;
const delet = async (req, res) => {
    const { id } = req.params;
    try {
        await loans_1.default.destroy({ where: { id } });
        return res.status(200).json({ "message": "Loan Destroy" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
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
