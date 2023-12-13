"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const clients_1 = __importDefault(require("./clients"));
const user_1 = __importDefault(require("./user"));
const loans_1 = __importDefault(require("./loans"));
const wallets_1 = __importDefault(require("./wallets"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const cors_1 = __importDefault(require("cors"));
const client_routes_1 = __importDefault(require("../routes/client.routes"));
const validate_routes_1 = __importDefault(require("../routes/validate.routes"));
const wallets_routes_1 = __importDefault(require("../routes/wallets.routes"));
const loans_routes_1 = __importDefault(require("../routes/loans.routes"));
const collectors_routes_1 = __importDefault(require("../routes/collectors.routes"));
const collectors_1 = __importDefault(require("./collectors"));
const connection_1 = __importDefault(require("../db/connection"));
const wallets_controller_1 = require("../controllers/wallets.controller");
const loans_controller_1 = require("../controllers/loans.controller");
const client_controller_1 = require("../controllers/client.controller");
const collectors_controller_1 = require("../controllers/collectors.controller");
const payments_routes_1 = __importDefault(require("../routes/payments.routes"));
const payment_1 = __importDefault(require("./payment"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '5001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplication run in the port' + this.port);
        });
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, express_1.urlencoded)({ extended: false }));
    }
    routes() {
        this.app.use('/api/users', user_routes_1.default);
        this.app.use('/api/clients', client_routes_1.default);
        this.app.use('/api/validate', validate_routes_1.default);
        this.app.use("/api/wallets", wallets_routes_1.default);
        this.app.use("/api/loans", loans_routes_1.default);
        this.app.use("/api/collectors", collectors_routes_1.default);
        this.app.use("/api/payments", payments_routes_1.default);
        //--Walltes-Sql
        this.app.get("/api/wallets/listjoin/:id", (req, res, any) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const results = yield (0, wallets_controller_1.walletsConsult)(id);
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        }));
        //--Loan-Sql
        this.app.get("/api/loans/listjoin", (req, res, any) => __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield (0, loans_controller_1.loansConsult)();
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        }));
        //--Loan-ID-Sql
        this.app.get("/api/loans/listjoin/:id", (req, res, any) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const results = (yield (0, loans_controller_1.loansConsultId)(id));
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        }));
        //--Client-Sql
        this.app.get("/api/clients/ident/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const results = yield (0, client_controller_1.ClientsConsult)(id);
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        }));
        //--Collector-Sql
        this.app.get("/api/collectors/id/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const results = yield (0, collectors_controller_1.collectorConsult)(id);
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        }));
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                yield clients_1.default.sync();
                yield loans_1.default.sync();
                yield wallets_1.default.sync();
                yield collectors_1.default.sync();
                yield user_1.default.sync();
                yield payment_1.default.sync();
                console.log('Connection has been established successfully');
            }
            catch (error) {
                console.error('Unable to connect to the database', error);
            }
        });
    }
}
exports.default = Server;
