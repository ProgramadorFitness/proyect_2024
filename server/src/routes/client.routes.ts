import { Router } from "express";
import { list } from "../controllers/client.controller";
import validateToken from "../controllers/valiidate_token";

const ClientRoutes = Router()

ClientRoutes.get("/list",validateToken, list);

export default ClientRoutes
