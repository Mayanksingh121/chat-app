import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) => {
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    if (hashedpassword) return hashedpassword;
    return null;
  } catch (e) {
    console.log("@error while encrypting the password ", e);
    return null;
  }
};

export const checkHashPasswords = async(actualPassword: string, hashedPassword: string)=>{
  try{
    const isPasswordSame = await bcrypt.compare(actualPassword, hashedPassword);
    return isPasswordSame;
  }catch(e){
    console.log("@error while checking if password are same , ",e);
    return null;
  }
}

export const generateSessionToken = (email: string, res:Response)=>{
  if(!process.env.JWT_SECRET){
    throw new Error("no jwt secret in env");
  }
  const token = jwt.sign({email: email}, process.env.JWT_SECRET);
  res.cookie("sessionToken", `Bearer ${token}`, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 3600000),
  })
}



