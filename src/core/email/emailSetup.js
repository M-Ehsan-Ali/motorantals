"use strict";
const sgMail = require("@sendgrid/mail");
import { getConfigurationData } from "../getConfigurationData";

const sendEmail = (app) => {
  app.post("/sendEmail", async function(req, res, next) {
    const configData = await getConfigurationData({name: ["smtpPassWord"] });

    let mailOptions = req.body.mailOptions;
    sgMail.setApiKey(configData.smtpPassWord);
    sgMail
      .send(mailOptions)
      .then(() => {
        res.send({ status: 200, response: "email send successfully" });
      })
      .catch((error) => {
        res.send({ status: 400, response: error });
      });
  });
};

export default sendEmail;
