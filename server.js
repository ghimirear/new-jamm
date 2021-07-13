// defining 
const express = require("express");
var cors = require('cors');
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const journalRoutes = require("./routes/journalRoutes.js");
const articleRoutes = require("./routes/articleRoutes.js");
const quoteRoutes = require("./routes/quotes.js");
const imageRoutes = require("./routes/images.js");
const app = express();
const PORT = process.env.PORT || 3001;
const { auth } = require("./middleware/auth");
const cookieParser = require('cookie-parser');
const path = require("path");
const fileUpload = require ("express-fileupload");
// const bodyParser = require('body-parser');
app.use(fileUpload());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(cookieParser());
// bodyparcer 
// app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use("/api", userRoutes);
//app.use("/user", auth, journalRoutes);
app.use("/user", auth, journalRoutes);
app.use("/article", auth, articleRoutes);
app.use("/quote", auth, quoteRoutes);
 app.use("/image", imageRoutes);

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/jamm",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);


// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
