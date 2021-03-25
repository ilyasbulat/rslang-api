require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: false }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);

//internal server error possibly
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

// const user = process.env.DB_USER;
// const pass =

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@this-is-rslang.klyzy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
