import express, { Request, Response, urlencoded } from 'express';
import Client from './clients';
import User from './user';
import Loan from './loans';
import Wallet from './wallets';
import routesUser from '../routes/user.routes';
import cors from 'cors'
import ClientRoutes from '../routes/client.routes';
import routesValidate from '../routes/validate.routes';
import WalletsRoutes from '../routes/wallets.routes';
import LoansRoutes from '../routes/loans.routes';
import CollectorsRoutes from '../routes/collectors.routes';
import Collector from './collectors';
import sequelize from '../db/connection';
import { walletsConsult } from '../controllers/wallets.controller';
import { loansConsult } from '../controllers/loans.controller';
import { ClientsConsult } from '../controllers/client.controller';
import { collectorConsult } from '../controllers/collectors.controller';




class Server {
    private app: express.Application;
    private port: string;



    constructor() {
        this.app = express();
        this.port = process.env.PORT || '5001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();

        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Aplication run in the port' + this.port)
        })
    }

    midlewares(){
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(urlencoded({extended: false}))
    }

    routes(){
        this.app.use('/api/users', routesUser)
        this.app.use('/api/clients', ClientRoutes)
        this.app.use('/api/validate', routesValidate)
        this.app.use("/api/wallets", WalletsRoutes )
        this.app.use("/api/loans", LoansRoutes )
        this.app.use("/api/collectors", CollectorsRoutes )
        
        //--Walltes-Sql
        this.app.get("/api/wallets/listjoin/:id", async (req: Request, res: Response, any) => {
            const id = req.params.id
            try {
                const results= await walletsConsult(id);
                res.json(results)
            } catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
                
            }
        } )

        //--Loan-Sql
            this.app.get("/api/loans/listjoin", async (req: Request, res: Response, any) => {
                try {
                    const results= await loansConsult();
                    res.json(results)
                } catch (error) {
                    console.error('Error al realizar la consulta:', error);
                    res.status(500).send('Error interno del servidor');
                    
                }
            } )

        //--Client-Sql
        this.app.get("/api/clients/ident/:id", async (req: Request, res: Response) => {
            const id = req.params.id
            try {
                const results = await ClientsConsult(id);
                res.json(results)
            } catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
                
            }
        } )

        //--Collector-Sql
        this.app.get("/api/collectors/id/:id", async (req: Request, res: Response) => {
            const id = req.params.id
            try {
                const results = await collectorConsult(id);
                res.json(results)
            } catch (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).send('Error interno del servidor');
                
            }
        } )
            
    }

    async dbConnect(){
        try {
            await sequelize.authenticate();
            await Client.sync()
            await Loan.sync()
            await Wallet.sync()
            await Collector.sync()
            await User.sync()

            console.log('Connection has been established successfully')
        } catch (error) {
            console.error('Unable to connect to the database', error)
        }
    }
}

export default Server

