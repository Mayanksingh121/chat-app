import express from "express";
import { signup, verifyOtp } from "../controllers/user.controller";


const userRouter = express.Router();

userRouter.post("/signup", signup)
userRouter.post("/verifyOtp", verifyOtp)



export default userRouter;