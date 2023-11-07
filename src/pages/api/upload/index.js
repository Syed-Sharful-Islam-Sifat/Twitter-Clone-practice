import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req, saveLocally) => {
  const options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await fs.readdir(path.join(process.cwd() + "/public", "/images"));
    } catch (error) {
      await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
    }
    const result = await readFile(req, true);
    let profileImage, coverPhoto,tweetPhoto;
    if (result?.files?.profile_photo) {
      profileImage = result.files.profile_photo[0]?.newFilename;
    }

    if (result?.files?.cover_photo) {
      coverPhoto = result.files.cover_photo[0]?.newFilename;
    }

  
    if(result?.files?.tweet_photo){
        tweetPhoto = result.files.tweet_photo[0].newFilename;
        return res.status(200).json({tweetPhoto})
    }

  
   return res.status(200).json({ profileImage, coverPhoto });
  }
}
