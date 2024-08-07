import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiErrors } from "../utils/ApiErrors.js"
import { User } from "../models/user.modal.js"
import { uploadToCloudnairy } from "../utils/cloudnairy.js"

const registerUser = asyncHandler( async (req,res) => {
    // res.status(200).json({
    //     message : "ok yes mera phone hai Poco x6 pro 5g"
    // })

    //steps
    //get user details
    //validate - not empty
    //check if already exist or not
    //check for images , avatar
    //upload them to cloudnairy , avatar
    //create user object 
    //check response and remove pass and refresh token
    //return response

    const {username,email,fullname,avatar,password} = req.body

    if (
        [username,email,fullname,avatar,password].some((field)=>field?.trim() === "")
    ) {
        throw new ApiErrors(400,"All fields are necessary")
    }

    const userExisted = User.findOne(
        {
            $or : [{ username },{ email }]
        }
    )    //finds first one that matches

    if (userExisted) {
        throw new ApiErrors(409, "User with same details already exists")
    }
    
    const avatarLoacalPath = req.files?.avatar[0].path;
    const coverLocalPath = req.files?.avatar[0].path;

    if (!avatarLoacalPath) {
        throw new ApiErrors(400,"Avatar not found")
    }
    
    const avtarRef = uploadToCloudnairy(avatarLoacalPath)

    
})

export {registerUser}