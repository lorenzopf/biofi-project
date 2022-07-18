'use strict';

module.exports = function (app) {

    const passportJWT = require('../auth/jwtAuth');
    const userController = require('../controllers/userController');

    app.route('/users').get(passportJWT.authenticate('jwt', { session: false }), userController.users);
    app.route('/user/login').post(userController.users_login);
    app.route('/user/logout').get(passportJWT.authenticate('jwt', { session: false }), function (req, res) {
        req.logout();
        res.json({ success: true });
    });

    app.route('/user/signup').post(userController.users_create);
    app.route('/user/:id_user').get(passportJWT.authenticate('jwt', { session: false }), userController.user);
    app.route('/user/edit').patch(passportJWT.authenticate('jwt', { session: false }), userController.users_update);
    app.route('/user/:id_user/delete').delete(passportJWT.authenticate('jwt', { session: false }), userController.users_delete);
}