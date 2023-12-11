const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { User } = require("../models/User");

async function getUserByEmail(email) {
    return await User.findOne({ email: email });
}
async function getUserById(id) {
    return await User.findById({ _id: id });
}

function initialize(passport) {

    const authenticateUser = async (email, password, done) => {

        const user = await getUserByEmail(email);

        if (user == null) {
            return done(null, false, { message: "There is No user with that email." })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: "Invalid Email or Password." })

            }
        }
        catch (error) {
            return done(error)
        }
    }

    passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}


module.exports = initialize;