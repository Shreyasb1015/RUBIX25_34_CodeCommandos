import mongoose,{Schema} from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    participantsId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User', 
      required: true,
      validate: {
        validator: function (members) {
          return members.length > 0; 
        },
        message: 'A group must have at least one participant.',
      },
    },
    hackathonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon', 
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }, { timestamps: true });
  
  
export const Group=mongoose.model("Group",groupSchema);