const router = require('express').Router();
let Prayer = require('../models/prayer.model');

router.get('/', (req, res) => {
    Prayer.find()
    .then(prayer => res.json(prayer))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post('/add', (req, res) => {
    console.log(req.body)
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const description = req.body.description;
    const date = Date.parse(req.body.date);
    console.log(req.username);
    const newPrayer = new Prayer({
        firstName,
        lastName,
        description,
        date,
    });
    newPrayer
    .save()
    .then(() => res.json('Prayer Request added!'))
    .catch(err =>{
    	console.log(err);
    	res.status(400).json('Error: ' + err);
    });
});

router.get('/:id', (req, res) => {
    Prayer.findById(req.params.id)
    .then(prayer => res.json(prayer))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
    Prayer.findByIdAndDelete(req.params.id)
    .then(() => res.json('Prayer Request deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/update/:id', (req, res) => {
    Prayer.findById(req.params.id)
    .then(prayer => {
        console.log(req.body)
        prayer.firstName = req.body.firstName;
        prayer.lastName = req.body.lastName;
        prayer.description = req.body.description;
        prayer.date = Date.parse(req.body.date);

        prayer
        .save()
        .then(() => res.json('Prayer Request updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;