import PdfDocument from "../models/pdfDocument";
import multer = require('multer');
const path = require('path');
import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as fs from 'fs'
import { QueryError } from "sequelize";
import { connection1 } from "../db/connection";



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
    type: string;
    name: string;
    data: Buffer; // Usar Buffer para representar datos binarios
    id_client: string;
  }
  

  const getPdfMetadata: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const pdfDocument = await PdfDocument.findAll({ where: { id_client: id } });
  
      const pdfDir = path.join(__dirname, '../dbImages');
  
      // Asegurarse de que el directorio exista, si no, créalo
      if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
      }
  
      pdfDocument.forEach(async (pdf) => {
        try {
          // Asumiendo que pdf.data es un campo BLOB
          const bufferData = await pdf.getDataValue('data');
          if (bufferData instanceof Buffer) {
            fs.writeFileSync(path.join(pdfDir, `${pdf.id}.pdf`), bufferData);
          } else {
            console.error(`El campo 'data' no es un Buffer para el PDF con ID ${pdf.id}`);
          }
        } catch (error) {
          console.error(`Error al obtener 'data' para el PDF con ID ${pdf.id}:`, error);
        }
      });
  
      const pdfFiles = fs.readdirSync(pdfDir);
  
      return res.status(200).json(pdfFiles);
    } catch (error) {
      console.error('Error al obtener metadatos de PDF:', error);
      return res.status(500).json({ message: 'Hubo un error', error: error });
    }
  };
  export { fileUpload, uploadPdf, getPdfMetadata };





