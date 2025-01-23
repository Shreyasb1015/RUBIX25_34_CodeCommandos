import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { Hackathon } from '../models/hackathon.models.js';
import { User } from '../models/user.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


const determineHackathonStatus = (startingDate, endingDate) => {
  const currentDate = new Date();
  if (currentDate < startingDate) return 'upcoming';
  if (currentDate > endingDate) return 'completed';
  return 'active';
};


const createHackathon = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      organizerId,
      startingDate,
      endingDate,
      duration,
      domain,
      mode,
      prize,
      description,
      hackathonSteps,
      judgeId,
    } = req.body;

    if (!req.file) {
      throw new ApiError(400, "Banner image is required");
    }
    const bannerPath = req.file.path;
    const banner = await uploadOnCloudinary(bannerPath);

    if (!banner.url) {
      throw new ApiError(400, "Banner upload failed");
    }

    if (
      !name ||
      !organizerId ||
      !startingDate ||
      !endingDate ||
      !duration ||
      !domain ||
      !mode
    ) {
      throw new ApiError(400, "Please provide all required fields.");
    }

    const organizer = await User.findById(organizerId);
    if (!organizer) {
      throw new ApiError(404, "Organizer not found.");
    }
    console.log("");

    const status = determineHackathonStatus(
      new Date(startingDate),
      new Date(endingDate)
    );
    const hackathon = await Hackathon.create({
      name,
      organizerId,
      startingDate,
      endingDate,
      duration,
      domain,
      mode,
      prize,
      description,
      hackathonSteps,
      status,
      bannerImage: banner.url,
      judgeId : judgeId ? judgeId : '',
    });

    res
      .status(201)
      .json(
        new ApiResponse(201, { hackathon }, "Hackathon created successfully.")
      );
  } catch (error) {
    console.log(error);
    
  }
});


const updateHackathon = asyncHandler(async (req, res) => {
  const { hackathonId } = req.params;
  const updates = req.body;

  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found.');
  }

  Object.keys(updates).forEach((key) => {
    hackathon[key] = updates[key];
  });

  hackathon.status = determineHackathonStatus(new Date(hackathon.startingDate), new Date(hackathon.endingDate));

  await hackathon.save();

  res.status(200).json(new ApiResponse(200, { hackathon }, 'Hackathon updated successfully.'));
});


const closeHackathon = asyncHandler(async (req, res) => {
  const { hackathonId } = req.params;

  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found.');
  }

  hackathon.status = 'completed';
  await hackathon.save();

  res.status(200).json(new ApiResponse(200, { hackathon }, 'Hackathon marked as completed.'));
});


const getActiveHackathons = asyncHandler(async (req, res) => {
  const activeHackathons = await Hackathon.find({ status: 'active' });

  res.status(200).json(new ApiResponse(200, { activeHackathons }, 'Active hackathons fetched successfully.'));
});

const getAllHackathons = asyncHandler(async (req, res) => {
  const hackathons = await Hackathon.find();

  hackathons.forEach((hackathon) => {
    hackathon.status = determineHackathonStatus(new Date(hackathon.startingDate), new Date(hackathon.endingDate));
  });

  res.status(200).json(new ApiResponse(200, { hackathons }, 'All hackathons fetched successfully.'));
});
const getActiveAndUpcomingHackathons = asyncHandler(async (req, res) => {
  const hackathons = await Hackathon.find({
    status: { $in: ['active', 'upcoming'] }
  }).sort({ startingDate: 1 });

  // Update status for each hackathon
  hackathons.forEach((hackathon) => {
    hackathon.status = determineHackathonStatus(
      new Date(hackathon.startingDate), 
      new Date(hackathon.endingDate)
    );
  });

  res.status(200).json(
    new ApiResponse(
      200, 
      { hackathons }, 
      'Active and upcoming hackathons fetched successfully.'
    )
  );
});
const getHackathonById = asyncHandler(async (req, res) => {
  const { hackathonId } = req.params;

  if (!hackathonId) {
      throw new ApiError(400, "Hackathon ID is required");
  }

  const hackathon = await Hackathon.findById(hackathonId)
      .populate('organizerId', 'username email')
      .populate('winnerId', 'teamName');

  if (!hackathon) {
      throw new ApiError(404, "Hackathon not found");
  }

  hackathon.status = determineHackathonStatus(
      new Date(hackathon.startingDate),
      new Date(hackathon.endingDate)
  );

  await hackathon.save();

  return res.status(200).json(
      new ApiResponse(200, hackathon, "Hackathon details fetched successfully")
  );
});


export {
  createHackathon,
  updateHackathon,
  closeHackathon,
  getActiveHackathons,
  getAllHackathons,
  getActiveAndUpcomingHackathons,
  getHackathonById,
};