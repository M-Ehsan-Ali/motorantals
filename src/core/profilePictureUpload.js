import {aws, fileuploadDir} from "../config";
import multer from "multer";
const crypto = require("crypto");
const fs = require("fs");
const fse = require("fs-extra");
import bodyParser from "body-parser";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: "AKIA6ODUZF4OLW3RXLMD",
    secretAccessKey: "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"
  },
});

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const uploadFileToS3 = async (fileBuffer, fileName, mimetype) => {
  const params = {
    Bucket: "profile-picture-motorentals",
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype,
  };

  const command = new PutObjectCommand(params);
  return s3.send(command);
};

const fileUpload = (app) => {
  app.post(
    "/uploadProfilePicture",
    function(req, res, next) {
      if (!req.user) {
        res.sendStatus(403);
      } else {
        next();
      }
    },
    upload.array("file"),
    async (req, res, next) => {
      let files = req.files;

      try {
        const uploadPromises = files.map((file) => {
          console.log({ file });
          const origNameNoSpace = file.originalname.replace(/\s+/g, "");
          const fileName = `${crypto
            .randomBytes(16)
            .toString("hex")}-${origNameNoSpace}`;
          return uploadFileToS3(file.buffer, fileName, file.mimetype).then(
            (data) => {
              return {
                url: `https://${"profile-picture-motorentals"}.s3.${"ap-southeast-2"}.amazonaws.com/${fileName}`,
                mimetype: file.mimetype,
                data,
              };
            }
          );
        });

        const uploadedFiles = await Promise.all(uploadPromises);

        res.send({ status: "Successfully uploaded!", files: uploadedFiles });
      } catch (error) {
        console.error("Error uploading to S3:", error);
        res.status(500).send({ error: "Error uploading files" });
      }
    }
  );

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post(
    "/removeProfilePicture",
    function(req, res, next) {
      if (!req.user) {
        res.send(403);
      } else {
        next();
      }
    },
    async (req, res) => {
      let filePath = fileuploadDir;
      let fileName = req.body.fileName;
      await removeFiles(fileName, filePath);
      res.send({ status: "Got your file to remove!" });
    }
  );

  app.post(
    "/removeMultiProfilePicture",
    function(req, res, next) {
      if (!req.user) {
        res.send(403);
      } else {
        next();
      }
    },
    async (req, res) => {
      var files = req.body.files;
      let filePath = fileuploadDir;
      if (files != undefined && files.length > 0) {
        files.map(async function(item) {
          await removeFiles(item.name, filePath);
        });
        res.send({ status: "SuccessFully removed!" });
      }
      res.send({ status: "No files to remove" });
    }
  );

  function removeFiles(fileName, filePath) {
    if (fs.existsSync(filePath + fileName)) {
      fs.unlink(filePath + fileName, (err) => {
        if (err) throw err;
        console.log("successfully deleted");
      });
    }

    if (fs.existsSync(filePath + "small_" + fileName)) {
      fs.unlink(filePath + "small_" + fileName, (err) => {
        if (err) throw err;
        console.log("successfully deleted");
      });
    }

    if (fs.existsSync(filePath + "x_small_" + fileName)) {
      fs.unlink(filePath + "x_small_" + fileName, (err) => {
        if (err) throw err;
        console.log("successfully deleted");
      });
    }

    if (fs.existsSync(filePath + "x_medium_" + fileName)) {
      fs.unlink(filePath + "x_medium_" + fileName, (err) => {
        if (err) throw err;
        console.log("successfully deleted");
      });
    }

    if (fs.existsSync(filePath + "x_large_" + fileName)) {
      fs.unlink(filePath + "x_large_" + fileName, (err) => {
        if (err) throw err;
        console.log("successfully deleted");
      });
    }

    if (fs.existsSync(filePath + "xx_large_" + fileName)) {
      fs.unlink(filePath + "xx_large_" + fileName, (err) => {
        if (err) throw err;
        console.log("successfully deleted");
      });
    }
  }
};

export default fileUpload;
