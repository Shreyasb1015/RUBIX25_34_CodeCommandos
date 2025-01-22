import { Group } from "../models/group.models.js";
import { User } from "../models/user.models.js"; 
import { Hackathon } from "../models/hackathon.models.js"; 


export const createGroup = async (req, res) => {
  try {
    const { name, adminId, participantsId, hackathonId } = req.body;

    const admin = await User.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) return res.status(404).json({ message: "Hackathon not found" });

    if (!participantsId.includes(adminId)) {
      return res.status(400).json({ message: "Admin must be included in participants" });
    }

    const invalidParticipants = await Promise.all(
      participantsId.map(async (id) => {
        const user = await User.findById(id);
        return user ? null : id;
      })
    );
    const invalidIds = invalidParticipants.filter((id) => id);
    if (invalidIds.length > 0) {
      return res
        .status(400)
        .json({ message: `Invalid participant IDs: ${invalidIds.join(", ")}` });
    }

    const group = new Group({
      name,
      adminId,
      participantsId,
      hackathonId,
    });

    await group.save();
    res.status(201).json({ group, message: "Group created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findByIdAndDelete(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addParticipant = async (req, res) => {
  try {
    const { groupId, participantId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const participant = await User.findById(participantId);
    if (!participant) return res.status(404).json({ message: "Participant not found" });


    if (group.participantsId.includes(participantId)) {
      return res.status(400).json({ message: "Participant already in the group" });
    }
    group.participantsId.push(participantId);

    await group.save();
    res.status(200).json({ group, message: "Participant added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeParticipant = async (req, res) => {
  try {
    const { groupId, participantId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });


    group.participantsId = group.participantsId.filter(
      (id) => id.toString() !== participantId
    );

    await group.save();
    res.status(200).json({ group, message: "Participant removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
