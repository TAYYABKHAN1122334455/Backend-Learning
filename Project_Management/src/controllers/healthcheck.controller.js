import ApiResponse from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/async-handler.js';
/**
const healthCheck=async(req,res,next)=>{
    try {
        await res.
        status(200).json(new ApiResponse(200,{message:"Server is running"}));
    } catch (error) {
        next(error);
    }
}
*/
const healthCheck=asyncHandler(async (req,res)=>{
    res.status(200).json(new ApiResponse(200,{message:"Server is still running"}));
})
export {healthCheck};