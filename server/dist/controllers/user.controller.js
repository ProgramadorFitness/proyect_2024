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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, username, password } = req.body;
    //--Validacion de usuario
    const user = yield user_1.default.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: 'Usuario existente'
        });
    }
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield user_1.default.create({
            id_collector: id,
            username: username,
            password: hashPassword
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
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //--Validacion de usuario
    const user = yield user_1.default.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: 'No existe un usuario con el nombre ' + username
        });
    }
    // Validamos password
    const passwordVali = yield bcrypt_1.default.compare(password, user.password);
    console.log(passwordVali);
    if (!passwordVali) {
        return res.status(400).json({
            msg: 'Password Incorrecto'
        });
    }
    // Generamos token
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'ELTORPELLEGO', {});
    res.json(token);
});
exports.loginUser = loginUser;
