import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotevn from "dotenv";
import fs from "fs";


dotevn.config();

const storage = multer.diskStorage({
  destination: "./uploads/",

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME ?? "",
    api_key: process.env.CLOUDINARY_API_KEY ?? "",
    api_secret: process.env.CLOUDINARY_SECRET ?? "",
  });

export const uploadToCloudinary = async (path: string) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(path);
    fs.unlinkSync(path);
    return uploadResponse;
  } catch (e) {
    console.log("@error while uploading image to cloudinary ", e);
    fs.unlinkSync(path);
    return null;
  }
};
