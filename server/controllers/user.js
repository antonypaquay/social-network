const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.getAll = (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json({err}));
}

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.user_pwd, 10)
        .then(hash => {
            const user = new User({
                ...req.body,
                user_pwd: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: "User created" }))
                .catch(err => res.status(400).json({err}));
        })
        .catch(err => res.status(500).json(err));
};

exports.login = (req, res, next) => {
     User.findOne({ user_email: req.body.data.user_email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            bcrypt.compare(req.body.data.user_pwd, user.user_pwd)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });

                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};