const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const appConfig = require('./config/app');
const config = require('./config/config');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Initialize App configuration
appConfig(app);
app.use(passport.initialize());

mongoose.Promise = global.Promise;

mongoose.connect(config.url)
.then(() => {
  console.log("Successfully connected to the database");
})
.catch(err => {
  console.log('Could not connect to the database. Exiting now...');
    process.exit();
})

// Initialize Passport
const initPassport = require('./passport/init');
initPassport(passport);

app.get('/', (req, res) => {
  res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/note.routes')(app);
require('./app/routes/auth.routes')(app, passport);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
