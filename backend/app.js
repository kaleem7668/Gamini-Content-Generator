const ENV = process.env.NODE_ENV || 'production'
require('dotenv').config({
  path: `.env.${ENV}`
});

// External Module
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

// Local Module
const errorController = require("./controllers/errorController");
const conversationRouter = require('./routers/conversationRouter');



  const MONGO_DB_URL = 'mongodb://localhost:27017/GaminiData'

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/api', conversationRouter);
app.use(errorController.get404);

const PORT = process.env.PORT || 3000;
mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
});



// mongoose.connect(MONGO_DB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('MongoDB connected successfully');
// })
// .catch((err) => {
//   console.error('MongoDB connection error:', err);
// });