import { Router } from "express";
import { list } from "../controllers/collections.controller";

const collectionsRoutes = Router();

collectionsRoutes.get("/list", list);

collectionsRoutes.get("/listjoin");


export default collectionsRoutes