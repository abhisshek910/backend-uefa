const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const db =
  "mongodb+srv://abhishekagr00008:Abhishek@cluster0.owotj8v.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db, {})
  .then(() => {
    console.log("connection succesful");
  })
  .catch((err) => console.log("no conncection"));

const Match = require("./models/matchSchema");

const indexRouter = require("./routes/index");
app.use("/api", indexRouter); // Use '/api' as a prefix for all API routes

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("hello");
});
