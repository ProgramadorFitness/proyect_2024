import { Router } from "express";
import { create, list } from "../controllers/payments.controllers";

const paymentsRoutes = Router();

paymentsRoutes.get("/list", list)

paymentsRoutes.get("/create", create)

export default paymentsRoutes