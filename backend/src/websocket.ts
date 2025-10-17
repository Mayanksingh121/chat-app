import { Request } from "express";
import { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";

const connectedUsers = new Map<number, WebSocket>(); 

export function createWsServer(server: Server){
    try{
        const wss = new WebSocketServer({server});
        wss.on("connection", (ws: WebSocket, req: Request)=>{
            const url = new URL(req.url!, `http://${req.headers.host}`);
            const userId = Number(url.searchParams.get("userId"));

            if (!userId) {
                ws.close(1008, "User ID missing");
                return;
            }
            
            connectedUsers.set(userId, ws);

            ws.on('error', (e)=>{
                console.log(e);
            })

            ws.on('close', ()=>{
                connectedUsers.delete(userId);
                console.log("socket connection disconnected");
            });

        })
    }catch(e){
        console.log("@error while creting ws server ",e);
    }
}


export const sendMessage = async(message: string, receiverId: number ,senderId: number)=>{
    try{
        const receiverWebSocket = connectedUsers.get(receiverId)
        if(receiverWebSocket && receiverWebSocket.readyState===WebSocket.OPEN){
            const messageObj = {
                message: message,
                senderId: senderId
            }
            receiverWebSocket.send(JSON.stringify(messageObj));
        }
    }catch(e){
        console.log("@error while sending the messgage");
    }
}