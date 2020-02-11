const router = require('express').Router();
let Church = require('../models/church.model');

router.get('/', (req, res) => {
    Church.find()
    .then(church => res.json(church))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/admin/add', (req, res) => {
    const churchName = req.body.churchName;
    const newChurch = new Church({
        churchName
    });
  
    newChurch.save()
    .then(() => res.json('Church added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    let token = req.cookies.jwt;
    if (token) {
        authService.verifyUser(token)
        .then(user => {
            if (user.Admin) {
                models.church
                findByPk(parseInt(req.params.id))
                .then(userFound => {
                    let churchName = parseInt(req.params.id);
                    models.church.update(
                        {
                            Updated: 'true'
                        },
                        {
                            where: {
                                churchName: churchUpdated
                            }
                        }
                    )
                    .then(user => {
                        res.redirect('/church/admin')
                    })
                });
            } else {
                res.send('Must be an admin to view this page')
            }
        });
    } else {
        res.send('error: admin not logged in')
    }
});

router.get('/:id', (req, res) => {
    Church.findById(req.params.id)
    .then(church => res.json(church))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/admin/delete:id', (req, res) => {
    Church.findByIdAndDelete(req.params.id)
    .then(() => res.json('Church deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/admin/update/:id', (req, res) => {
    Church.findById(req.params.id)
    .then(church => {
        church.churchName = req.body.churchName;
       
        church.save()
        .then(() => res.json('Church updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/admin').get((req, res) => {
//  let token=req.cookies.jwt;
//  if(token){
//      authService.verifyUser(token)
//      .then(user=>{
//          if(user.Admin){
//              models.users
//              .findAll({
//                  where:{Deleted: false}, raw: true
//              })
//             .then(usersFound=>res.render('admin', {users: usersFound}));
//          } else {
//              res.send('unauthorized')
//          }
//          });
//     } else {
//         res.send('error: admin not logged in')
//     } 
// });

// router.route('/admin/add').post((req, res) => {
//     let token=req.cookies.jwt;
//     if(token){
//         authService.verifyUser(token)
//         .then(user=>{
//             if(user.Admin){
//                 models.users
//                 .findAll({
//                     where:{Deleted: false}, raw: true
//                 })
//                .then(usersFound=>res.render('admin', {users: usersFound}));
//             } else {
//                 res.send('unauthorized')
//             }
//             });
//        } else {
//            res.send('error: admin not logged in')
//        } 
//    });

module.exports = router;