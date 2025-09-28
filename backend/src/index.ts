import express from "express";
import {createServer} from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createWsServer } from "./websocket";
import mainRouter from "./routes/main.route";
import { connetToRedisServer } from "./db/dbConnections";
import { connetToPrismaClient } from "./db/dbConnections";


const server = express();
const app = createServer(server);
dotenv.config();
createWsServer(app);


const startServer = async()=>{
try{
    server.use(express.json());
    server.use(cookieParser());
    server.use("/api/v1", mainRouter)
    const redisClient = connetToRedisServer()
    const prismaClient = connetToPrismaClient();
    if(redisClient === null){
        throw new Error("can't connect to redis server ");
    }

    if(prismaClient === null){
        throw new Error("can't connet to prisma client");
    }
    app.listen(process.env.PORT, ()=>{
        console.log("Server listening on port ", process.env.PORT)
    })
}catch(e){
console.log("@error while starting the server", e);
}
}

startServer();

