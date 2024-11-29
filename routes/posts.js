const express = require("express");
const router = express.Router();

//Temporary Post Data

let posts = [
  {
    id: 1,
    title: "Sailor on the Sea",
    content: "Life of Shawn Jones",
    author: "Shawn Jones",
  },
  {
    id: 2,
    title: "Mom/Software Engineer/Navy Wife",
    content: "Life of Randi Jones",
    author: "Randi Jones",
  },
];

//Route to Get All Posts
