const router = require('express').Router();
let Profile = require('../models/profile.model');
let authService = require('../services/auth');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


router.get('/', (req, res, next) => {
    Profile.find()
    .then(profiles => res.json(profiles))
    .catch(err => res.status(400).json("Error: " + err));
});

// router.post('/add', (req, res, next) => {
//     const username = req.body.username;
//     const prayer = req.body.prayer;

//     const newProfile = new Profile({
//             username,
//             prayer

//         });
//         newProfile.save()
//         .then(() => res.json("Profile added"))
//         .catch(err => res.status(400).json("Error: " + err));

// });

router.get('/:id', (req, res) => {
    try {
        const profile = Profile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({
                msg: 'Profile not found'
            });
        }

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



router.put('/:id', (req, res) => {
    const { error } = validationResult(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const profile = Profile.findOneAndUpdate(
        req.body.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        },
    );

    if (!profile) return res.status(404).send("Invalid Credentials")
    profile.save();
    res.send(profile);

});

router.delete('/:id', (req, res) => {
    const profile = Profile.findByIdAndRemove(req.params.id)
    console.log(profile);
    if (!profile) {
        return res.status(404).json({msg: 'Profile not found'})
    }
    res.json({
        msg: 'Profile Removed'
    });
} );

module.exports = router;