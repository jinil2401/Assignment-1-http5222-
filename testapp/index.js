const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./modules/GymProduct/db");
const { model } = require("mongoose");


const app = express();
const port = process.env.PORT || "8888";


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  let GymList = await db.getGyms();
  
  if (!GymList.length) {
    await db.initializeGyms();
    GymList = await db.getGyms();
  }
  response.render("index", { Gym: GymList });
});
app.get("/add", async (request, response) => {
    const { model, brand, rating, price } = req.body;
    await db.addGyms(model, brand, rating, price);
    res.redirect("/GymProducts");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});