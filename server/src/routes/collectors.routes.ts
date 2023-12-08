import { Router } from "express";
import { list, create, delet } from "../controllers/collectors.controller";

const CollectorsRoutes = Router()

//--List
CollectorsRoutes.get("/list", list)

//--Create
CollectorsRoutes.post("/create", create)

//--delete
CollectorsRoutes.delete("/delete/:id", delet)

export default CollectorsRoutes