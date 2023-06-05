const {pool} = require("../database/pool");

const fs = require("fs");

// const faceapi = require("@vladmandic/face-api");


const detectFaces = async()=>{
    await faceapi.nets.ssdMobilenetv1.loadFromDisk("model"); // load models from a specific patch
    await faceapi.nets.faceLandmark68Net.loadFromDisk("model");
    await faceapi.nets.ageGenderNet.loadFromDisk("model");
    await faceapi.nets.faceRecognitionNet.loadFromDisk("model");
    await faceapi.nets.faceExpressionNet.loadFromDisk("model");
    // console.log(frameData);
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
    }); 
  }
  
//   app.post("/processFrames", async (req, res) => {
    // const frameData = req.body.frameData;
    // await detectFaces() // Assuming frameData is sent as base64 encoded image data
    // eslint-disable-line no-console
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
  
//     return res.status(200).send(faces);
//   });
  


  const setReport = async (req , res )=>{

  }

  const getReport = async (req , res )=>{
    
  }

  const checkVideo = async (req , res )=>{
    
  }
  module.exports = {
    setReport , getReport , checkVideo
  }