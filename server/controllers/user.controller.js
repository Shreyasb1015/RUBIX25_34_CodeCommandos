import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.models.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { Hackathon } from '../models/hackathon.models.js'
import {uploadOnCloudinary,deleteFromCloudinary} from '../utils/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cookieOptions={
    httpOnly:true,
   
}
function getPublicIdFromCloudinaryUrl(url) {
    const regex = /(?:\/upload\/v\d+\/)?([^\/.]+)(?:\.[^.]+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
}


const generateAccessTokenAndRefreshToken=async(id)=>{
    try {
        const user=await User.findById(id)
        if(!user)
            {
                throw new ApiError(404,"User not found")
            }
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
        
    } catch (error) {
        
        throw new ApiError(500,"Token generation failed due to : " +error.message)
    }
}

const registerUser=asyncHandler(async(req,res)=>{

    const {username,email,password,roles}=req.body;
    if(!username || !email || !password || !roles){
        throw new ApiError(400,"Please provide all fields")
    }
    const existUser=await User.findOne({email})
    if(existUser)
    {
        return res.status(400).json({message:"User already exists"})

    }
    const user=await User.create({username,email,password,roles})
    if(!user)
    {
        throw new ApiError(500,"User creation failed")
    }
    const {accessToken,refreshToken}=await generateAccessTokenAndRefreshToken(user?._id)
    const userInfo=await User.findById(user._id).select("-password -refreshToken")
    return res.status(201).cookie("accessToken",accessToken,cookieOptions).cookie('refreshToken',refreshToken,cookieOptions).json(new ApiResponse(201,{userInfo},"User created successfully"))
})

const loginUser=asyncHandler(async(req,res)=>{

    const {email,password}=req.body;
    if(!email || !password){
        throw new ApiError(400,"Please provide all fields")
    }
    const user=await User.findOne({email})
    if(!user)
        {
            throw new ApiError(404,"User not found")
        }
    const isPasswordCorrect=await user.matchPassword(password)  
    if(!isPasswordCorrect)
        {
            return res.status(401).json({message:"Invalid credentials"})
        }
    const {accessToken,refreshToken}=await generateAccessTokenAndRefreshToken(user?._id)
    const loginInfo=await User.findById(user._id).select("-password -refreshToken")
    return res.status(200).cookie("accessToken",accessToken,cookieOptions).cookie('refreshToken',refreshToken,cookieOptions).json(new ApiResponse(200,{loginInfo},"User logged in successfully"))


})

const logoutUser=asyncHandler(async(req,res)=>{

    await User.findByIdAndUpdate(req.user?._id,{$unset:{refreshToken:1}},{new:true}) 
    return res.status(200).clearCookie("accessToken").clearCookie("refreshToken").json(new ApiResponse(200,{},"User logged out successfully"));
})

const changePassword=asyncHandler(async(req,res)=>{

    const {oldPassword,newPassword}=req.body;
    if(!oldPassword || !newPassword){
        throw new ApiError(400,"Please provide all fields")
    }
    const user=await User.findById(req.user?._id)
    const isMatch=await user.matchPassword(oldPassword)
    if(!isMatch)
    {
        throw new ApiError(401,"Invalid credentials")
    }
    user.password=newPassword;
    await user.save({validateBeforeSave:false})

    return res.status(200).json(new ApiResponse(200,{},"Password changed successfully"))

})
const updateProfile=asyncHandler(async(req,res)=>{
    const {email,username}=req.body;
    if(email === '' || username === '')
    {
        throw new ApiError(400,"Please fill all fields");
    }
    const tempUser=await User.findById(req.user?._id);
    let profilePicPath=req.file?.path || '';
    if(profilePicPath !== '')
    {
        const publicId=getPublicIdFromCloudinaryUrl(tempUser.profilePicture);
        await deleteFromCloudinary(publicId);
        profilePicPath=await uploadOnCloudinary(profilePicPath);
    }
    const user=await User.findByIdAndUpdate(req.user?._id,{email,username,profilePicture:profilePicPath.url},{new:true}).select("-password -refreshToken");
    if(!user)
    {
        throw new ApiError(500,"Profile not updated");
    }

    return res.status(200).json(new ApiResponse(200,{user},"Profile updated successfully"));


})

const getAllUsers=asyncHandler(async(req,res)=>{
   
    const users=await User.find({_id:{$ne:req.user?._id}}).select("-password -refreshToken")
    return res.status(200).json(new ApiResponse(200,{users},"Users fetched successfully"))

})

const checkAndUpdateLevel = async (user) => {
    if (user.hackathonParticipation >= 1 && user.level === 'beginner') {
        user.level = 'intermediate';
    } else if (user.hackathonWins >= 1 && user.level === 'intermediate') {
        user.level = 'pro';
    } else if (user.hackathonParticipation >= 10 && user.level === 'pro') {
        user.level = 'master';
    } else if (user.hackathonWins >= 3 && user.level === 'master') {
        user.level = 'legend';
    }
    return user;
};

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const updatedUser = await checkAndUpdateLevel(user);
        await updatedUser.save();

        return res.status(200).json({
            success: true,
            user: {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                roles: updatedUser.roles,
                hackathonParticipation: updatedUser.hackathonParticipation,
                hackathonWins: updatedUser.hackathonWins,
                level: updatedUser.level,
                skills: updatedUser.skills,
                interests: updatedUser.interests
            }
        });

    } catch (error) {
        console.error("Error in getUserById: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
const getJudgeActiveHackathons = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized access");
    }

    const activeHackathons = await Hackathon.find({
        judgeId: userId,
    })
    .select("name description bannerImage startingDate endingDate mode domain prize")
    .populate("organizerId", "username email");

    if (!activeHackathons.length) {
        return res.status(200).json(
            new ApiResponse(200, [], "No active hackathons found where you are judge")
        );
    }

    return res.status(200).json(
        new ApiResponse(200, { activeHackathons }, "Active hackathons fetched successfully")
    );
});

const getAllJudges = asyncHandler(async (req, res) => {
    const judges = await User.find({ roles: "judge" })
        .select("username _id")
        .lean();
  
    if (!judges.length) {
        return res.status(200).json(
            new ApiResponse(200, [], "No judges found in the system")
        );
    }
  
    const judgeData = judges.map(judge => ({
        id: judge._id,
        username: judge.username
    }));
  
    return res.status(200).json(
        new ApiResponse(200, { judges: judgeData }, "Judges fetched successfully")
    );
  });

export {
    registerUser,
    loginUser,
    changePassword,
    logoutUser,
    getAllUsers,
    updateProfile,
    getUserById,
    getJudgeActiveHackathons,
    getAllJudges
}



