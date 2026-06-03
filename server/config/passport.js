const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const db = require('../db/queries');

passport.use(
    new LocalStrategy({ usernameField: 'userName', passwordField: 'pwd' }, async (userName, pwd, done) => {
        try {
            const user = await db.getUserByUserName(userName);
            if (!user) return done(null, false, { message: `User "${userName}" doesn't exist.` });

            const matchedPwd = await bcrypt.compare(pwd, user.password);
            if (!matchedPwd) return done(null, false, { message: `Incorrect password for user "${userName}".` });

            const { password, ...responseToUser } = user;
            return done(null, responseToUser);
        } catch (err) {
            return done(err);
        }
    }),
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);
        return done(null, user);
    } catch (err) {
        return done(err);
    }
});
