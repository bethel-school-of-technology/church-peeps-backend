const router = require('express').Router();
let PrayerRequest = require('../models/prayer.model');
let authService = require('../services/auth');

router.get('/', (req, res) => {
    PrayerRequest.find()
    .then(prayer => res.json(prayer))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const newPrayerRequest = new PrayerRequest({
        firstName,
        lastName,
        description,
        date,
    });

    newPrayerRequest.save()
    .then(() => res.json('Prayer Request added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
    PrayerRequest.findById(req.params.id)
    .then(prayer => res.json(prayer))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
    PrayerRequest.findByIdAndDelete(req.params.id)
    .then(() => res.json('Prayer Request deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/update/:id', (req, res) => {
    PrayerRequest.findById(req.params.id)
    .then(prayer => {
        prayer.firstName = req.body.firstName;
        prayer.lastName = req.body.lastName;
        prayer.description = req.body.description;
        prayer.date = Date.parse(req.body.date);

        prayer.save()
        .then(() => res.json('Prayer Request updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/admin', (req, res)  => {
    let token = req.cookies.jwt;
    if (token) {
      authService.verifyUser(token)
        .then(prayer => {
          if (prayer.Admin) {
            models.prayer
              .findAll({
                where: { Deleted: false }, raw: true
              })
              .then(prayerRequestFound => res.render('admin', { prayer: prayerRequestFound }));
          } else {
            res.send('unauthorized')
          }
        });
    } else {
      res.send('error: admin not logged in')
    }
  });

  router.post('/admin/add', (req, res) => {
    let token=req.cookies.jwt;
    if(token){
        authService.verifyUser(token)
        .then(prayer=>{
            if(prayer.Admin){
                models.prayers
                .findAll({
                    where:{ Deleted: false }, raw: true
                })
               .then(prayerRequestFound=>res.render('admin', { prayer: prayerRequestFound }));
            } else {
                res.send('unauthorized')
            }
            });
       } else {
           res.send('error: admin not logged in')
       } 
   });

module.exports = router;