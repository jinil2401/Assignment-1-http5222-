const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

//load the environment variables from .env
dotenv.config();

//load db.js
const db = require("./modules/GymProduct/db");

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
//the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//USE PAGE ROUTES FROM ROUTER(S)
app.get("/", async (request, response) => {
  let cameraList = await db.getCameras();
  //if there's nothing in the camera-shop collection, initialize with some content then get the cameras again
  if (!cameraList.length) {
    await db.initializeCameras();
    cameraList = await db.getCameras();
  }
  response.render("index", { cameras: cameraList });
});
app.get("/add", async (request, response) => {
  //add a new camera
  await db.addCamera("Hero 2",  );
  response.redirect("/");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});