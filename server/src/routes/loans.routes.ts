import { Router } from "express";
import {list, create, delet} from '../controllers/loans.controller';

const LoansRoutes = Router()

//--List
LoansRoutes.get("/list", list)

//--Create
LoansRoutes.post("/create", create)

//--delete
LoansRoutes.delete("/delete/:id", delet)

//--list join
LoansRoutes.get("/listjoin")

//--list join
LoansRoutes.get("/listjoin/:id")

//--list join
LoansRoutes.get("/listjoinUser/:id")

//--list join
LoansRoutes.get("/listjoinUserCollector/:id")


export default LoansRoutes