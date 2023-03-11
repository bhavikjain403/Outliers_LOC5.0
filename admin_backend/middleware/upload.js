const multer = require("multer");
const path = require("path");

// Configure Disk Storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (file.fieldname == "profilePic") {
        cb(null, "uploads/profilepictures");
      } else if (file.fieldname == "pictures") {
        cb(null, "uploads/propertypictures");
      }
    } catch (err) {
      console.log(err);
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

// Filter the kind of files stored
const fileFilter = (req, file, cb) => {
  try {
    if (
      file.fieldname == "profilePic" ||
      file.fieldname == "pictures"
    ) {
      if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
      ) {
         console.log(file.mimetype);
        cb(null, true);
      } else {
        console.log(file.mimetype);
        cb(null, false);
      }
    } else {
        console.log(file.mimetype);
        cb(null, false);
      }
    
}
   catch (err) {
    console.log(err);
  }
};

// Configure Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
