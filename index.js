const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/post.js");
const Comment = require("./models/user.js");
//const seedDB = require("./seedDB.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.0",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//seedDB();

app.get("/", (req, res) => {
  res.render("landing");
});

// Campground.create(
//   {
//     name: "Granite Hill",
//     image:
//       "https://images.unsplash.com/photo-1603738397297-a374b78e9626?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//   },
//   (err, campground) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Newly created campground");
//       console.log(campground);
//     }
//   }
// );

// const campgrounds = [
//   {
//     name: "Salmon Creek",
//   },
//   {
//     name: "Granite Hill",
//     image:
//       "https://images.unsplash.com/photo-1603738397297-a374b78e9626?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//   },
//   {
//     name: "Mountain Goat's Rest",
//     image:
//       "https://images.unsplash.com/photo-1603738397297-a374b78e9626?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//   },
// ];

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", { campgrounds: campgrounds });
    }
  });
});

app.post("/campgrounds", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const newCampground = { name: name, image: image, description: description };

  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(3000 || process.env.PORT, process.env.IP, () => {
  console.log(`Server is running`);
});
