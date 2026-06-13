// Load environment variables first
require("dotenv").config();

// Core imports
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Create app
const app = express();

// =======================
// Middleware
// =======================
app.use(express.json());
app.use(cookieParser());

// =======================
// CORS CONFIG (FIXED)
// =======================
const allowedOrigins = [
  "https://my-todo-app-frontend-cyan.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow tools like Postman or server-to-server requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS: " + origin));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

// Apply CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // preflight fix

// =======================
// DB CONNECTION
// =======================
const { dbConnect } = require("./config/dbConnect");
dbConnect();

// =======================
// ROUTES
// =======================
const allRoutes = require("./routes/routes");
app.use("/api/v1", allRoutes);

// =======================
// HEALTH CHECK ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});