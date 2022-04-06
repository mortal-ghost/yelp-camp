const mongoose = require("mongoose");
const Campground = require("./models/post.js");
const Comment = require("./models/comment.js");

const data = [
  {
    name: "Salmon Creek",
    image:
      "https://images.unsplash.com/photo-1603738397297-a374b78e9626?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    name: "Granite Hill",
    image:
      "https://images.unsplash.com/photo-1603738397297-a374b78e9626?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

const temp_comment = {
  text: "This place is great, but I wish there was internet",
  author: "Peter",
};

// module.exports = () => {
//   // Remove all campgrounds
//   Campground.deleteMany({}, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("removed campgrounds!");
//       // Add a few campgrounds
//       data.forEach((seed) => {
//         Campground.create(seed, (err, campground) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log("added a campground");
//             // Add comment
//             Comment.create(temp_comment, (err, comment) => {
//               if (err) {
//                 console.log(err);
//               } else {
//                 Campground.comments.push(comment);
//                 Campground.save();
//                 console.log("Created new comment");
//               }
//             });
//           }
//         });
//       });
//     }
//   });
// };

async function seedDB() {
  // Remove all campgrounds
  try {
    await Campground.deleteMany({}, (err, db) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Removed campground!");
      }
    });
  } catch {
    console.log("Error removing campgrounds");
  }

  // Add a few campgrounds
  try {
    data.forEach((seed) => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          // Add comment
          Comment.create(temp_comment, (err, comment) => {
            if (err) {
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log("Created new comment");
            }
          });
        }
      });
    });
  } catch {
    console.log("Error creating campgrounds");
  }
}

module.exports = seedDB;