import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiErrors } from "../utils/ApiErrors.js"
import { User } from "../models/user.modal.js"
import {uploadToCloudnairy} from "../utils/cloudnairy.js"
import { ApiResponse } from "../utils/ApiResponse.js"

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

    const {fullname,email,username,password} = req.body

    // res.status(200).json({
    //     message : "ok yes mera phone hai Poco x6 pro 5g",
    //     username : username,
    //     email : email,
    //     fullname : fullname,
    //     avatar : avatar,
    //     password : password,
    // })

    if (
        [fullname,email,username,password].some((field)=>field?.trim() === "")
    ) {
        throw new ApiErrors(400,"All fields are necessary")
    }

    const userExisted = await User.findOne({
        $or: [{email},{username}]
    })    //finds first one that matches

    if (userExisted) {
        throw new ApiErrors(409, "User with same details already exists")
    }
    
    //we are getting the path of avatar file and cover
    // console.log("files paths : ");
    // console.log(req.files);
        
    const avatarLoacalPath = req.files?.avatar[0]?.path;
    // const coverLocalPath = req.files?.coverImage[0]?.path; //this handling can produce errors
    let coverLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverLocalPath = req.files.coverImage[0].path   
    }


    if (!avatarLoacalPath) {
        // after getting path make ref in not empty
        throw new ApiErrors(400,"Avatar not found")
    }
    //upload To cloudnairy receives a path of file to upload
    
    const avtarRef = await uploadToCloudnairy(avatarLoacalPath) //upload krwane ka method time lgayega
    const coverRef = await uploadToCloudnairy(coverLocalPath)

    if (!avtarRef) {
        throw new ApiErrors(400,"Avatar not uploaded")
    }

    const newUser =  await User.create({
        fullname,
        avatar : avtarRef.url,
        coverImage : coverRef?.url || "",
        email,
        password,
        username : username.toLowerCase(),
    })

    // //checking user is created or not
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiErrors(500,"Something went wrong while registering")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Created Successfully")
    )

})

export {registerUser}