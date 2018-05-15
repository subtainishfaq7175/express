const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const User = require('../models/user.model');

function auth(req, res, next) {

  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    User.findById(req.userId)
    .then( user => {
      if(!user) {
        return res.status(403).send({ auth: false, message: 'No athenticated user found' });
      }
      next();
    })
    .catch( err => {
      return res.status(500).send({ auth: false, message: 'Error in fetching user' + err });
    })
  });
}

module.exports = auth;
