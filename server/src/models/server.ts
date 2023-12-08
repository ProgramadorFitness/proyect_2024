import express from 'express';
import Client from './clients';
import User from './user';
import Loan from './loans';
import Wallet from './wallets';
import routesUser from '../routes/user.models';



class Server {
    private app: express.Application;
    private port: string;



    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
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
    }

    routes(){
        this.app.use('/api/users', routesUser)
    }

    async dbConnect(){
        try {
            //await sequelize.authenticate();
           await Client.sync()
           await User.sync()
           await Loan.sync()
           await Wallet.sync()
           //await User.sync()
            console.log('Connection has been established successfully')
        } catch (error) {
            console.error('Unable to connect to the database', error)
        }
    }
}

export default Server