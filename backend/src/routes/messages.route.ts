import express from "express";
import { getMessages } from "../controllers/messages.controller";
import { verifyJwt } from "../middlewares/auth.middleware";


export const messagesRouter = express.Router();


messagesRouter.get("/get-messages", verifyJwt ,getMessages)