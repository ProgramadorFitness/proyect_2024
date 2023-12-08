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
Object.defineProperty(exports, "__esModule", { value: true });
exports.delet = exports.create = exports.list = void 0;
const collectors_models_1 = require("../models/collectors.models");
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collector = yield collectors_models_1.Collectors.findAll();
        return res.status(200).json(collector);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.list = list;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield collectors_models_1.Collectors.create(Object.assign({}, req.body));
        return res.status(200).json({ "message": "Collector save" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.create = create;
const delet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield collectors_models_1.Collectors.destroy({ where: { id } });
        return res.status(200).json({ "message": "Collector Destroy" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
});
exports.delet = delet;
