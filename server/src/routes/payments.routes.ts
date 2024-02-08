import { Router } from "express";
import { create, create2, list } from "../controllers/payments.controllers";

const paymentsRoutes = Router();

paymentsRoutes.get("/list");

paymentsRoutes.get("/pay/:id");

paymentsRoutes.get("/listjoin/:id");

paymentsRoutes.get("/pay2/:id");

paymentsRoutes.post("/create", create);

paymentsRoutes.put("/create2/:id", create2);



export default paymentsRoutes