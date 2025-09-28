import express from "express";
import { login, logout, signup, verifyOtp } from "../controllers/user.controller";
import { verifyJwt } from "../middlewares/auth.middleware";


const userRouter = express.Router();

userRouter.post("/signup", signup)
userRouter.post("/verifyOtp", verifyOtp)
userRouter.post("/login" ,login)
userRouter.post("/logout",verifyJwt,logout);



export default userRouter;