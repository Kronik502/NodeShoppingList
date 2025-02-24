require("dotenv").config();  // Load environment variables
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  // Use environment variable for the secret key

// Middleware
app.use(cors());
app.use(express.json());

// Define the path to the database file
const DB_FILE = "db.json";

// Function to read the database
const readDB = () => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    
    // Ensure that `users` and `shoppingList` are initialized
    if (!data.users) {
      data.users = [];
    }
    if (!data.shoppingList) {
      data.shoppingList = [];
    }

    return data;
  } catch (err) {
    // Return a default structure if file is not found or there is an error
    return { users: [], shoppingList: [] };
  }
};

// Function to write to the database
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// User Registration
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  // Check if user already exists
  if (db.users.find(user => user.email === email)) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save new user
  const newUser = {
    id: Date.now(),
    email,
    password: hashedPassword,
  };

  db.users.push(newUser);
  writeDB(db);

  res.status(201).json({ message: "User registered successfully" });
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token });
});

// Middleware to authenticate the user with JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Route to get all shopping items (requires authentication)
app.get("/items", authenticateToken, (req, res) => {
  const db = readDB();
  res.json(db.shoppingList);
});

// Route to add an item to the shopping list (requires authentication)
app.post("/items", authenticateToken, (req, res) => {
  const { name, quantity, description, price } = req.body;
  const db = readDB();

  if (!name || !quantity || !description || !price) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const parsedQuantity = parseInt(quantity, 10);
  const parsedPrice = parseFloat(price);

  if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
    return res.status(400).json({ message: "Quantity must be a positive number!" });
  }
  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    return res.status(400).json({ message: "Price must be a positive number!" });
  }

  const newItem = {
    id: Date.now(),
    name,
    quantity: parsedQuantity,
    description,
    price: parsedPrice,
  };

  db.shoppingList.push(newItem);
  writeDB(db);

  res.status(201).json(newItem);
});

// Route to update an item (requires authentication)
app.put("/items/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, quantity, description, price } = req.body;
  const db = readDB();

  const itemIndex = db.shoppingList.findIndex(item => item.id === parseInt(id));
  if (itemIndex === -1) return res.status(404).json({ message: "Item not found" });

  const updatedItem = {
    ...db.shoppingList[itemIndex],
    name,
    quantity,
    description,
    price,
  };
  db.shoppingList[itemIndex] = updatedItem;
  writeDB(db);

  res.json(updatedItem);
});

// Route to remove an item (requires authentication)
app.delete("/items/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const db = readDB();

  const itemIndex = db.shoppingList.findIndex(item => item.id === parseInt(id));
  if (itemIndex === -1) return res.status(404).json({ message: "Item not found" });

  db.shoppingList.splice(itemIndex, 1);
  writeDB(db);
  res.status(204).end();
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
