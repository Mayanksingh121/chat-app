import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const verifyJwt = (req: any, res:Response, next: NextFunction)=>{
    try{
        const token = req.cookies.sessionToken;

        if(!token){
            res.status(401).json({message: "Access Denied, session expired"});
            return;
        }

        if(!process.env.JWT_SECRET){
            throw new Error("jwt secret not present in the env");
        }

        const decoded : any = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

        if(!decoded){
            res.status(401).json({message: "Access Denied, session expired"});
            return;
        }

        if(req.body){
            req.body.user = decoded?.email;
        }else{
            req.user = decoded?.email;
        }
        next();
    }catch(e){
        console.log("@error at jwt verify middleware ", e);
        res.status(500).json({message: "Internal Server Error"});
    }
}