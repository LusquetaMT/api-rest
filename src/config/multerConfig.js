import multer from 'multer';
import { extname, resolve } from 'path';

const random = () => Math.floor(Math.random() * 10000 + 10000);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
  },
  filename: (req, file, callback) => {
    const time = Date.now();
    const ext = extname(file.originalname);
    callback(null, `${time}_${random()}${ext}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (!file.mimetype.startsWith('image/')) {
    callback(new multer.MulterError('EXTENSION_NOT_SUPPORTED'));
  }

  return callback(null, true);
};

const limits = {
  fileSize: 5 * 1024 * 1024, // Limite de 5MB
};

const multerConfig = {
  storage,
  fileFilter,
  limits,
};

export default multerConfig;
