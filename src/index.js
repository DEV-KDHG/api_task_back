const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors');


const taskRoutes = require("./routes/task");
const categoryRoutes = require("./routes/category"); // Require the category routes
const stateRoutes = require("./routes/State");
const app = express();


const port = process.env.PORT || 9000;
const uri = process.env.MONGODB_URI;

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api", taskRoutes);
app.use("/api", categoryRoutes); 
app.use("/api", stateRoutes); 
// Connect to the database and start the server
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
