const router = require('express').Router();
let PrayerRequest = require('../models/prayerrequest.model');

router.route('/').get((req, res) => {
    PrayerRequest.find()
    .then(prayerrequests => res.json(prayerrequests))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const newPrayerRequest = new PrayerRequest({
        username,
        description,
        date,
    });

    newPrayerRequest.save()
    .then(() => res.json('Prayer Request added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    PrayerRequest.findById(req.params.id)
    .then(prayerrequest => res.json(prayerrequest))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    PrayerRequest.findByIdAndDelete(req.params.id)
    .then(() => res.json('Prayer Request deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    PrayerRequest.findById(req.params.id)
    .then(prayerrequest => {
        prayerrequest.username = req.body.username;
        prayerrequest.description = req.body.description;
        prayerrequest.date = Date.parse(req.body.date);

        prayerrequest.save()
        .then(() => res.json('Prayer Request updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;