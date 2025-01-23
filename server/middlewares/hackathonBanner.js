import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const hackathonBanner = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/banners");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const handlehackathonBanner = multer({
  storage: hackathonBanner,
}).single("bannerImage");