require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// Database
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

// App init
const app = express();

// ======================
// Database Connection
// ======================
connectDB();

// ======================
// Global Middlewares
// ======================
app.use(express.json()); // body parser
app.use(cors());         // enable CORS
app.use(helmet());       // security headers

// ======================
// Swagger Documentation
// ======================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ======================
// API Routes (Versioned)
// ======================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

// ======================
// Test Route
// ======================
app.get("/", (req, res) => {
  res.send("Backend Assignment API is running");
});

// ======================
// Server Start
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use(cors());
