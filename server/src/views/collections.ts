import { Router } from "express";
import { list } from "../controllers/collections.controller";

const collectionsRoutes = Router();

collectionsRoutes.get("/list", list);

collectionsRoutes.get("/listjoin");

collectionsRoutes.get("/listjoinID/:id");

collectionsRoutes.get("/listjoinIDUser/:id");

collectionsRoutes.get("/listjoinIDUserCollector/:id");


export default collectionsRoutes