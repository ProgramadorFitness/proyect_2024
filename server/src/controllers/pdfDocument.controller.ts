import PdfDocument from "../models/pdfDocument";
import express, { Request, Response } from 'express';
import multer from 'multer';

async function savePdfToDatabase(pdfName: string, pdfContent: Buffer) {
    try {
        await PdfDocument.create({
            name: pdfName,
            content: pdfContent,
        });
        console.log('PDF guardado en la base de datos.');
    } catch (error) {
        console.error('Error al guardar el PDF en la base de datos:', error);
    }
}