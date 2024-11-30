const express = require("express");
const router = express.Router();

// Temporary Users Data
let users = [
  { id: 1, name: "Shawn Jones", email: "jones.shawn@example.com", age: 36 },
  { id: 2, name: "Randi Jones", email: "jones.randi@example.com", age: 37 }, // Fixed typo in email
];

// Route To Get All Users
router.get("/", (req, res) => {
  res.json(users);
});

// Route To Get User By ID
router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// Route To Create A New User
router.post("/", (req, res) => {
  const { name, email, age } = req.body;

  // Validate input fields
  if (!name || !email || !age) {
    return res
      .status(400)
      .json({ message: "Name, email, and age are required." });
  }

  // Validate if the email is unique
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists." });
  }

  // Create new user with a unique id
  const newUser = { id: users.length + 1, name, email, age };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Route To Update A User By ID
router.patch("/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Route To Delete A User By ID
router.delete("/:id", (req, res) => {
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;
