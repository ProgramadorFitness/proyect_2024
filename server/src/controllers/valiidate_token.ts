import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";

const validateToken = (req:Request, res:Response, next:NextFunction) => {

    const  headerToken = req.headers['authorization']
    console.log(headerToken)

    if(headerToken != undefined && headerToken.startsWith('Bearer')){
        
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.SECRET__KEY || 'ELTORPELLEGO')
            
            next()
        } catch (error) {
            res.status(401).json({
                msg:'Token no valido'
            })
        }
       
    }else {
        res.status(401).json({
            msg: 'Aceso denegado'
        })
    }
    
}

export default validateToken