import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"


const app = express()
app.use(cors({
    origin : process.env.CORS_ORI,
    credentials : true
}))   //cors configuration

app.use(express.json({limit : "16kb"})) // json limit configuration
app.use(express.urlencoded({extended : true , limit : "16kb"}))  // url encoded config
app.use(express.static('public'))
app.use(express.cookieParser())

export default app;