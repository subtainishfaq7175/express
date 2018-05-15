const User = require('../models/user.model');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {

  //Validation required

  let hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const user = new User({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  });

  user.save()
  .then( user => {
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  })
  .catch( err => {
    return res.status(500).send("There was a problem registering the user.")
  })

}

exports.user = (req, res) => {

    User.findById(req.userId, { password: 0 })
    .then(user => {
      if(!user) {
        return res.status(404).send({
          message: "Note not found with id " + id
        });
      }
      res.send(user);
    })
    .catch( err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Note not found with id " + id
        });
      }
      return res.status(500).send({
          message: "Error retrieving user with id " + id
      })
    })


}

exports.login = (req, res) => {

  //Validation required

  User.findOne({ email: req.body.email })
  .then( user => {
      if(!user) {
        return res.status(404).send('No user found.');
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, user: user });

  })
  .catch( err => {
    return res.status(500).send('Error on the server.');
  })

}
