import {asyncHandler} from "../utils/asyncHandler.js"

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
})

export {registerUser}