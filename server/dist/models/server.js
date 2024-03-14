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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const clients_1 = __importDefault(require("./clients"));
const user_1 = __importDefault(require("./user"));
const loans_1 = __importDefault(require("./loans"));
const wallets_1 = __importDefault(require("./wallets"));
const user_routes_1 = __importDefault(require("../views/user.routes"));
const cors_1 = __importDefault(require("cors"));
const client_routes_1 = __importDefault(require("../views/client.routes"));
const validate_routes_1 = __importDefault(require("../views/validate.routes"));
const wallets_routes_1 = __importDefault(require("../views/wallets.routes"));
const loans_routes_1 = __importDefault(require("../views/loans.routes"));
const collectors_routes_1 = __importDefault(require("../views/collectors.routes"));
const collectors_1 = __importDefault(require("./collectors"));
const connection_1 = __importDefault(require("./db/connection"));
const wallets_controller_1 = require("../controllers/wallets.controller");
const loans_controller_1 = require("../controllers/loans.controller");
const client_controller_1 = require("../controllers/client.controller");
const collectors_controller_1 = require("../controllers/collectors.controller");
const payments_routes_1 = __importDefault(require("../views/payments.routes"));
const payment_1 = __importDefault(require("./payment"));
const payments_controllers_1 = require("../controllers/payments.controllers");
const collections_1 = __importDefault(require("../views/collections"));
const collections_controller_1 = require("../controllers/collections.controller");
const pdfDocuments_1 = __importDefault(require("../views/pdfDocuments"));
const pdfDocument_1 = __importDefault(require("./pdfDocument"));
const path = require('path');
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
        this.app.use(express_1.default.static(path.join(__dirname, '../dbImages/')));
    }
    routes() {
        this.app.use('/api/users', user_routes_1.default);
        this.app.use('/api/clients', client_routes_1.default);
        this.app.use('/api/validate', validate_routes_1.default);
        this.app.use("/api/wallets", wallets_routes_1.default);
        this.app.use("/api/loans", loans_routes_1.default);
        this.app.use("/api/collectors", collectors_routes_1.default);
        this.app.use("/api/payments", payments_routes_1.default);
        this.app.use("/api/collections", collections_1.default);
        this.app.use("/api/pdfDocuments", pdfDocuments_1.default);
        //--Walltes-Sql
        this.app.get("/api/wallets/listjoin/:id", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = await (0, wallets_controller_1.walletsConsult)(id);
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        this.app.get("/api/wallets/listOne", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = await (0, wallets_controller_1.listOne)();
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        this.app.get("/api/payments/addBlackList", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = await (0, payments_controllers_1.addBlackList)();
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Walltes-Sql-User
        this.app.get("/api/wallets/listjoinUser/:id", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = await (0, wallets_controller_1.walletsConsultUser)(id);
                wallets_controller_1.walletsConsultUserName;
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        this.app.get("/api/wallets/listjoinUserName/:id", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = await (0, wallets_controller_1.walletsConsultUserName)(id);
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Walltes-Sql-User
        this.app.get("/api/wallets/listjoin", async (req, res, any) => {
            try {
                const results = await (0, wallets_controller_1.walletsjOIN)();
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Loan-Sql
        this.app.get("/api/loans/listjoin", async (req, res, any) => {
            try {
                const results = await (0, loans_controller_1.loansConsult)();
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Loan-ID-Sql
        this.app.get("/api/loans/listjoin/:id", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = (await (0, loans_controller_1.loansConsultId)(id));
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Loan-ID-Sql-User
        this.app.get("/api/loans/listjoinUser/:id", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = (await (0, loans_controller_1.loansConsultIdClient)(id));
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Loan-ID-Sql-User-Collector
        this.app.get("/api/loans/listjoinUserCollector/:id", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = (await (0, loans_controller_1.loansConsultIdCollector)(id));
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Client-Sql
        this.app.get("/api/clients/ident/:id", async (req, res) => {
            const id = req.params.id;
            try {
                const results = await (0, client_controller_1.ClientsConsult)(id);
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Collector-Sql
        this.app.get("/api/collectors/id/:id", async (req, res) => {
            const id = req.params.id;
            try {
                const results = await (0, collectors_controller_1.collectorConsult)(id);
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--payJoinId-Sql
        this.app.get("/api/payments/listjoin/:id", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = (await (0, payments_controllers_1.payJoinId)(id));
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--payJoin-Sql
        this.app.get("/api/payments/list", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = (await (0, payments_controllers_1.payJoin)());
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Pay-ID-Sql
        this.app.get("/api/payments/pay/:id", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = (await (0, payments_controllers_1.payConsultId)(id));
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Pay-ID-Sql-Client
        this.app.get("/api/payments/pay2/:id", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = (await (0, payments_controllers_1.clientPay)(id));
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Pay-ID-Sql-User
        this.app.get("/api/payments/pay3/:id", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = (await (0, payments_controllers_1.collectorPay)(id));
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Collections-Sql
        this.app.get("/api/collections/listjoin", async (req, res, any) => {
            try {
                const results = (await (0, collections_controller_1.listJoin)());
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Collections-ID-Sql
        this.app.get("/api/collections/listjoinID/:id", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = (await (0, collections_controller_1.listJoinID)(id));
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Collections-ID-Sql-User
        this.app.get("/api/collections/listjoinIDUser/:id", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = (await (0, collections_controller_1.listJoinIDUser)(id));
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Collections-ID-Sql-User-Collector
        this.app.get("/api/collections/listjoinIDUserCollector/:id", async (req, res, any) => {
            const id = req.params.id;
            try {
                const results = (await (0, collections_controller_1.listJoinIDUserCollector)(id));
                res.json(results);
            }
            catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
            }
        });
        //--Payments-ID-Sql
        /*this.app.get("/api/payments/createSql/:id", async (req: Request, res: Response, any) => {
         const id = req.params.id
         try {
             const results = (await createSql(id));
             res.json(results)
         } catch (error) {
             console.error('Error al realizar la consulta:', error);
             res.status(500).send('Error interno del servidor');
             
         }
     } )*/
    }
    async dbConnect() {
        try {
            await connection_1.default.authenticate();
            await clients_1.default.sync();
            await loans_1.default.sync();
            await wallets_1.default.sync();
            await collectors_1.default.sync();
            await user_1.default.sync();
            await payment_1.default.sync();
            await pdfDocument_1.default.sync();
            console.log('Connection has been established successfully');
        }
        catch (error) {
            console.error('Unable to connect to the database', error);
        }
    }
}
exports.default = Server;
