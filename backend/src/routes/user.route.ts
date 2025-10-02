import express from "express";
import { getUserProfile, login, logout, signup, updateProfile, verifyOtp } from "../controllers/user.controller";
import { verifyJwt } from "../middlewares/auth.middleware";
import { upload } from "../utils/cloudinary";


const userRouter = express.Router();

userRouter.post("/signup", signup)
userRouter.post("/verifyOtp", verifyOtp)
userRouter.post("/login" ,login)
userRouter.post("/logout",verifyJwt,logout);
userRouter.post("/updateProfile", verifyJwt, upload.single('image'), updateProfile)
userRouter.get("/getProfile", verifyJwt, getUserProfile)



export default userRouter;