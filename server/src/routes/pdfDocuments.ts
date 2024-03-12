import {Request, Response } from 'express';
import * as express from 'express';
import { fileUpload, uploadPdf, getPdfMetadata} from '../controllers/pdfDocument.controller';

const documentsRouter = express.Router();

// Configuración de rutas
documentsRouter.post('/upload', fileUpload, uploadPdf);

documentsRouter.get('/uploadImage/:id',  getPdfMetadata);

export default documentsRouter;
