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
exports.walletsConsult = exports.delet = exports.create = exports.list = void 0;
const wallets_1 = __importDefault(require("../models/wallets"));
const connection_1 = require("../db/connection");
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const loans = yield wallets_1.default.findAll();
        return res.status(200).json(loans);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.list = list;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield wallets_1.default.create(Object.assign({}, req.body));
        return res.status(200).json({ "message": "wallet save" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.create = create;
const delet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield wallets_1.default.destroy({ where: { id } });
        return res.status(200).json({ "message": "wallet Destroy" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.delet = delet;
function walletsConsult(id) {
    return new Promise((resolve, reject) => {
        const sql = `Select loans.id, clients.name, clients.email, clients.lastName, clients.id_number, clients.address, clients.phone, clients.phone2, loans.state, loans.value_initial, loans.value_end, loans.interest from loans inner join clients join wallets join collectors  on loans.id_client = clients.id and loans.id_wallet = wallets.id and  wallets.id_collector = collectors.id  and wallets.id = ${id}`;
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
