

const passport = require("../auth/passport");
exports.isLogin = async (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect('/auth/login')
    }
}

exports.loginPage = (req, res, next) => {
    res.render('auth/login', { title: `auth`, layout: 'loginLayout.hbs', loginFailed: req.query.loginFailed !== undefined });
}


exports.logout = (req, res, next) => {
    req.logout()
    res.redirect('/auth/login');
}
