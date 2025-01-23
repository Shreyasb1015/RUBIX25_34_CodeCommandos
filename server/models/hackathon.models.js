import mongoose,{Schema} from "mongoose";

const hackathonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "active", "completed"],
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teamsId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Team",
      default: [],
    },
    bannerImage: {
      type: String,
      default: "",
    },
    startingDate: {
      type: Date,
      required: true,
    },
    endingDate: {
      type: Date,
      required: true,
    },
    winnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    judgeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hackathonSteps: {
      type: [
        {
          text: {
            type: String,
            required: true,
          },
          date: {
            type: Date,
            required: true,
          },
        },
      ],
      default: [],
    },
    duration: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: true,
    },
    prize: {
      type: String,
      default: "To be announced",
    },
    description: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


export const Hackathon=mongoose.model("Hackathon",hackathonSchema);