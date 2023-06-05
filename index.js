const express = require("express");
const bodyParser = require("body-parser");
// const cv = require("./opencv.js"); // Path to OpenCV.js file

const app = express();

const faceapi = require("@vladmandic/face-api");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // res.setHeader("Access-Control-Allow-Headers", "Authorization");
  next();
});

app.post("/processFrames", async (req, res) => {
  const frameData = req.body.frameData; // Assuming frameData is sent as base64 encoded image data
  await faceapi.nets.ssdMobilenetv1.loadFromDisk("model"); // load models from a specific patch
  await faceapi.nets.faceLandmark68Net.loadFromDisk("model");
  await faceapi.nets.ageGenderNet.loadFromDisk("model");
  await faceapi.nets.faceRecognitionNet.loadFromDisk("model");
  await faceapi.nets.faceExpressionNet.loadFromDisk("model");
  const options = new faceapi.SsdMobilenetv1Options({
    minConfidence: 0.1,
    maxResults: 10,
  }); // set model options
  const buffer = fs.readFileSync("demo/sample1.jpg"); // load jpg image as binary
  const decodeT = faceapi.tf.node.decodeImage(buffer, 3); // decode binary buffer to rgb tensor
  const expandT = faceapi.tf.expandDims(decodeT, 0); // add batch dimension to tensor
  const result = await faceapi
    .detectAllFaces(expandT, options) // run detection
    .withFaceLandmarks()
    .withFaceExpressions()
    .withFaceDescriptors()
    .withAgeAndGender();
  faceapi.tf.dispose([decodeT, expandT]); // dispose tensors to avoid memory leaks
  console.log({
    result,
  }); // eslint-disable-line no-console
  // const width = req.body.width;
  // const height = req.body.height;
  // const image = imageDataUrlToPixelInput(frameData);

  // const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
  // const detectorConfig = {
  //     runtime: "mediapipe",
  //     // or 'base/node_modules/@mediapipe/face_detection' in npm.
  // };
  // const detector = await faceDetection.createDetector(model, detectorConfig);
  // const estimationConfig = {
  //     flipHorizontal: false
  // };
  // const faces = await detector.estimateFaces(image, estimationConfig);

  return res.status(200).send(faces);
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
