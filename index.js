const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

//Import routes

const usersRouter = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRouter = require("./routes/comments");

//Use the routes

app.use("/api/users", usersRouter);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRouter);

//Default route

app.get("/", (req, res) => {
  res.send("Welcome to The API!");
});

//Start the server

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
