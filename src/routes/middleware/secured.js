module.exports = function () {
    return function secured (req, res, next) {
        if (req.user) {
            return next();
        }
        res.redirect('/login');
    };
};