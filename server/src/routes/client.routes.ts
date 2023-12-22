import { Router } from "express";
import { One, create, list, update } from "../controllers/client.controller";
import validateToken from "../controllers/valiidate_token";

const ClientRoutes = Router()

//--list
ClientRoutes.get("/list",validateToken, list);

//--list-ID
ClientRoutes.get("/One/:id", One);

//--Create
ClientRoutes.post("/create", create);

//--list-identication
ClientRoutes.get("/ident/:id");

//--update
ClientRoutes.put("/update/:id", update);
export default ClientRoutes
