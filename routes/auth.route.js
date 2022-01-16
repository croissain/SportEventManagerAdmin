var express = require('express');
var router = express.Router();

const authController = require('../controllers/AuthController')

const passport = require('../auth/passport');


router.get('/login', authController.loginPage);

router.get('/logout', authController.logout);


router.post('/login',
    passport.authenticate('local'
        , { successRedirect: '/',
    failureRedirect: '/auth/login?loginFailed',
    }
    ),
);


module.exports = router;
