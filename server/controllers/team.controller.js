import { Team } from "../models/team.models.js";
import { User } from "../models/user.models.js"; 
import { Hackathon } from "../models/hackathon.models.js";
import { sendTeamInviteEmail } from '../utils/mailservice.js'
import {Group} from "../models/group.models.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createTeam = async (req, res) => {
  try {
    const { name, membersId, leaderId, hackathonId, projectName,projectLink} = req.body;

    const leader = await User.findById(leaderId);
    if (!leader) return res.status(404).json({ message: "Leader not found" });

    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) return res.status(404).json({ message: "Hackathon not found" });

   
    const team = new Team({
      name,
      membersId: membersId || [leaderId], 
      leaderId,
      hackathonId,
      projectName: projectName || "",
      projectLink: projectLink || "",
    });

    await team.save();
    res.status(201).json({ team, message: "Team created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTeam = async (req, res) => {
  try {
    const { teamId, newMemberId, projectLink, progress,hackathonId,user_id } = req.body;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    
    if (newMemberId) {
      const newMember = await User.findById(newMemberId);
      if (!newMember) return res.status(404).json({ message: "New member not found" });

      if (!team.membersId.includes(newMemberId)) {
        team.membersId.push(newMemberId);
        const group=await Group.find({hackathonId:hackathonId});
        if(group){
          group.participantsId.push(newMemberId);
          await group.save();
        }  
      } else {
        return res.status(400).json({ message: "Member already in the team" });
      }
    }


    if (projectLink) {
      team.projectLink = projectLink;
    }

    if (progress) {
      if (!["Ideation", "In Progress", "Completed"].includes(progress)) {
        return res.status(400).json({ message: "Invalid progress status" });
      }
      team.progress = progress;
    }

    await team.save();
    res.status(200).json({ team, message: "Team updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findByIdAndDelete(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const acceptInvite = async (req, res) => {
  const { teamId, userId } = req.query;

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res
        .status(404)
        .send(
          "<h1>Team not found</h1><p>The team you are looking for does not exist.</p>"
        );
    }

    if (team.membersId.includes(userId)) {
      return res
        .status(400)
        .send(
          "<h1>User Already in the Team</h1><p>You are already a member of this team.</p>"
        );
    }

    team.membersId.push(userId);
    await team.save();

    const htmlResponse = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invitation Accepted</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f9fc;
            color: #333;
            text-align: center;
            padding: 20px;
          }
          h1 {
            color: #2d72d9;
          }
          p {
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <h1>Invitation Accepted</h1>
        <p>Welcome to the team <strong>${team.name}</strong>!</p>
        <p>We’re excited to have you onboard.</p>
      </body>
      </html>
    `;

    res.status(200).send(htmlResponse);
  } catch (error) {
    res
      .status(500)
      .send(
        "<h1>Internal Server Error</h1><p>Something went wrong while processing your request.</p>"
      );
  }
};


export const declineInvite = async (req, res) => {
  res.status(200).json({ message: 'Invite declined' });
};

export const sendTeamInvite = async (req, res) => {
  const { email, teamId, hackathonId } = req.body;

  try {
   
    if (!mongoose.Types.ObjectId.isValid(teamId) || !mongoose.Types.ObjectId.isValid(hackathonId)) {
      return res.status(400).json({ message: 'Invalid team or hackathon ID' });
    }

    const team = await Team.findById(teamId);
    const hackathon = await Hackathon.findById(hackathonId);
    const user = await User.findOne({ email });

    if (!team || !hackathon || !user) {
      return res.status(404).json({ message: 'Invalid team, hackathon, or user' });
    }

  
    await sendTeamInviteEmail(user, team, hackathon);

    res.status(200).json({ message: 'Invitation email sent successfully' });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Failed to send email', error });
  }
};
export const getTeamsByHackathonId = asyncHandler(async (req, res) => {
  const { hackathonId } = req.params;

  if (!hackathonId) {
      throw new ApiError(400, "Hackathon ID is required");
  }

  const teams = await Team.find({ hackathonId })
      .populate('membersId', 'username email')
      .populate('leaderId', 'username email')
      .sort({ ranking: 1 })
      .lean();

  if (!teams.length) {
      return res.status(200).json(
          new ApiResponse(200, [], "No teams found for this hackathon")
      );
  }

  return res.status(200).json(
      new ApiResponse(
          200,
          { teams },
          "Teams fetched successfully"
      )
  );
});

export const getTeamById = asyncHandler(async (req, res) => {
  const { teamId } = req.params;

  if (!teamId) {
      throw new ApiError(400, "Team ID is required");
  }

  const team = await Team.findById(teamId)
      .populate('membersId', 'username email')
      .populate('leaderId', 'username email')
      .populate('hackathonId', 'name status')
      .lean();

  if (!team) {
      throw new ApiError(404, "Team not found");
  }

  return res.status(200).json(
      new ApiResponse(
          200,
          team,
          "Team details fetched successfully"
      )
  );
});