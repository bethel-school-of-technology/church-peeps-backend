const router = require('express').Router();
let User = require('../models/user.model');
let authService = require('../services/auth');

router.get('/', (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/add', function (req, res, next) {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username = req.body.username;
    const password = authService.hashPassword(req.body.password);

    const newUser = new User({ firstName, lastName, email, username, password });

    newUser
        .save()
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.post('/login', (req, res, next) => {
    console.log(req.body);
    User.findOne({
      username: req.body.username
    }).then(user => {
      if (!user) {
        console.log("User not found");
        return res.status(401).json({
          message: "Login Failed"
        });
      } else {
        let passwordMatch = authService.comparePasswords(
          req.body.password,
          user.password
        );
        if (passwordMatch) {
          let token = authService.signUser(user);
          let responseuser = {
            username: user.username
          };
          res.cookie("jwt", token);
          res.json(responseuser);
        } else {
          console.log("Wrong password");
          res.send("Wrong password");
        }
      }
    })
});   

router.get('/profile', (req, res, next) => {
    if (req.user) {
        models.users.findByPk(parseInt(req.user.UserId))
        .then(user => {
            if (user) {
                res.render('profile', {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username
                });
            } else {
                res.send('User not found');
            }
        });
    } else {
        res.redirect('/users/login');
    }
});



// router.get('/admin/:id', (req, res, next) => {
//     if (req.params.id !== String(req.user.UserId)) {
//         res.send('This is not your profile');
//     } else {
//         let status;
//         if (req.user.Admin) {
//             status = 'Admin';
//         } else {
//             status = 'Normal user';
//         }
//         res.render('profile', {
//             UserId: req.user.UserId,
//             firstName: req.user.firstName,
//             lastName: req.user.lastName,
//             email: req.user.email,
//             username: req.user.username,
//             Status: status
//         });
//     }
// });

// router.delete('/admin/:id', (req, res, next) => {
//     if (req.param.id !== String
//         (req.params.UserId)) {
//             res.send('Not Admin');
//         } else {
//             let status;
//             if (req.user.Admin) {
//                 status = 'Admin';
//             } else {
//                 status = 'Normal user';
//             }
//         }
//     User.findByIdAndDelete
//     .then(() => res.json('User deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.put('/update/:id', (req, res) => {
    User.findById(req.params.id)
    .then(users => {
        users.firstName = req.body.firstName;
        users.lastName = req.body.lastName;
        users.email = req.body.email;
        users.username = req.body.username;
        users.password = req.body.password;

        users.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});
// router.get('/admin', (req, res) => {
//  let token=req.cookies.jwt;
//  if(token){
//      authService.verifyUser(token)
//      .then(user=>{
//          if(user.Admin){
//              models.user
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

// router.post('/admin/add', (req, res) => {
//     let token=req.cookies.jwt;
//     if(token){
//         authService.verifyUser(token)
//         .then(user=>{
//             if(user.Admin){
//                 models.user
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

   router.get('/logout', (req, res) => {
       res.cookie("jwt", "", { expires: new Date(0) });
       res.send("Logged Out");
   });

module.exports = router;