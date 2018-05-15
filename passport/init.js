var google = require('./google');
var User = require('../app/models/user.model');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    // passport.serializeUser(function(user, done) {
    //     console.log('serializing user: ');console.log(user);
    //     done(null, user._id);
    // });
    //
    // passport.deserializeUser(function(id, done) {
    //     User.findById(id, function(err, user) {
    //         console.log('deserializing user:',user);
    //         done(err, user);
    //     });
    // });

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            done(null, user);
        });
    });

    // Setting up Passport Strategies for Facebook and Twitter
    google(passport);

}
