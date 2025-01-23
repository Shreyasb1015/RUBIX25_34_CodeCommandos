import mongoose,{Schema} from "mongoose";


const teamSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    membersId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User', 
      required: true,
      validate: {
        validator: function (members) {
          return members.length >= 1 && members.length <= 4; 
        },
        message: 'A team must have at least one member.',
      },
    },
    leaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    hackathonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon', 
      required: true,
    },
    projectName: {
      type: String, 
      default: '',
    },
    projectLink: {
      type: String, 
      default: '',
    },
    progress: {
      type: String, 
      enum: ['Ideation', 'In Progress', 'Completed'],
      default: 'Ideation',
    },
    ranking:{
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }, { timestamps: true });
  

export const Team=mongoose.model("Team",teamSchema);