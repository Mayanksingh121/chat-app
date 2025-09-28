import { Request, Response } from "express";
import { connetToPrismaClient, connetToRedisServer } from "../db/dbConnections";
import { SignupZodValidation, verifyOtpValidation } from "../utils/zodValidation";
import { hashPassword } from "../utils/helpers";

export const signup = async(req: Request, res: Response)=>{
    try{
        const {email, name, password} = req.body;

        if(!email || !name || !password){
            res.status(400).json({message: "invalid request body"});
            return;
        }

        const {success, error}: any = SignupZodValidation.safeParse({
            name: name,
            email: email,
            password: password
        });

        if(!success){
            res.status(400).json({message: JSON.parse(error)[0]?.message})
            return;
        }

        const prismaClient = connetToPrismaClient();

        const existingUser = await prismaClient?.user?.findUnique({
            where: {
                email: email?.toLowerCase()
            }
        });

        if(existingUser){
            res.status(400).json({message: "User already exists"});
            return;
        }

        const otpForTheUser = Math.floor(1000 + Math.random() * 9000);
        const redisClient = connetToRedisServer();


        const hashedPassword = await hashPassword(password?.trim());

        if(!hashedPassword){
            throw new Error("Error while hashing the password");
        }

        const userData = {
            name: name?.trim(),
            password: hashedPassword,
            otpForTheUser
        }

        redisClient?.set(email?.toLowerCase(), JSON.stringify(userData) , 'EX', 60*5);
        res.status(200).json({message: "OTP Sent To Users Email"})
    }catch(e){
        console.log("@error while signin up the user");
        res.status(500).json({message: "internal server error"});
    }
}

export const verifyOtp = async(req: Request, res: Response)=>{
    try{
        const {email, otp} = req.body;

        if(!email || !otp){
            res.status(400).json({message: "Invalid Request Body"});
            return;
        }

        const {success, error}: any = verifyOtpValidation.safeParse({
            email,
            otp
        })

        if(!success){
            res.status(400).json({message: JSON.parse(error)[0]?.message});
            return;
        }

        const redisClient = connetToRedisServer();
        const getUserData = await redisClient?.get(email?.toLowerCase()?.trim());

        if(!getUserData){
            res.status(401).json({message: "OTP Expired Or Never Created For This Email"});
            return;
        }

        const jsonData = JSON.parse(getUserData);

        if(jsonData?.otpForTheUser !== otp){
            res.status(400).json({message: "Wrong OTP Entered"});
            return;
        }

        redisClient?.del(email?.toLowerCase?.trim());
        
        const prismaClient = connetToPrismaClient();

    }catch(e){
        console.log("@error while verifying the otp ", e);
        res.status(500).json({message: "Internal Server Error"});
    }
}