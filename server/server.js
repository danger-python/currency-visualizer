const express = require('express');
const path = require('path');
const currencyApi = require('./routes/currencyApi');
const cors = require('cors');
const databaseController = require('./controllers/databaseController');

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //bodyParser deprecatd ML
app.use(express.static(path.join(__dirname, '../'))); //serves the index.html

app.use(cors());
// define route handlers
app.use('/currencyApi', currencyApi);


// oops did u think any of the buttons below worked lol
app.get('/login', (req, res) => {
  res.status(200).render(path.join(__dirname, '../client/Login.jsx'));
});

app.get('/signup', (req, res) => {
  res.render('../client/Signup.jsx');
});

app.post('/login', databaseController.userLogin, (req, res) => {
  res.status(200).redirect('/');
});

app.post('/signup', databaseController.createUser, (req, res) => {
  res.status(200).redirect('/');
});

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`); // just to test
});

module.exports = app;
