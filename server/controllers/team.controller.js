import { Team } from "../models/team.models.js";
import { User } from "../models/user.models.js"; 
import { Hackathon } from "../models/hackathon.models.js";
import { sendTeamInviteEmail } from '../utils/mailservice.js'

export const createTeam = async (req, res) => {
  try {
    const { name, membersId, leaderId, hackathonId, projectName } = req.body;

    const leader = await User.findById(leaderId);
    if (!leader) return res.status(404).json({ message: "Leader not found" });

    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) return res.status(404).json({ message: "Hackathon not found" });

   
    const team = new Team({
      name,
      membersId: [leaderId], 
      leaderId,
      hackathonId,
      projectName: projectName || "",
    });

    await team.save();
    res.status(201).json({ team, message: "Team created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTeam = async (req, res) => {
  try {
    const { teamId, newMemberId, projectLink, progress } = req.body;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    
    if (newMemberId) {
      const newMember = await User.findById(newMemberId);
      if (!newMember) return res.status(404).json({ message: "New member not found" });

      if (!team.membersId.includes(newMemberId)) {
        team.membersId.push(newMemberId);
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
    if (!team) return res.status(404).json({ message: 'Team not found' });

    if (team.membersId.includes(userId)) {
      return res.status(400).json({ message: 'User already in the team' });
    }

    team.membersId.push(userId);
    await team.save();
    res.status(200).json({ message: 'Invite accepted', team });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
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

    const team = await Team.findById(mongoose.Types.ObjectId(teamId));
    const hackathon = await Hackathon.findById(mongoose.Types.ObjectId(hackathonId));
    const user = await User.findOne({ email });

    if (!team || !hackathon || !user) {
      return res.status(404).json({ message: 'Invalid team, hackathon, or user' });
    }

  
    await sendTeamInviteEmail(user, team, hackathon);

    res.status(200).json({ message: 'Invitation email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error });
  }
};