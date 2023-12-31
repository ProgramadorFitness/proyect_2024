import { Router } from "express";
import { newUser, loginUser} from "../controllers/user.controller";

const routesUser = Router();

routesUser.post('/create', newUser);

routesUser.post('/login', loginUser)

export default routesUser