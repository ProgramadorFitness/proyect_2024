"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = async (req, res) => {
    const { id, username, password, type } = req.body;
    //--Validacion de usuario
    const user = await user_1.default.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: 'Usuario existente'
        });
    }
    const hashPassword = await bcrypt_1.default.hash(password, 10);
    try {
        await user_1.default.create({
            id_user: id,
            username: username,
            password: hashPassword,
            type: type
        });
        res.json({
            msg: 'New User' + username,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error:', error
        });
    }
};
exports.newUser = newUser;
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log(res);
    //--Validacion de usuario
    const user = await user_1.default.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: 'No existe un usuario con el nombre ' + username
        });
    }
    const id = user.id_user;
    //console.log(id)
    // Extraer type
    const typeVali = user.type;
    if (typeVali === 'admin') {
        console.log('El usuario es un administrador.');
    }
    else if (typeVali === 'supervisor') {
        console.log('El usuario es un usuario regular.');
    }
    else if (typeVali === 'collector') {
        console.log('El usuario es un usuario regular.');
    }
    else if (typeVali === 'client') {
        console.log('El usuario es un usuario regular.');
    }
    else {
        console.log('El usuario es un invitado.');
    }
    // Validamos password
    const passwordVali = await bcrypt_1.default.compare(password, user.password);
    console.log(passwordVali);
    if (!passwordVali) {
        return res.status(400).json({
            msg: 'Password Incorrecto'
        });
    }
    //console.log(typeVali)
    // Generamos token
    const token = jsonwebtoken_1.default.sign({
        username: username,
        type: typeVali,
        id: id
    }, process.env.SECRET_KEY || 'ELTORPELLEGO', {});
    res.json(token);
};
exports.loginUser = loginUser;
