const fs = require('fs');
const crypto = require('crypto');
const util = require('util'); // used util to get the scrypt and hashed pasword with promisses not callbacks
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UserRepository extends Repository {
    async comparePasswords(saved, supplied) {
        // saved => password saved in our database 'hashed.salt'
        // supplied => password given to us by a user trying to sign in
        // const result = saved.split('.');  array with two elements: 1 hashed, 2 salt
        // const hashed = result[0];
        // const salt = result[1];
        const [hashed, salt ] = saved.split('.');  //moze i ovako
        const hashedSupplyBuff = await scrypt(supplied, salt, 64); //hashedSupply this is a buffer

        return hashed === hashedSupplyBuff.toString('hex');
    }
    async create(attrs) {
        // we are assuming that attrs === { email: '', password: ''}
        const records = await this.getAll();
        //attrs.id = crypto.randomBytes(4).toString('hex')
        attrs.id = this.randomID();

        const salt = crypto.randomBytes(8).toString('hex');
        const buff = await scrypt(attrs.password, salt, 64); // we used util and promisify so that we can avoid callback function

        // uzmi sve properties iz attrs objekta i overwrite sa novom password:
        // records.push({
        //     ...attrs,
        //     pasword: `${buff.toString('hex')}.${salt}` //hashed is a buffer so we need to turn it to hex   tacka je za raspoznavanje buff i salt
        // });
        const record = {
                ...attrs,
                password: `${buff.toString('hex')}.${salt}` // buff is a buffer so we need to turn it to hex   tacka je za raspoznavanje buff i salt
            }
            records.push(record);
        await this.writeAll(records);
        
        //vrati updejtovani objekat sa novom paswword buff+salt
        return record;
    }
}

//testing:
// const test = async () => {
//     const repo = new UserRepository('users.json');
//     const user = await repo.getOneBy({hdhhddhhd: 'hdhdhhd'});
//     console.log(user);
// }
// test();

module.exports = new UserRepository('users.json');