const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
} //handking with promise

// const asyncHandler = (reqHandler) =>async (req,res,next) =>{
//     try {
//         await reqHandler(req,res,next)
//     } catch (error) {
//         res.staus(error.code).json({
//             success : false,
//             message : error.message
//         })
//     }
// }

export {asyncHandler}