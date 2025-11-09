import axios from "axios";

export const signup = async(name: string, email: string, password: string)=>{
    try{
        const reqObj = {
            name,
            email,
            password
        }
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`,reqObj);
        const res = {
            success: true,
            message: response?.data?.message ?? "OTP Sent to Your Email"
        }
        return res;
    }catch(e:any){
        console.log("@error while signup ",e);
        const res = {
            success: false, 
            message: e?.response?.data?.message ?? "Error while signing up the user"
        }
        return res;
    }
}