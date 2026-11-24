const multer = require('multer');
const path = require('path');

// Disk Storage konfiqurasiyası
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Şəkillərin saxlanılacağı qovluq
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Orijinal uzantını saxlayırıq
  }
});

// Yalnız şəkil fayllarına icazə vermək üçün filter (şərt)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Yalnız şəkil faylları yüklənə bilər!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Maksimum 5MB
});

module.exports = upload;