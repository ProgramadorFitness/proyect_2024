import {Request, Response } from 'express';
import * as express from 'express';
import { fileUpload, uploadPdf, getPdfMetadata, clearDbImages} from '../controllers/pdfDocument.controller';

const documentsRouter = express.Router();

// Configuración de rutas
documentsRouter.post('/upload', fileUpload, uploadPdf);

documentsRouter.get('/uploadImage/:id',  getPdfMetadata);

documentsRouter.get('/delete', clearDbImages)

export default documentsRouter;
