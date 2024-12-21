const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage in memory
const storage = multer.memoryStorage();

// Initialize multer upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Increase limit to 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

// Function to check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Only images (jpeg, jpg, png, webp) are allowed!'));
  }
}

// Function to convert image buffer to base64 string
function getImageBase64(imageBuffer, mimetype = 'image/jpeg') {
  if (!imageBuffer) return null;
  return `data:${mimetype};base64,${imageBuffer.toString('base64')}`;
}

module.exports = {
  upload,
  getImageBase64,
};
