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

router.get("/", (req, res) => {
  res.json(posts);
});

//Route to Create A New Post

router.post("/", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// Route to Get Post By ID

router.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).send("Post Not Found");
  }
});

//Route to Update A Post By ID

router.patch("/:id", (req, res) => {
  const post = post.find((p) => p.id === parseInt(req.params.id));
  if (post) {
    if (req.body.title) {
      post.title = req.body.title;
    }
    if (req.body.content) {
      post.content = req.body.content;
    }
    if (req.body.author) {
      post.author = req.body.author;
    }
    res.json(post);
  } else {
    res.status(404).send("Post Not Found");
  }
});

//Route to Delete A Post By ID

router.delete("/:id", (req, res) => {
  posts = posts.filter((p) => p.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;
