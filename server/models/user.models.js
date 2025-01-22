import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'],
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    required: true,
    enum: ['participant', 'organizer', 'judge'],
    default: 'participant',
  },
  hackathonParticipation: {
    type: Number,
    default: 0,
  },
  hackathonWins: {
    type: Number,
    default: 0,
  },
  hackathonCreated: {
    type: Number, 
    default: 0,
  },
  hackathonJudged: {
    type: Number, 
    default: 0,
  },
  skills: {
    type: [String], 
    default: [],
  },
  interests: {
    type: [String], 
    default: [],
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'pro', 'master', 'legend'],
    default: 'beginner',
  },
  profileImage: {
    type: String, 
    default: '',
  },
  refreshToken:{

    type:String,
 },
  accessToken:{
    type:String,
  }
}, { timestamps: true });


userSchema.pre("save",async function(next){

    if(!this.isModified("password"))
    {
        next();
    
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.matchPassword=async function(password){

    return await bcrypt.compare(password,this.password);

}

userSchema.methods.generateAccessToken=function(){

    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email, 
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}

userSchema.methods.generateRefreshToken=function(){

    return jwt.sign({
        _id:this._id
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}


export const User=mongoose.model('User', userSchema);
