import { Router } from "express";
import { list } from "../controllers/client.controller";
import validateToken from "./valiidate_token";

const ClientRoutes = Router()

ClientRoutes.get("/list",validateToken, list)
