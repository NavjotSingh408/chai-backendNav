import dotenv from "dotenv"
import DBConnect from "./db/dbconn.js"

dotenv.config({
    path: './env'
})

DBConnect();

/*
import express from "express";

const app=express();

;( async ()=>{
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    
      app.on("error",(error)=>{
        console.error("Express Error : ",error);
        throw error
      })
      app.listen(process.env.PORT,()=>{
        console.log(`APP is listening on port : ${process.env.PORT}`);        
      })

    } catch (error) {
        console.error("ERROR connecting DB : ",error);        
    }
})()
*/