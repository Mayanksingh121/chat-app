import { Request, Response } from "express";
import { connetToPrismaClient } from "../db/dbConnections";
import { addMessageValidation } from "../utils/zodValidation";
import { sendMessage } from "../websocket";

export const getMessages = async(req: any, res:Response)=>{
    try{
        const {receiverId, limit=20, skip} = req.query;

        if(limit>50){
            res.status(400).json({message: "can't process more than 50 messages at a time"});
            return;
        }

        if(skip===null || skip===undefined || skip<0){
            res.status(400).json({message: "Invalid message request"});
            return;
        }
        const prismaClient = connetToPrismaClient();

        const email = req.user;

        const existingUser = await prismaClient?.user.findUnique({
            where: {
                email: email
            }
        })

        if(!existingUser){
            res.status(401).json({message: "User not found"});
            return;
        }

        const messages = await prismaClient?.messages.findMany({
            where: {
                OR: [
                    {receiverId: Number(receiverId), senderId: existingUser?.id},
                    {senderId: Number(receiverId), receiverId: existingUser?.id}
                ]
            },
            orderBy: {
                createdAt: 'asc'
            },
            skip: skip * limit,
            take: limit
        });

        res.status(200).json({message: "messages fetched successfully", userMessages: messages})

    }catch(e){
        console.log("@error while getting the messages ",e);
        res.status(500).json({message: "Internal server error"});
    }
}

export const addMessages = async(req: Request, res:Response)=>{
    try{
        const {user, receiverId, message} = req.body;

        if(!user || !receiverId || !message){
            res.status(400).json({message: "Invalid request body"});
            return;
        }

        const {success, error} : any= addMessageValidation.safeParse({
            email: user,
            receiverId,
            message
        })

        if(!success){
            res.status(400).json({ message: JSON.parse(error)[0]?.message });
            return;
        }

        const prismaClient = connetToPrismaClient();

        const usersFromDb = await prismaClient?.user.findMany({
            where: {
                OR: [
                    {email: user?.toLowerCase()?.trim()},
                    {id: receiverId}
                ]
            }
        });

        if(usersFromDb?.length!==2){
            res.status(400).json({message: "Invalid User Id"});
            return;
        }

        const sender = usersFromDb?.find((person)=>person?.email==user?.toLowerCase()?.tirm());

        if(!sender){
            res.status(400).json({message: "Invalid sender id"});
            return;
        }
        
        await prismaClient?.messages?.create({
            data: {
                senderId: sender?.id,
                receiverId: receiverId,
                message: message
            }
        });

        await sendMessage(message, sender.id, receiverId);

        res.status(200).json({message: "Message send successfully"});
    }catch(e){
        console.log("@error while adding message to the db ",e);
        res.status(500).json({message:"Internal server error"});
    }
}