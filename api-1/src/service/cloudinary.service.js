const { CloudinaryConfig } = require("../config/config");
const { fileDelete } = require("../utilities/helper");

const cloudinary = require("cloudinary").v2;

class cloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: CloudinaryConfig.cloudName,
      api_key: CloudinaryConfig.apiKey,
      api_secret: CloudinaryConfig.apiSecret,
    });
  }

  async singleFileUpload(filePath, dir = null) {
    try {
      // Upload the file in cloudinary server
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        filePath,
        {
          unique_filename: true,
          // format:"auto",
         folder: dir ? `ecom-12/${dir}` : "ecom-12"
        }
       
      )
 console.log("i am here")
      //update file
      const thumbUrl = cloudinary.url(public_id, {
        transformation: [
          { aspect_ratio: "1.0", width: 1024, height: 1024, crop: "fill" }
        ],
      });

      //as server ma file upload bho so delete from localdisk
      fileDelete(filePath);

      //display file

      return {
        id: public_id,
        optimizedUrl: thumbUrl,
        originalUrl: secure_url,
      };
     
    }
     catch (exception) {
      console.log(exception);
     
      throw {
        code: 422,
        message: "Error uploading file",
        status: "ERR_FILE_UPLOAD",
      };
    }
  }
}

const cloudinarySvc = new cloudinaryService();
module.exports = cloudinarySvc;



