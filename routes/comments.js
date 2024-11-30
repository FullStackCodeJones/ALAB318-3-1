const express = require("express");
const router = express.Router();

// Temporary Comments Data
let comments = [
  { id: 1, postId: 1, content: "Great post!", author: "Shawn Jones" },
  { id: 2, postId: 2, content: "I agree with Shawn!", author: "Randi Jones" },
];

// Route to Get All Comments
router.get("/", (req, res) => {
  res.json(comments);
});

// Route to Create A New Comment
router.post("/", (req, res) => {
  const { postId, content, author } = req.body;

  // Validate input fields
  if (!postId || !content || !author) {
    return res
      .status(400)
      .json({ message: "postId, content, and author are required." });
  }

  // Create a new comment with a unique ID
  const newComment = {
    id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 1, // Increment based on the last comment ID
    postId,
    content,
    author,
  };

  comments.push(newComment);
  res.status(201).json(newComment);
});

// Route to Get Comment By ID
router.get("/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: "Comment not found" });
  }
});

// Route to Update Comment By ID
router.patch("/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));

  if (comment) {
    const { content, author } = req.body;

    // Update the fields if provided
    if (content) comment.content = content;
    if (author) comment.author = author;

    res.json(comment);
  } else {
    res.status(404).json({ message: "Comment not found" });
  }
});

// Route to Delete Comment By ID
router.delete("/:id", (req, res) => {
  comments = comments.filter((c) => c.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;
