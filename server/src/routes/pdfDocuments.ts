import express, { Request, Response } from 'express';
import multer from 'multer';
import PdfDocument from "../models/pdfDocument";

const documentsRouter = express.Router();


const upload = multer();

documentsRouter.post('/upload', upload.fields([{name:'pdf', maxCount:1}, {name:'id_cliente', maxCount:1}]), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Archivo PDF no encontrado en la solicitud.' });
      }
  
      const { originalname, mimetype, filename, size } = req.file;
      const idCliente = req.body['id_cliente'];
  
      if (size == null) {
        return res.status(400).json({ error: 'El tamaño del archivo no puede ser nulo.' });
      }
  
      const newPdfDocument = await PdfDocument.create({
        originalname: originalname || 'N/A',
        mimetype: mimetype || 'N/A',
        filename: filename || 'N/A',
        size: size || 0,
        id_cliente:idCliente
      });
  
      return res.status(200).json({ message: 'PDF subido exitosamente.', pdfDocument: newPdfDocument });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });

  documentsRouter.get('/upload/:id_cliente', async (req, res) => {
    try {
      const pdfId = req.params.id_cliente;
      const pdfData = await PdfDocument.findByPk(pdfId, { attributes: ['originalname', 'mimetype', 'filename', 'size', 'id_cliente'] });
  
      if (!pdfData) {
        return res.status(404).json({ error: 'PDF no encontrado.' });
      }
  
      return res.status(200).json(pdfData);
    } catch (error) {
      console.error('Error al obtener metadatos del PDF:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });

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
  
export default documentsRouter;