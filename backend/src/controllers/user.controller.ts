import { Request, Response } from "express";

export const signup = async(req: Request, res: Response)=>{
    try{
        const {email, name, password} = req.body;

        if(!email || !name || !password){
            res.status(400).json({message: "invalid request body"});
            return;
        }

        


    }catch(e){
        console.log("@error while signin up the user");
        res.status(500).json({message: "internal server error"});
    }
}