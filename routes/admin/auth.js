const express = require('express');
//const { validationResult } = require('express-validator');  // const expressValidator =  require('express-validator'); expressValidator.check(); we destructured the 1 function that we care about => check()
const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users.js');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const { requireEmail, requirePassword, requirePasswordConfirmation, requireEmailExists, requirePasswordExists } = require('./validators');

const router = express.Router(); //this is for linking our routers(signin, signout) with express app that is created inside the index.js file

router.get('/signup', function(req, res) {
    res.send(signupTemplate({ req })); // req: req
});
//midelware function:
// const bodyParser = (req, res, next) => {
//     if(req.method = 'POST') {
//     req.on('data', data => {
//         const parsed = data.toString('utf-8').split('&');
//         const formData = {};
//         for(let pair of parsed) {
//             const [key, value] = pair.split('=');
//             formData[key] = value;
//         }
//         req.body = formData;
//         next();
//       })
//     } else {
//         next();
//     }
// }
router.post('/signup', [requireEmail, requirePassword, requirePasswordConfirmation ], handleErrors(signupTemplate),   // this came from file validators.js
async (req, res) => {
    //const errors = validationResult(req);
    //console.log(errors);
    
    //if(!errors.isEmpty()) {   //isEmpty method is going to be thrown if there is no error
        //return res.send(signupTemplate({ req, errors }))  // sign up template with errors properties which now we can use
    //}
    // get access to email, pasword and paswordConfirmation
    //console.log(req.body);
    //destrucutre email pasword from req.body object
    const { email, password, passwordConfirmation } = req.body;
    //const existingUser = await usersRepo.getOneBy({ email: email });
    
    //check to see if existingUser has already defined:
    // if(existingUser) {
    //     return res.send(`User with email: ${email} already exists`);
    // }
    // if(password !== passwordConfirmation) {
    //     return res.send('password doesn\'t match with the password confirmation')
    // }

    //creates a user in a user repo to represent this person
    const user = await usersRepo.create({ email: email, password: password }); //{ email, pasword }

    //store the id of that user inside the coockie 
    req.session.userId = user.id; // req.session => this property (session) was added by cookie-session
    res.redirect('/admin/products');

})
router.get('/signout', (req,res) => {
    req.session = null;   // delete all the cookies so that the user can log out 
    res.send('you are logged out');
})
router.get('/signin', (req,res) => {
    res.send(signinTemplate({}));
})
router.post('/signin', [ requireEmailExists, requirePasswordExists], handleErrors(signinTemplate),
async (req,res) => {
    // const errors = validationResult(req);
    // console.log(errors);

    // if(!errors.isEmpty()) {
    //     return res.send(signinTemplate({ errors }));
    // }

    const { email } = req.body;
    const user = await usersRepo.getOneBy({ email: email }); //({ email })
    // if(!user) {
    //     return res.send('Email not found');
    // }
    // const validPasword = await usersRepo.comparePasswords(
    //     user.password, // password from our database (users.json) for that particular user
    //     password       // password from req.body that user just typed in
    // );
    // if(!validPasword) {     // because we are returning true or false from our comparePasswors()  return hashed === hashedSupplyBuff.toString('hex');
    //     return res.send('Invalid password');
    // }
    req.session.userId = user.id;
    res.redirect('/admin/products');
})

module.exports = router;