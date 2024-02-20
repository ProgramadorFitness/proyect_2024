import { Router } from "express";
import { list, create, delet, One, update } from "../controllers/collectors.controller";

const CollectorsRoutes = Router()

//--List
CollectorsRoutes.get("/list", list)

//--Create
CollectorsRoutes.post("/create", create)

//--Create
CollectorsRoutes.get("/One/:id", One)

//--delete
CollectorsRoutes.delete("/delete/:id", delet)

//--update
CollectorsRoutes.put("/update/:id", update);

export default CollectorsRoutes