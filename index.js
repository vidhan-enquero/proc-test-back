const dotenv = require("dotenv");
const express = require("express");
// const auth = require("./routes/auth");


const auth = require("./routes/auth");
const proctor = require("./routes/proctor")


dotenv.config()

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // res.setHeader("Access-Control-Allow-Headers", "Authorization");
  next();
});


// Routes
app.use("/", auth);
app.use("/", proctor);

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
//     // const fillInformation = require("./data");
//     // await fillInformation();

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(async () => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
//     // const fillInformation = require("./data");
//     // await fillInformation();
//   })
//   .catch((error) => console.log(`${error} did not connect`));