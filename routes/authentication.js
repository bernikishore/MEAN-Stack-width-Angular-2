const User = require('../models/user');

module.exports = (router) => {
    router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: 'You must provide an e-mail' });
        } else {
            if (!req.body.username) {
                res.json({ success: false, message: 'You must provide an username' });
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message: 'You must provide an password' });
                } else {
                    let user = User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    user.save((err) => {
                        if (err) {
                            //console.log(err);
                            if (err.code === 11000) {
                                res.json({ success: false, message: 'Username or E-mail already exists' });
                            } else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.json({ success: false, message: err.errors.email.message });
                                    } else {
                                        if (err.errors.username) {
                                            res.json({ success: false, message: err.errors.username.message });
                                        } else {
                                            if (err.errors.password) {
                                                res.json({ success: false, message: err.errors.password.message });
                                            } else {
                                                res.json({ success: false, message: err });
                                            }
                                        }
                                    }
                                } else {
                                    res.json({ success: false, message: 'Could not save user:', err });
                                }
                            }

                        } else {
                            res.json({ success: true, message: 'User save data' });
                        }
                    });

                }
            }
        }


    });

    return router;
};