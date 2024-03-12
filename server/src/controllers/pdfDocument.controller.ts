import PdfDocument from "../models/pdfDocument";
import mimeTypes from 'mime-types';
import multer = require('multer');
const path = require('path');
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs'
import { QueryError } from "sequelize";
import { connection1 } from "../db/connection";
import { RequestHandler } from 'express-serve-static-core';



  const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const fileUpload = multer({
    storage: diskStorage,
  }).single('pdf');

  const uploadPdf = async (req:any, res:any) => {
    try {
      const pdfFile = req.file
      const { id_client } = req.body;
      const { mimetype, originalname, filename } = pdfFile;
  
      const data = fs.readFileSync(path.join(__dirname, '../images/' + filename));
  
      await PdfDocument.create({
        type: mimetype,
        name: originalname,
        data,
        id_client,
      });
  
      res.send('Pdf saved!');
    } catch (error) {
      console.error('Error uploading Pdf:', error);
      res.status(500).send('Internal server error');
    }
  };

  interface pdfAttributes {
    id:string;
    type: string;
    name: string;
    data: Buffer; // Usar Buffer para representar datos binarios
    id_client: string;
  }
  
  const getPdfMetadata: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const documentModels = await PdfDocument.findAll({ where: { id_client: id } });
      const documentDir = path.join(__dirname, '../dbImages');
  
      // Asegurarse de que el directorio exista, si no, créalo
      if (!fs.existsSync(documentDir)) {
        fs.mkdirSync(documentDir, { recursive: true });
      }
  
      for (const document of documentModels) {
        try {
          const bufferData = document.getDataValue('data') as Buffer | undefined;
          const mimeType = document.get('mimeType') as string; // Asegurarte de que es una cadena
  
          if (bufferData) {
            let extension =  document.get('type')
            console.log(extension)
            // Manejar diferentes tipos de archivos según su tipo (type)
            if (extension === 'application/pdf') {
              extension = 'pdf';
            } else if (extension === 'image/jpeg' || extension === 'image/png') {
              extension = 'png'; // Puedes ajustar según los tipos de imágenes que manejes
            }
  
            const fileName = `${document.get('id')}.${extension}`;
            const filePath = path.join(documentDir, fileName);
  
            fs.writeFileSync(filePath, bufferData);
  
            console.log(`Documento con ID ${document.get('id')} guardado en ${filePath}`);
          } else {
            console.error(`El campo 'data' no es un Buffer para el documento con ID ${document.get('id')}`);
          }
        } catch (error) {
          console.error(`Error al obtener 'data' para el documento con ID ${document.get('id')}:`, error);
        }
      }
  
      const documentFiles = fs.readdirSync(documentDir);
  
      return res.status(200).json(documentFiles);
    } catch (error) {
      console.error('Error al obtener metadatos del documento:', error);
      return res.status(500).json({ message: 'Hubo un error', error: error });
    }
  };
  


  export { fileUpload, uploadPdf, getPdfMetadata };





