import mongoose,{Schema} from "mongoose";

const messageSchema = new mongoose.Schema({
    grpId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group', 
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    readBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User', 
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }, { timestamps: true });
  

export const Message=mongoose.model("Message",messageSchema);