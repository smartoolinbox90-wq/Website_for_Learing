const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let users = []; // temporary storage

// Register
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  users.push({ username, password });

  res.json({ message: "User registered successfully ✅" });
});

// Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ message: "Login successful 🚀" });
  } else {
    res.status(401).json({ message: "Invalid credentials ❌" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
