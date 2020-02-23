const router = require('express').Router();
let Profile = require('../models/profile.model');
let withAuth = require('../middleware');

router.get('/', (req, res, next) => {
    Profile.find()
    .then(profile => res.json(profile))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post('/add', (req, res, next) => {
    
    const city = req.body.city;
    const state = req.body.state;
    const church = req.body.church;

    const newProfile = new Profile({
            city,
            state,
            church
        });
        newProfile
        .save()
        .then(() => res.json("Profile added"))
        .catch(err => res.status(400).json("Error: " + err));

});

router.get('/:id', (req, res) => {
   Profile.findById(req.params.id)
   .then(profile => res.json(profile))
   .catch(err => res.status(400).json("Error: " + err));
});



router.put('/update/:id', (req, res) => {
    Profile.findById(req.params.id)
    .then(profile => {
            profile.city = req.body.city;
            profile.state = req.body.state;
            profile.church = req.body.church;

            profile
            .save()
            .then(() => res.json('Profile updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
    
router.delete('/:id', (req, res) => {
    Profile.findByIdAndDelete(req.params.id)
    .then(() => res.json("Profile deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

// router.delete('/:id', (req, res) => {
//     const profile = Profile.findByIdAndRemove(req.params.id)
//     console.log(profile);
//     if (!profile) {
//         return res.status(404).json({msg: 'Profile not found'})
//     }
//     res.json({
//         msg: 'Profile Removed'
//     });
// } );

module.exports = router;