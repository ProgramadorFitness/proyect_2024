import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../models/user";
import jwt from 'jsonwebtoken'
import { json } from "sequelize";


export const newUser = async (req: Request, res: Response) => {

    const {id, username, password, type} = req.body;

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
            id_user: id,
            username: username,
            password: hashPassword,
            type: type
            
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
    console.log(res)


    //--Validacion de usuario
     const user: any = await User.findOne({where:{username: username}})

     if(!user){
        return res.status(400).json({
            msg: 'No existe un usuario con el nombre ' + username
        })
     }

     const id: any = user.id_user
     //console.log(id)

     // Extraer type

    const typeVali: 'admin' | 'client' |'collector' | 'supervisor' = user.type

    if (typeVali === 'admin') {
        console.log('El usuario es un administrador.');
      } else if (typeVali === 'supervisor') {
        console.log('El usuario es un usuario regular.');
      }else if (typeVali === 'collector') {
        console.log('El usuario es un usuario regular.');
      }else if (typeVali === 'client') {
        console.log('El usuario es un usuario regular.');
      }else {
        console.log('El usuario es un invitado.');
      }

    // Validamos password

    const passwordVali = await bcrypt.compare(password, user.password)
    console.log(passwordVali)

    if(!passwordVali){
        return res.status(400).json({
            msg: 'Password Incorrecto'
        })
    }
    //console.log(typeVali)

    // Generamos token
const token = jwt.sign({
    username: username,
    type: typeVali,
    id: id
}, process.env.SECRET_KEY || 'ELTORPELLEGO',{
   
});


res.json(token)

    
}