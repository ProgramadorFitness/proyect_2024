"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletsConsultUserName = exports.walletsConsultUser = exports.walletsjOIN = exports.walletsConsult = exports.delet = exports.create = exports.update = exports.One = exports.listOne = exports.list = void 0;
const wallets_1 = __importDefault(require("../models/wallets"));
const connection_1 = require("../models/db/connection");
const list = async (req, res) => {
    const { id } = req.params;
    try {
        const loans = await wallets_1.default.findAll();
        return res.status(200).json(loans);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.list = list;
function listOne() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT(*) AS loans, id_wallet as id, capital FROM loans, wallets where loans.id_wallet = wallets.id GROUP BY id_wallet';
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
exports.listOne = listOne;
const One = async (req, res) => {
    const { id } = req.params;
    try {
        const wallets = await wallets_1.default.findOne({ where: { id: id } });
        return res.status(200).json(wallets);
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
        const wallets = await wallets_1.default.findByPk(id);
        if (wallets) {
            await wallets.update(body);
            return res.status(200).json({ "message": "wallet update" });
        }
        else {
            res.status(404).json({
                msg: "No existe esta wallet"
            });
        }
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.update = update;
const create = async (req, res) => {
    try {
        await wallets_1.default.create(Object.assign({}, req.body));
        return res.status(200).json({ "message": "wallet save" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.create = create;
const delet = async (req, res) => {
    const { id } = req.params;
    try {
        await wallets_1.default.destroy({ where: { id } });
        return res.status(200).json({ "message": "wallet Destroy" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.delet = delet;
function walletsConsult(id) {
    return new Promise((resolve, reject) => {
        const sql = `Select loans.id, clients.name, clients.email, clients.lastName, clients.id_number, clients.address, clients.phone, clients.phone2, loans.state, loans.value_initial, loans.value_end, loans.interest from loans inner join clients join wallets join collectors  on loans.id_client = clients.id and loans.id_wallet = wallets.id and wallets.id = collectors.id_wallet and wallets.id = ${id}`;
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
exports.walletsConsult = walletsConsult;
function walletsjOIN() {
    return new Promise((resolve, reject) => {
        const sql = 'select count(loans.id) as loans, wallets.id as id, wallets.capital from wallets inner join loans on wallets.id = loans.id_wallet';
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
exports.walletsjOIN = walletsjOIN;
function walletsConsultUser(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id_wallet FROM collectors WHERE id = ${id}`;
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
exports.walletsConsultUser = walletsConsultUser;
function walletsConsultUserName(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT name, lastName, id_wallet FROM collectors WHERE id_wallet = ${id}`;
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
exports.walletsConsultUserName = walletsConsultUserName;
/*
  const app = express();

  app.get("/api/wallets/listjoin/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const results = await walletsConsult(id);
        res.json(results)
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).send('Error interno del servidor');
        
    }
} )*/
