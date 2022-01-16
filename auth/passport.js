const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const AdminService = require('../services/AdminService')

const passport = require('passport')
    ,LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async function(email, password, done) {
        console.log(email,password);

        try
        {

            const admin = await AdminService.findAdminByEmail(email);

            if (!admin) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const match = await validPassword(admin,password);
            if (!match) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, admin);
        }
        catch (err){
            done(err);
        }
    }

));

passport.serializeUser(function(admin, done) {
    done(null, {email: admin.EmailNV, id: admin.TenNV});
});


passport.deserializeUser(async function(admin, done) {
    return done(null, admin);
});



async function validPassword(admin,password){

    return bcrypt.compare(password, admin.MatKhauNV);
}

module.exports = passport;
