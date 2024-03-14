"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listJoinIDUserCollector = exports.listJoinIDUser = exports.listJoinID = exports.listJoin = exports.list = void 0;
const connection_1 = require("../models/db/connection");
const payment_1 = __importDefault(require("../models/payment"));
const list = async (req, res) => {
    try {
        const payment = await payment_1.default.findAll({ where: {
                state: "pay"
            } });
        return res.status(200).json(payment);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.list = list;
function listJoin() {
    return new Promise((resolve, reject) => {
        const sql = `Select clients.id as id_client, payments.id, loans.id as id_loan, clients.id_number as id_number, payments.state, paymentF, loans.dues as dues, payments.dues as duesPaid ,loans.duesValue,payments.outBalance, payments.payment as duesRealPay, payments.date as datePay, payments.realDate as realDatePay from payments inner join loans inner join clients on payments.id_loan = loans.id and loans.id_client = clients.id where payments.state = 'pay' OR payments.state = 'pay of part' `;
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
exports.listJoin = listJoin;
function listJoinID(id_loan) {
    return new Promise((resolve, reject) => {
        const sql = `Select clients.id as id_client, payments.id, loans.id as id_loan, clients.id_number as id_number, payments.state, paymentF, loans.dues as dues, payments.dues as duesPaid ,loans.duesValue,payments.outBalance, payments.payment as duesRealPay, payments.date as datePay, payments.realDate as realDatePay from payments inner join loans inner join clients on payments.id_loan = loans.id and loans.id_client = clients.id where payments.state = 'pay' OR payments.state = 'pay of part' and loans.id = ${id_loan} `;
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
exports.listJoinID = listJoinID;
function listJoinIDUser(id_user) {
    return new Promise((resolve, reject) => {
        const sql = `Select clients.id as id_client, payments.id, loans.id as id_loan, clients.id_number as id_number, payments.state, paymentF, loans.dues as dues, payments.dues as duesPaid ,loans.duesValue,payments.outBalance, payments.payment as duesRealPay, payments.date as datePay, payments.realDate as realDatePay from payments inner join loans inner join clients on payments.id_loan = loans.id and loans.id_client = clients.id where payments.state = 'pay' OR payments.state = 'pay of part' and clients.id = ${id_user} `;
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
exports.listJoinIDUser = listJoinIDUser;
function listJoinIDUserCollector(id_user) {
    return new Promise((resolve, reject) => {
        const sql = `Select collectors.id_wallet, clients.id as id_client, payments.id as id_payments,wallets.id as id_wallet, loans.id as id_loan, clients.id_number as id_number, payments.state, paymentF, loans.dues as dues, payments.dues as duesPaid ,loans.duesValue,payments.outBalance, payments.payment as duesRealPay, payments.date as datePay, payments.realDate as realDatePay from payments inner join loans inner join wallets inner join clients inner join collectors on payments.id_loan = loans.id and loans.id_wallet = wallets.id and loans.id_client = clients.id and wallets.id = collectors.id_wallet and collectors.id = ${id_user} and payments.state = 'pay' OR payments.state = 'pay of part';`;
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
exports.listJoinIDUserCollector = listJoinIDUserCollector;
