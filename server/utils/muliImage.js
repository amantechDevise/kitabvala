const fs = require('fs');
const path = require('path');

const multiImages = async (imageFiles = [], oldImagePaths = []) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!imageFiles || imageFiles.length === 0) {
        return reject(new Error("No files provided"));
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      const uploadDir = path.join(__dirname, '..', 'public', 'images');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Delete old images if paths provided
      if (Array.isArray(oldImagePaths)) {
        oldImagePaths.forEach((oldImagePath) => {
          const oldImageFilePath = path.join(uploadDir, path.basename(oldImagePath));
          if (fs.existsSync(oldImageFilePath)) {
            fs.unlinkSync(oldImageFilePath);
          }
        });
      }

      const uploadedPaths = [];

      // Ensure imageFiles is an array
      const filesArray = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

      for (const imageFile of filesArray) {
        if (!allowedTypes.includes(imageFile.mimetype)) {
          return reject(new Error(`Invalid file type for: ${imageFile.name}`));
        }

        const fileName = `img_${Date.now()}_${imageFile.name}`;
        const filePath = path.join(uploadDir, fileName);

        await new Promise((res, rej) => {
          imageFile.mv(filePath, (err) => {
            if (err) return rej(err);
            uploadedPaths.push(`/images/${fileName}`);
            res();
          });
        });
      }

      resolve(uploadedPaths); // Return array of image paths

    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { multiImages };
