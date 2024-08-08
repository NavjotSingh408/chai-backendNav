import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()
app.use(cors({
    origin : process.env.CORS_ORI,
    credentials : true
}))   //cors configuration

app.use(express.json({limit : "16kb"})) // json limit configuration
app.use(express.urlencoded({extended : true , limit : "16kb"}))  // url encoded config
app.use(express.static('public'))
app.use(cookieParser())

//import routes
import userRouter from "./routes/user.router.js"

//routes declaration
//pej=hle yahin routes likte the or yahin controllers likhte the 
//ab routes ko lane k liye middleware ka use krenge
app.use("/api/v1/users" , userRouter)
// ye wala address prefix ki tarah kaam kr rha hai
export default app;