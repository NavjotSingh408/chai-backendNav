import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



const DBConnect = async ()=>{
    try {
      const connInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Mongo Connnected HOST : ${connInstance.connection.host}`);       
    } catch (error) {
        console.error("ERROR in connection : ",error); 
        process.exit(1);       
    }
}

export default DBConnect