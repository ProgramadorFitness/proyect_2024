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
exports.getPdfMetadata = exports.uploadPdf = exports.fileUpload = void 0;
const pdfDocument_1 = __importDefault(require("../models/pdfDocument"));
const multer = require("multer");
const path = require('path');
const fs = __importStar(require("fs"));
const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});
const fileUpload = multer({
    storage: diskStorage,
}).single('pdf');
exports.fileUpload = fileUpload;
const uploadPdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pdfFile = req.file;
        const { id_client } = req.body;
        const { mimetype, originalname, filename } = pdfFile;
        const data = fs.readFileSync(path.join(__dirname, '../images/' + filename));
        yield pdfDocument_1.default.create({
            type: mimetype,
            name: originalname,
            data,
            id_client,
        });
        res.send('Pdf saved!');
    }
    catch (error) {
        console.error('Error uploading Pdf:', error);
        res.status(500).send('Internal server error');
    }
});
exports.uploadPdf = uploadPdf;
const getPdfMetadata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const documentModels = yield pdfDocument_1.default.findAll({ where: { id_client: id } });
        const documentDir = path.join(__dirname, '../dbImages');
        // Asegurarse de que el directorio exista, si no, créalo
        if (!fs.existsSync(documentDir)) {
            fs.mkdirSync(documentDir, { recursive: true });
        }
        for (const document of documentModels) {
            try {
                const bufferData = document.getDataValue('data');
                const mimeType = document.get('mimeType'); // Asegurarte de que es una cadena
                if (bufferData) {
                    let extension = document.get('type');
                    console.log(extension);
                    // Manejar diferentes tipos de archivos según su tipo (type)
                    if (extension === 'application/pdf') {
                        extension = 'pdf';
                    }
                    else if (extension === 'image/jpeg' || extension === 'image/png') {
                        extension = 'png'; // Puedes ajustar según los tipos de imágenes que manejes
                    }
                    const fileName = `${document.get('id')}.${extension}`;
                    const filePath = path.join(documentDir, fileName);
                    fs.writeFileSync(filePath, bufferData);
                    console.log(`Documento con ID ${document.get('id')} guardado en ${filePath}`);
                }
                else {
                    console.error(`El campo 'data' no es un Buffer para el documento con ID ${document.get('id')}`);
                }
            }
            catch (error) {
                console.error(`Error al obtener 'data' para el documento con ID ${document.get('id')}:`, error);
            }
        }
        const documentFiles = fs.readdirSync(documentDir);
        return res.status(200).json(documentFiles);
    }
    catch (error) {
        console.error('Error al obtener metadatos del documento:', error);
        return res.status(500).json({ message: 'Hubo un error', error: error });
    }
});
exports.getPdfMetadata = getPdfMetadata;
