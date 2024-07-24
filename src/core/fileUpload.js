import {aws, fileuploadDir} from "../config";
import multer from "multer";
const crypto = require("crypto");
const fs = require("fs");
const fse = require("fs-extra");
import bodyParser from "body-parser";
import sharp from "sharp";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: "AKIA6ODUZF4OLW3RXLMD",
    secretAccessKey: "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"
  },
});

// var storage = multer.diskStorage({
//   destination: fileuploadDir + "/bk",
//   filename: function(req, file, cb) {
//     crypto.pseudoRandomBytes(16, function(err, raw) {
//       if (err) return cb(err);

//       let ext;

//       switch (file.mimetype) {
//         case "image/jpeg":
//           ext = ".jpeg";
//           break;
//         case "image/png":
//           ext = ".png";
//           break;
//       }

//       cb(null, raw.toString("hex") + ext);
//     });
//   },
// });

// var upload = multer({ storage: storage });
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const uploadFileToS3 = async (fileBuffer, fileName, mimetype) => {
  const params = {
    Bucket: "become-an-owner",
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype,
    // ACL: "public-read", // Optional: to make the file publicly accessible
  };

  const command = new PutObjectCommand(params);
  return s3.send(command);
};

const fileUpload = (app) => {
  app.post(
    "/photos",
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
                url: `https://${"become-an-owner"}.s3.${"ap-southeast-2"}.amazonaws.com/${fileName}`,
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
  // small - 101 * 67
  // const smallImage = await new Promise((resolve, reject) => {
  //   sharp(files[0].path)
  //     .rotate()
  //     .resize(101, null)
  //     //.crop(sharp.strategy.entropy)
  //     .toFile(fileuploadDir + "small_" + files[0].filename, function(err) {
  //       if (files) {
  //         resolve(files);
  //       } else {
  //         reject(error);
  //       }
  //       console.log("Error from resizing files", err);
  //     });
  // });

  // x_small - 216 * 144
  // const xSmallImage = await new Promise((resolve, reject) => {
  //   sharp(files[0].path)
  //     .rotate()
  //     .resize(216, null)
  //     //.crop(sharp.strategy.entropy)
  //     .toFile(fileuploadDir + 'x_small_' + files[0].filename, function (err) {
  //       if (files) {
  //         resolve(files)
  //       } else {
  //         reject(error)
  //       }
  //       console.log("Error from resizing files", err);
  //     });
  // });

  // if (files[0].mimetype === 'image/jpeg') {
  //   // x_medium - 450 * 300
  //   const mediumImage = await new Promise((resolve, reject) => {
  //     sharp(files[0].path)
  //       .rotate()
  //       .resize(450, null)
  //       .jpeg({ quality: 50 })
  //       //.crop(sharp.strategy.entropy)
  //       .toFile(fileuploadDir + 'x_medium_' + files[0].filename, function (err) {
  //         if (files) {
  //           resolve(files)
  //         } else {
  //           reject(error)
  //         }
  //         console.log("Error from resizing files", err);
  //       });
  //   });

  //   // x_large - 900 * 650
  //   const largeImage = await new Promise((resolve, reject) => {
  //     sharp(files[0].path)
  //       .rotate()
  //       .resize(900, null)
  //       .jpeg({ quality: 50 })
  //       //.crop(sharp.strategy.entropy)
  //       .toFile(fileuploadDir + 'x_large_' + files[0].filename, function (err) {
  //         if (files) {
  //           resolve(files)
  //         } else {
  //           reject(error)
  //         }
  //         console.log("Error from resizing files", err);
  //       });
  //   });

  //   // xx_large - 1280 * 960
  //   const largeImageSize = await new Promise((resolve, reject) => {
  //     sharp(files[0].path)
  //       .rotate()
  //       .resize(1280, null)
  //       .jpeg({ quality: 50 })
  //       //.crop(sharp.strategy.entropy)
  //       .toFile(fileuploadDir + 'xx_large_' + files[0].filename, function (err) {
  //         if (files) {
  //           resolve(files)
  //         } else {
  //           reject(error)
  //         }
  //         console.log("Error from resizing files", err);
  //       });
  //   });

  // } else if (files[0].mimetype === 'image/png') {

  //   // x_medium - 450 * 300
  //   const mediumImage = await new Promise((resolve, reject) => {
  //     sharp(files[0].path)
  //       .rotate()
  //       .resize(450, null)
  //       .png({ compressionLevel: 5, adaptiveFiltering: true, force: true  })
  //       //.crop(sharp.strategy.entropy)
  //       .toFile(fileuploadDir + 'x_medium_' + files[0].filename, function (err) {
  //         if (files) {
  //           resolve(files)
  //         } else {
  //           reject(error)
  //         }
  //         console.log("Error from resizing files", err);
  //       });
  //   });

  //   // x_large - 900 * 650
  //   const largeImage = await new Promise((resolve, reject) => {
  //     sharp(files[0].path)
  //       .rotate()
  //       .resize(900, null)
  //       .png({ compressionLevel: 5, adaptiveFiltering: true, force: true  })
  //       //.crop(sharp.strategy.entropy)
  //       .toFile(fileuploadDir + 'x_large_' + files[0].filename, function (err) {
  //         if (files) {
  //           resolve(files)
  //         } else {
  //           reject(error)
  //         }
  //         console.log("Error from resizing files", err);
  //       });
  //   });

  //   // xx_large - 1280 * 960
  //   const largeImageSize = await new Promise((resolve, reject) => {
  //     sharp(files[0].path)
  //       .rotate()
  //       .resize(1280, null)
  //       .png({ compressionLevel: 5, adaptiveFiltering: true, force: true })
  //       //.crop(sharp.strategy.entropy)
  //       .toFile(fileuploadDir + 'xx_large_' + files[0].filename, function (err) {
  //         if (files) {
  //           resolve(files)
  //         } else {
  //           reject(error)
  //         }
  //         console.log("Error from resizing files", err);
  //       });
  //   });
  // }

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post(
    "/deletePhotos",
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
    "/removeMultiFiles",
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
      // Original
      fs.unlink(filePath + fileName, (err) => {
        if (err) throw err;
        console.log("successfully deleted");
      });
    }

    if (fs.existsSync(filePath + "small_" + fileName)) {
      // small
      fs.unlink(filePath + "small_" + fileName, (err) => {
        if (err) throw err;
        console.log("successfully deleted");
      });
    }

    if (fs.existsSync(filePath + "x_small_" + fileName)) {
      // x_small
      fs.unlink(filePath + "x_small_" + fileName, (err) => {
        if (err) throw err;
        console.log("successfully deleted");
      });
    }

    if (fs.existsSync(filePath + "x_medium_" + fileName)) {
      // x_medium
      fs.unlink(filePath + "x_medium_" + fileName, (err) => {
        if (err) throw err;
        console.log("successfully deleted");
      });
    }

    if (fs.existsSync(filePath + "x_large_" + fileName)) {
      // x_large
      fs.unlink(filePath + "x_large_" + fileName, (err) => {
        if (err) throw err;
        console.log("successfully deleted");
      });
    }

    if (fs.existsSync(filePath + "xx_large_" + fileName)) {
      // xx_large
      fs.unlink(filePath + "xx_large_" + fileName, (err) => {
        if (err) throw err;
        console.log("successfully deleted");
      });
    }
  }
  /*app.post('/removeDir', function (req, res, next) {
    var folderName = req.body.folderName;
    var pathToRemove = 'public/' + folderName;
    if(folderName != undefined && folderName != null){
      // Remove Dir
      /*fse.remove(pathToRemove, function (err) {
        if (err) return console.error(err)

        console.log('success!')
      });*/

  // Make Dir
  /*fse.ensureDir(pathToRemove, function (err) {
    if (err) return console.error(err)

    console.log('success!');
  })
}
res.send({ status: 'Do you want to remove this dir?' });
});*/
};

export default fileUpload;
