import { Request, Response } from "express";
import { connetToPrismaClient } from "../db/dbConnections";

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
        
    }catch(e){
        console.log("@error while adding message to the db ",e);
        res.status(500).json({message:"Internal server error"});
    }
}