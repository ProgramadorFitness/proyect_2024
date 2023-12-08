import express, { urlencoded } from 'express';
import Client from './clients';
import User from './user';
import Loan from './loans';
import Wallet from './wallets';
import routesUser from '../routes/user.routes';
import sequelize from '../db/connection';
import cors from 'cors'
import ClientRoutes from '../routes/client.routes';
import routesValidate from '../routes/validate.routes';
import WalletsRoutes from '../routes/wallets.routes';
import LoansRoutes from '../routes/loans.routes';
import CollectorsRoutes from '../routes/collectors.routes';
import { ClientsConsult } from '../controllers/client.controller copy';




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
        const upload = multer({dest: 'uploads/'})
    }

    routes(){
        this.app.use('/api/users', routesUser)
        this.app.use('/api/clients', ClientRoutes)
        this.app.use('/api/validate', routesValidate)
        this.app.use("/api/wallets", WalletsRoutes )
        this.app.use("/api/loans", LoansRoutes )
        this.app.use("/api/collectors", CollectorsRoutes )

    }

    async dbConnect(){
        try {
            await sequelize.authenticate();
           await Client.sync()
           await User.sync()
           await Loan.sync()
           await Wallet.sync()
            console.log('Connection has been established successfully')
        } catch (error) {
            console.error('Unable to connect to the database', error)
        }
    }
}

export default Server

function multer(arg0: { dest: string; }) {
    throw new Error('Function not implemented.');
}
