import express from "express";
import {createServer} from "http";
import dotenv from "dotenv";
import { createWsServer } from "./websocket";


const server = express
const app = createServer(server);
dotenv.config();
createWsServer(app);


const startServer = async()=>{
try{
    app.listen(process.env.PORT, ()=>{
        console.log("Server listening on port ", process.env.PORT)
    })
}catch(e){
console.log("@error while starting the server", e);
}
}

startServer();

