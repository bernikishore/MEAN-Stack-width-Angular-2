const User = require('../models/user');

const jwt = require('jsonwebtoken');

const config = require('../config/databse');

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

    // check email is available or not
    router.get('/checkEmail/:email', (req, res) => {
        if (!req.params.email) {
            res.json({ success: false, message: 'E-mail was not provided' });
        } else {
            User.findOne({ email: req.params.email }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'E-mail is already teaken' });
                    } else {
                        res.json({ success: true, message: 'E-mail is avaiable' });
                    }
                }
            });
        }
    });

    router.get('/checkUsername/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: 'Username was not provided' });
        } else {
            User.findOne({ username: req.params.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'Username is already teaken' });
                    } else {
                        res.json({ success: true, message: 'Username is avaiable' });
                    }
                }
            });
        }
    });

    // login page
    router.post('/login', (req, res) => {
        //res.send('test');
        if (!req.body.username) {
            res.json({ success: false, message: 'No username was provided ' });
        } else {
            if (!req.body.password) {
                res.json({ success: false, message: 'No password was provided' });
            } else {

                // res.send('test');

                User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!user) {
                            res.json({ success: false, message: 'Username not found' });
                        } else {
                            const validPassword = user.comparePassword(req.body.password);
                            if (!validPassword) {
                                res.json({ success: false, message: 'Password Invalid' });
                            } else {
                                //res.json({ success: true, message: 'Success!' });
                                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
                                res.json({ success: true, message: 'Success!', token: token, user: { username: user.username } });
                            }
                        }
                    }
                });
            }
        }
    });

    // profile page

    router.use((req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            res.json({ success: false, message: 'No token provided' });
        } else {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Token invalid ' + err });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    });

    router.get('/profile', (req, res) => {
        // res.send(req.decoded);
        User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    res.json({ success: true, user: user });
                }
            }
        });
    });

    return router;
};