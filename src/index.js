import dotenv from "dotenv"
import DBConnect from "./db/dbconn.js"
import app from "./app.js"

dotenv.config({
    path: './.env'
})

DBConnect() //this function is async use .then and catch for further handling
.then(()=>{
  console.log("MongoDB connnected Successfully !!!");
  app.on("error",(error)=>{
    console.error(`An error occured in starting server !!! `,error);
  })

  app.listen(process.env.PORT || 8000 ,()=>{
    console.log(`SERVER listening to you at port ${process.env.PORT}`);
  })
})
.catch(()=>{
  console.error("MongoDB connection Failed : ",error);  
}) 


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