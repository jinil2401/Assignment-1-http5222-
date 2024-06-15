const mongoose = require("mongoose"); //import Mongoose

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//set up Camera Schema and model
const CameraSchema = new mongoose.Schema({
  model: String,
  brand: String,
  category: String,
  make: Number,
  rating: Number,
  price: Number,
});

const Camera = mongoose.model("Camera", CameraSchema);

//MONGODB FUNCTIONS
async function connect() {
  await mongoose.connect(dbUrl); //connect to mongodb
}

//Get all cameras from the cameras collection
async function getCameras() {
  await connect();
  return await Camera.find({});
}
//Initialize cameras collection with some data.
async function initializeCameras() {
  const cameraList = [
    {
      model: "Hero 6",
      brand: "Go PRO",
      category: "Action Camera",
      make: "2022",
      rating: 4.2,
      price: 289,
    },
  ];
  await Camera.insertMany(cameraList);
}
//Function to add a camera to the cameras collection
async function addCamera(
  cameraModel,
  cameraBrand,
  cameraCategory,
  cameraMake,
  cameraRating,
  cameraPrice
) {
  let newCamera = new Camera({
    model: cameraModel,
    brand: cameraBrand,
    category: cameraCategory,
    make: cameraMake,
    rating: cameraRating,
    price: cameraPrice,
  });
  //this is the line which actually saves newCamera to the DB
  newCamera.save();
}

module.exports = {
  getCameras,
  initializeCameras,
  addCamera,
};