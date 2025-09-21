import { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";

export function createWsServer(server: Server){
    try{
        const wss = new WebSocketServer({server});
        wss.on("connection", (ws: WebSocket)=>{
            
            ws.on('error', (e)=>{
                console.log(e);
            })

            ws.on('close', ()=>{
                console.log("socket connection disconnected");
            });

            ws.on('message', ()=>{

            })
        })
    }catch(e){
        console.log("@error while creting ws server ",e);
    }
}