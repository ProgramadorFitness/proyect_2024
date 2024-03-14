import express, { json,Router, urlencoded, Request, Response, RequestHandler } from "express";import { list, create, delet, One, update, listOne } from "../controllers/wallets.controller";


const WalletsRoutes = Router()

//--List
WalletsRoutes.get("/list", list)

WalletsRoutes.get("/listOne")


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

WalletsRoutes.get("/listjoinUserName/:id")

//--update
WalletsRoutes.put("/update/:id", update);


export default WalletsRoutes