const vision = require("@google-cloud/vision");
const path = require("path");
const fs = require("fs").promises;
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.post("/api/image", async (req, res) => {
  try {
    const keyFilename = path.join(__dirname, "./config/vision-api-key.json");
    const client = new vision.ImageAnnotatorClient({ keyFilename });
    const imgData = req.body.image;
    const [result] = await client.textDetection(Buffer.from(imgData, "base64"));
    const detections = result.textAnnotations;
    let textData = "no text found";
    let statusCode = 422;
    if (detections[0]) {
      textData = detections[0].description;
      statusCode = 200;
    }
    console.log(`Text: ${textData}`);
    res.status(statusCode).json({ data: textData });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port: ${port}`));
