const { validationResult } = require('express-validator');

module.exports = {
    handleErrors(templateFunc, dataCb) {
        return async (req, res, next) => {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                //call datacB calback functio to get object that it returns 
                let data = {};
                if(dataCb) {
                    data = await dataCb(req); 
                }
                //now templateFunc has access to our data product
                return res.send(templateFunc({ errors, ...data }));
            }
            next();
        };
    },
    requireAuth(req, res, next) {
        if(!req.session.userId) {
            return res.redirect('/signin');
        }
        next(); //everything run fine
    }
};