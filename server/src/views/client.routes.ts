import { Router } from "express";
import { One, create, delet, list, update } from "../controllers/client.controller";
import validateToken from "../controllers/valiidate_token";

const ClientRoutes = Router()

//--list
ClientRoutes.get("/list",validateToken, list);

//--list-ID
ClientRoutes.get("/One/:id", One);

ClientRoutes.delete("/delete/:id", delet);

//--Create
ClientRoutes.post("/create", create);

//--list-identication
ClientRoutes.get("/ident/:id");

//--update
ClientRoutes.put("/update/:id", update);

export default ClientRoutes
