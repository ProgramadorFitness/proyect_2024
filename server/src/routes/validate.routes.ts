import { Router } from "express";
import validateToken from "../controllers/valiidate_token";

const routesValidate = Router()

routesValidate.post("/",validateToken);

export default routesValidate