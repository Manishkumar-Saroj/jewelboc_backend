const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage in memory
const storage = multer.memoryStorage();

// Initialize multer upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('profileImage');

// Function to check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Only images (jpeg, jpg, png, gif) are allowed!'));
  }
}

// Function to get the default profile image as a base64 string
function getDefaultProfileImageAsBase64() {
  const defaultImagePath = path.join(__dirname, '..', 'assets', 'profile.png');
  try {
    const imageBuffer = fs.readFileSync(defaultImagePath);
    return `data:image/png;base64,${imageBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error reading default profile image:', error);
    return null;
  }
}

// Function to convert image buffer to base64 string or return default image if buffer is empty
function getImageBase64(imageBuffer) {
  if (imageBuffer) {
    return `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
  } else {
    return getDefaultProfileImageAsBase64();
  }
}

module.exports = {
  upload,
  getImageBase64,
  getDefaultProfileImageAsBase64,
};
