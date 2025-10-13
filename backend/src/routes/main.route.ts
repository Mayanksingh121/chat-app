import express from "express";
import userRouter from "./user.route";
import { messagesRouter } from "./messages.route";


const mainRouter = express.Router();


mainRouter.use("/user",userRouter);
mainRouter.use("/messages",messagesRouter)



export default mainRouter;