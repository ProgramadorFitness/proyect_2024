import { Router } from "express";
import { list } from "../controllers/collections.controller";

const collectionsRoutes = Router();

collectionsRoutes.get("/list", list);

collectionsRoutes.get("/listjoin");

collectionsRoutes.get("/listjoinID/:id");


export default collectionsRoutes