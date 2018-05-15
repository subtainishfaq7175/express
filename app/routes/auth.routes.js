const varifyToken = require('../middlewares/varifyToken.middleware');
const auth = require('../controllers/auth.controller');

module.exports = (app, passport) => {

  app.post('/register', auth.signup);

  app.get('/user', varifyToken,  auth.user);

  app.post('/login', varifyToken, auth.login);

  app.get('/login/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  app.get('/login/google/callback',
  passport.authenticate('google'), function(req, res) {
    res.send(req.user);
  });

}
