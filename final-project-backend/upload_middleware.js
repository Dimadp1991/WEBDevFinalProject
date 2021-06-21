const dotenv = require('dotenv');
const util = require("util");
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
dotenv.config();



var storage = new GridFsStorage({
  url: process.env.DATABASE_ACCESS,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-profileIMG-${file.originalname}`;
      return filename;
    }

  //photos.files
  //photos.chunks
    return {
      bucketName: "photos",
      filename: `${req.params.user_id}-profileIMG`,
    };
  }
});

var uploadFile = multer({ storage: storage }).single("file");

var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;