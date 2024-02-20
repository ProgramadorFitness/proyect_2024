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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const pdfDocument_1 = __importDefault(require("../models/pdfDocument"));
const documentsRouter = express_1.default.Router();
const upload = (0, multer_1.default)();
documentsRouter.post('/upload', upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'id_cliente', maxCount: 1 }]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Archivo PDF no encontrado en la solicitud.' });
        }
        const { originalname, mimetype, filename, size } = req.file;
        const idCliente = req.body['id_cliente'];
        if (size == null) {
            return res.status(400).json({ error: 'El tamaño del archivo no puede ser nulo.' });
        }
        const newPdfDocument = yield pdfDocument_1.default.create({
            originalname: originalname || 'N/A',
            mimetype: mimetype || 'N/A',
            filename: filename || 'N/A',
            size: size || 0,
            id_cliente: idCliente
        });
        return res.status(200).json({ message: 'PDF subido exitosamente.', pdfDocument: newPdfDocument });
    }
    catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
}));
documentsRouter.get('/upload/:id_cliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pdfId = req.params.id_cliente;
        const pdfData = yield pdfDocument_1.default.findByPk(pdfId, { attributes: ['originalname', 'mimetype', 'filename', 'size', 'id_cliente'] });
        if (!pdfData) {
            return res.status(404).json({ error: 'PDF no encontrado.' });
        }
        return res.status(200).json(pdfData);
    }
    catch (error) {
        console.error('Error al obtener metadatos del PDF:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
}));
/*documentsRouter.get('/:id', async (req, res) => {
  try {
    const pdfId = req.params.id;

    // Busca el PdfDocument en la base de datos por su ID
    const pdfDocument = await PdfDocument.findByPk(pdfId);

    if (!pdfDocument) {
      return res.status(404).json({ error: 'PDF no encontrado.' });
    }

    // Devuelve el contenido del PDF como una respuesta binaria
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfDocument.content);
  } catch (error) {
    console.error('Error al recuperar el PDF:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});*/
exports.default = documentsRouter;
