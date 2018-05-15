const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../app/models/user.model');
const googleConfig = require('../config/google');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {

  passport.use(new GoogleStrategy({
      clientID: googleConfig.GOOGLE_CLIENT_ID,
      clientSecret: googleConfig.GOOGLE_CONSUMER_SECRET,
      callbackURL: googleConfig.GOOGLE_CALLBACK_URL
    },

    function(accessToken, refreshToken, profile, done) {
      console.log(profile);

      User.findOne({ email: profile.emails[0].value }).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                let hashedPassword = bcrypt.hashSync(accessToken, 8);
                new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    // password:
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });

     }
  ));

}
