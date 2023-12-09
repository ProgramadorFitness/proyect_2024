import { Router } from "express";
import { create, list } from "../controllers/client.controller";
import validateToken from "../controllers/valiidate_token";

const ClientRoutes = Router()

ClientRoutes.get("/list",validateToken, list);

//--Create
ClientRoutes.post("/create", create)

//--list-identication
ClientRoutes.get("/ident/:id")

export default ClientRoutes
