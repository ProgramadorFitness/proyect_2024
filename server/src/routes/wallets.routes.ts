import express, { json,Router, urlencoded, Request, Response, RequestHandler } from "express";import { list, create, delet, One, update } from "../controllers/wallets.controller";


const WalletsRoutes = Router()

//--List
WalletsRoutes.get("/list", list)

//--list-ID
WalletsRoutes.get("/One/:id", One);

//--Create
WalletsRoutes.post("/create", create)

//--delete
WalletsRoutes.delete("/delete/:id", delet)

//--listjoin
WalletsRoutes.get("/listjoin/:id")

//--listjoin
WalletsRoutes.get("/listjoin")

//--listjoin
WalletsRoutes.get("/listjoinUser/:id") 

//--update
WalletsRoutes.put("/update/:id", update);


export default WalletsRoutes