import { Request, Response } from "express";
import { connetToPrismaClient, connetToRedisServer } from "../db/dbConnections";
import {
  loginDataValidation,
  SignupZodValidation,
  verifyOtpValidation,
} from "../utils/zodValidation";
import {
  checkHashPasswords,
  generateSessionToken,
  hashPassword,
} from "../utils/helpers";
import { sendSignupOTPEmail } from "../utils/emailService";
import { uploadToCloudinary } from "../utils/cloudinary";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      res.status(400).json({ message: "invalid request body" });
      return;
    }

    const { success, error }: any = SignupZodValidation.safeParse({
      name: name,
      email: email,
      password: password,
    });

    if (!success) {
      res.status(400).json({ message: JSON.parse(error)[0]?.message });
      return;
    }

    const prismaClient = connetToPrismaClient();

    const existingUser = await prismaClient?.user?.findUnique({
      where: {
        email: email?.toLowerCase(),
      },
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const otpForTheUser = Math.floor(1000 + Math.random() * 9000);
    const redisClient = connetToRedisServer();

    const hashedPassword = await hashPassword(password?.trim());

    if (!hashedPassword) {
      throw new Error("Error while hashing the password");
    }

    const userData = {
      name: name?.trim(),
      password: hashedPassword,
      otpForTheUser,
    };

    redisClient?.set(
      email?.toLowerCase(),
      JSON.stringify(userData),
      "EX",
      60 * 5
    );
    sendSignupOTPEmail(email, otpForTheUser);
    res.status(200).json({ message: "OTP Sent To Your Email" });
  } catch (e) {
    console.log("@error while signin up the user");
    res.status(500).json({ message: "internal server error" });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400).json({ message: "Invalid Request Body" });
      return;
    }

    const { success, error }: any = verifyOtpValidation.safeParse({
      email,
      otp,
    });

    if (!success) {
      res.status(400).json({ message: JSON.parse(error)[0]?.message });
      return;
    }

    const redisClient = connetToRedisServer();
    const getUserData = await redisClient?.get(email?.toLowerCase()?.trim());

    if (!getUserData) {
      res
        .status(401)
        .json({ message: "OTP Expired Or Never Created For This Email" });
      return;
    }

    const jsonData = JSON.parse(getUserData);

    if (jsonData?.otpForTheUser !== otp) {
      res.status(400).json({ message: "Wrong OTP Entered" });
      return;
    }

    redisClient?.del(email?.toLowerCase()?.trim());

    const prismaClient = connetToPrismaClient();

    const existingUser = await prismaClient?.user.findUnique({
      where: {
        email: email?.toLowerCase()?.trim(),
      },
    });

    if (existingUser) {
      res.status(400).json({ message: "Email already used" });
      return;
    }

    await prismaClient?.user.create({
      data: {
        name: jsonData?.name,
        email: email?.toLowerCase()?.trim(),
        password: jsonData?.password,
      },
    });
    generateSessionToken(email, res);
    res.status(200).json({ message: "Account Created Successfully" });
  } catch (e) {
    console.log("@error while verifying the otp ", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const { success } = loginDataValidation.safeParse({
      email,
      password,
    });

    if (!success) {
      res.status(400).json({ message: "Invalid Credentials" });
    }

    const prismaClient = connetToPrismaClient();

    const user = await prismaClient?.user.findUnique({
      where: {
        email: email?.trim()?.toLowerCase(),
      },
    });

    if (!user) {
      res
        .status(400)
        .json({ message: "Invalid Credentials, User Doesn't exist" });
      return;
    }

    const hashedPassword = await checkHashPasswords(
      password?.trim(),
      user.password
    );

    if (!hashedPassword) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    generateSessionToken(email, res);
    res.status(200).json({ message: "Login Successfull" });
  } catch (e) {
    console.log("@error in login controller ", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("sessionToken", null);
    res.status(200).json({ message: "Logout successfull" });
  } catch (e) {
    console.log("@error at logout controller ", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "profile image is required" });
      return;
    }

    const response = await uploadToCloudinary(req.file.path);
    if (!response) {
      throw new Error("Error at cloudinary");
    }
    let urlProfile = response?.url;
    const prismaClient = connetToPrismaClient();

    const userUpdated = await prismaClient?.user.update({
        where: {
            email: req?.user
        },
        data: {
            profileUrl: urlProfile
        }
    })

    if(!userUpdated){
        res.status(400).json({message: "user doesn't exist"});
        return;
    }

    res.status(200).json({ message: "profile updated successfully" });
  } catch (e) {
    console.log("@error while updating user profile ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getUserProfile = async(req: any, res: Response)=>{
    try{
        const user = req?.user;
        
        if(!user){
            res.status(400).json({message: "User email not found"});
            return;
        }

        const prismaClient = connetToPrismaClient();


        const existingUser = await prismaClient?.user.findUnique({
            where: {
                email: user
            }
        });

        if(!existingUser){
            res.status(400).json({message: "User doesn't exist"});
            return;
        }

        const dataToSend = {
            email: existingUser?.email,
            name: existingUser?.name,
            profileUrl: existingUser?.profileUrl
        }

        res.status(200).json({message: "profile fetched successfully", user: dataToSend});

    }catch(e){
        console.log("@error while getting user profile ",e);
        res.status(500).json({message: "Internal Server Error"});
    }
}
