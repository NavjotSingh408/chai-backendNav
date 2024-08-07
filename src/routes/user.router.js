import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; //this upload will be used by us as a middleware

const router = Router()

router.route("/register").post(
    upload.fields([  //this is our middleware that will execute before registerUser
        {
            name: "avatar",
            maxCount :1
        },
        {
            name : "coverImage",
            maxCount : 1
        }
    ]),registerUser)

export default router