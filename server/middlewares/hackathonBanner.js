import multer from 'multer';

const hackathonBanner = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/banners")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

export const handlehackathonBanner=multer({storage:hackathonBanner}).single("bannerImage")
  