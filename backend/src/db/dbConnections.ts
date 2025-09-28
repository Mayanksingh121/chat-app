import Redis from "ioredis";
import { PrismaClient } from "../generated/prisma";


let redisClient : null | Redis = null;
let prismaClient: null | PrismaClient = null;


export const connetToRedisServer = ()=>{
    try{
       if(!redisClient){
        redisClient = new Redis(6379, '127.0.0.1');
       }
       return redisClient;  
    }catch(e){
        console.log("@error while connecting to the redis server ",e);
        return null;
    }
}


export const connetToPrismaClient = ()=>{
    try{
        if(!prismaClient){
            prismaClient = new PrismaClient();
        }
        return prismaClient;
    }catch(e){
        console.log("@error while connecting to prisma client ",e);
        return null;
    }
}