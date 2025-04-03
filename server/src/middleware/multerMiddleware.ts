import { FILE_SIZE_LIMIT } from "@/constant/constant";
import multer from "multer";
import path from "path";

// Local storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), '/uploads'));
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${file?.originalname}`;
        cb(null, fileName)
    }
});

export const upload = multer({ 
  // storage, // Local storage
  limits: {
    fileSize: FILE_SIZE_LIMIT // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG & PNG Are Allowed!'));
    }
  },
 });