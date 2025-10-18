import { ILoginBody, ISignupBody } from "@/types";
import axios from "axios";

export const signup = async(userData: ISignupBody)=>{
    try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}user/signup`,userData);
        return response;
    }catch(e){
        console.log("@error while signing up ",e);
        return null;
    }
}

export const login = async(userData: ILoginBody)=>{
    try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}user/login`, userData);
        return response;
    }catch(e){
        console.log("@error while logging in ",e);
        return null;
    }
}