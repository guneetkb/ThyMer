const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// Express.json with extended false allows parsing
// of the body of json response
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API Running"));

// Connect Database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// static path to directory holding uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Define Routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/patients", require("./routes/api/patients"));
app.use("/api/appointments", require("./routes/api/appointments"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
