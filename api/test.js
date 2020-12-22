const vision = require("@google-cloud/vision");
const path = require("path");
const fs = require("fs").promises;
// Creates a client
async function init() {
  const keyFilename = path.join(__dirname, "./config/vision-api-key.json");
  const client = new vision.ImageAnnotatorClient({ keyFilename });
  const imgDir = path.join(__dirname, "./data");
  const files = await fs.readdir(imgDir);
  // Performs text detection on the local file
  for (let fileName of files) {
    const filePath = path.join(imgDir, fileName);
    const [result] = await client.textDetection(filePath);
    const detections = result.textAnnotations;
    console.log(`Text in ${fileName}: ${detections[0].description}`);
    console.log(detections);
  }
}

init();
