const express = require("express");
const router = express.Router();

// Temporary Post Data
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

// Route to Get All Posts
router.get("/", (req, res) => {
  res.json(posts);
});

// Route to Create A New Post
router.post("/", (req, res) => {
  const { title, content, author } = req.body;

  // Validate input fields
  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ message: "Title, content, and author are required." });
  }

  // Create new post with a unique ID (avoiding ID conflicts if posts are deleted)
  const newPost = {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1, // Incrementing based on the last post ID
    title,
    content,
    author,
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

// Route to Update A Post By ID
router.patch("/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));

  if (post) {
    const { title, content, author } = req.body;

    // Update only provided fields
    if (title) post.title = title;
    if (content) post.content = content;
    if (author) post.author = author;

    res.json(post);
  } else {
    res.status(404).send("Post Not Found");
  }
});

// Route to Delete A Post By ID
router.delete("/:id", (req, res) => {
  posts = posts.filter((p) => p.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;
