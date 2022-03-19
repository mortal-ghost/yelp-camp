const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  image: String,
  description: String,
});

module.exports = Campground = mongoose.model("Campground", campgroundSchema);
