import { Message } from "../models/message.models.js";
import { Group } from "../models/group.models.js";
import { User } from "../models/user.models.js";

export const sendMessage = async (req, res) => {
  try {
    const { grpId, senderId, content } = req.body;

   
    const group = await Group.findById(grpId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    
    const sender = await User.findById(senderId);
    if (!sender) return res.status(404).json({ message: "Sender not found" });

    
    const message = new Message({
      grpId,
      senderId,
      content,
    });

    await message.save();
    res.status(201).json({ message, message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateMessage = async (req, res) => {
  try {
    const { messageId, content } = req.body;

    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    message.content = content;
    await message.save();

    res.status(200).json({ message, message: "Message updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findByIdAndDelete(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMessagesByGroupId = async (req, res) => {
  try {
    const { grpId } = req.params;

    const group = await Group.findById(grpId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const messages = await Message.find({ grpId }).populate("senderId", "name email");
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
