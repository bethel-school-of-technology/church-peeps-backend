const router = require('express').Router();
let Church = require('../models/church.model');
// let authService = require('../services/auth');

router.get('/', (req, res) => {
    Church.find()
    .then(church => res.json(church))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
    const title = req.body.title;
    const city = req.body.city;
    const state = req.body.state;

    const newChurch = new Church({
        title,
        city,
        state
    });

    newChurch.save()
    .then(() => res.json('New Church added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
    Church.findById(req.params.id)
    .then(church => res.json(church))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
    Church.findByIdAndDelete(req.params.id)
    .then(() => res.json('Church deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/update/:id', (req, res) => {
    Church.findById(req.params.id)
    .then(church => {
        church.title = req.body.title;
        church.city = req.body.city;
        church.state = req.body.state;

        church.save()
        .then(() => res.json('Church updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;