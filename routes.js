const vision = require("@google-cloud/vision");
const { Rekognition } = require("@aws-sdk/client-rekognition");
const path = require("path");
const fs = require("fs").promises;
const express = require("express");
const validator = require("validator");
const route = express();
const awsCred = require("./config/aws-api-key.json");

const MAX_GCP_REQUEST_COUNT = 500;
const MAX_AWS_REQUEST_COUNT = 2000;

route.post("/api/gcp/imageToText", async (req, res) => {
  try {
    let curReq = parseInt(
      await fs.readFile(path.join(__dirname, "./data/gcp-request-count.txt"))
    );
    if (curReq > MAX_GCP_REQUEST_COUNT) {
      res.status(429).json({ data: "Max request limit exceeded" });
      return;
    } else {
      await fs.writeFile(
        path.join(__dirname, "./data/gcp-request-count.txt"),
        curReq + 1
      );
    }
    const keyFilename = path.join(__dirname, "./config/vision-api-key.json");
    const client = new vision.ImageAnnotatorClient({ keyFilename });
    const imgData = req.body.image;
    let imgOption;
    if (validator.default.isURL(imgData)) {
      imgOption = {
        image: {
          source: {
            imageUri: imgData,
          },
        },
      };
    } else if (validator.default.isBase64(imgData)) {
      imgOption = Buffer.from(imgData, "base64");
    } else {
      res
        .status(400)
        .json({ data: "Unsupported data, image must be base64 o r url" });
      return;
    }
    const [result] = await client.textDetection(imgOption);
    const detections = result.textAnnotations;
    let textData = "no text found";
    let statusCode = 422;
    if (detections[0]) {
      textData = detections.map((d) => d.description);
      textData.shift();
      statusCode = 200;
    } else if (result.error) {
      textData = result.error;
    }
    console.log(`Text: ${textData}`);
    res.status(statusCode).json({ data: textData });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

route.post("/api/aws/imageToText", async (req, res) => {
  try {
    let curReq = parseInt(
      await fs.readFile(path.join(__dirname, "./data/aws-request-count.txt"))
    );
    if (curReq > MAX_AWS_REQUEST_COUNT) {
      res.status(429).json({ data: "Max request limit exceeded" });
      return;
    } else {
      await fs.writeFile(
        path.join(__dirname, "./data/aws-request-count.txt"),
        curReq + 1
      );
    }
    const client = new Rekognition({
      credentials: awsCred,
      region: awsCred.region,
    });
    const imgData = req.body.image;
    let imgOption;

    if (validator.default.isBase64(imgData)) {
      imgOption = { Image: { Bytes: Buffer.from(imgData, "base64") } };
    } else {
      res.status(400).json({ data: "Unsupported data, image must be base64" });
      return;
    }
    const result = await client.detectText(imgOption);
    const detections = result.TextDetections;
    let textData = "no text found";
    let statusCode = 422;
    if (detections) {
      textData = detections.map((d) => d.DetectedText);
      statusCode = 200;
    }
    console.log(`Text: ${textData}`);
    res.status(statusCode).json({ data: textData });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = route;
