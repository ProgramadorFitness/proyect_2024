import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../models/user";
import jwt from 'jsonwebtoken'
import { json } from "sequelize";


export const newUser = async (req: Request, res: Response) => {

    const {username, password} = req.body;

    //--Validacion de usuario
     const user = await User.findOne({where:{username: username}})

     if(user){
        return res.status(400).json({
            msg: 'Usuario existente'
        })
     }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            username: username,
            password: hashPassword 
        })
    
        res.json({
            msg: 'New User' + username ,
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Error:', error
        })
    }
    
}


export const loginUser = async (req: Request, res: Response) => {

    const {username, password} = req.body;

    //--Validacion de usuario
     const user: any = await User.findOne({where:{username: username}})

     if(!user){
        return res.status(400).json({
            msg: 'No existe un usuario con el nombre ' + username
        })
     }


    // Validamos password

    const passwordVali = await bcrypt.compare(password, user.password)
    console.log(passwordVali)

    if(!passwordVali){
        return res.status(400).json({
            msg: 'Password Incorrecto'
        })
    }

    // Generamos token
const token = jwt.sign({
    username: username
}, process.env.SECRET_KEY || 'ELTORPELLEGO',{
    expiresIn: '3000000'
});

res.json({token})

    
}