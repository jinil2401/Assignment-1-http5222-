const mongoose = require("mongoose"); 

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

const GymSchema = new mongoose.Schema({
  Productmodel: String,
  brand: String,
  rating: Number,
  price: Number,
});

const Gym = mongoose.model("Gym", GymSchema);


async function connect() {
  await mongoose.connect(dbUrl); 
}

async function getGyms() {
  await connect();
  return await Gym.find({});
}

async function initializeGyms() {
  const GymList = [
    {
      Productmodel: "Treadmill",
      brand: "Matrix",
      rating: 4.2,
      price: 6898,
    },
    {
      Productmodel: "Bench-press",
      brand: "Matrix",
      rating: 4.8,
      price: 2098,
    },
  ];
  await Gym.insertMany(GymList);
}

async function addGyms(
  GymModel,
  GymBrand,
  GymRating,
  GymPrice
) {
  let newGym = new Gym({
    model: GymModel,
    brand: GymBrand,
    rating: GymRating,
    price: GymPrice,
  });

  newGym.save();
}

module.exports = {
  getGyms,
  initializeGyms,
  addGyms,
};