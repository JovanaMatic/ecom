const layout = require('../layout');
const { getError } = require('../../helpers');

//const gertError = (errors, propName) => {
    // propName === email, password or passwordConfirmation
    //ovde je pravilnije raditi if else statemenets ali ima mnogo stvari na koje treba obratiti paznju pa zato koristimo try catch
  //  try {
     //   return errors.mapped()[propName].msg;   //errors.mapped() will return object with keys email, password.....
   // } catch (err){
      //  return '';      // lakse je uraditi try catch, to jest ako nesto nije u redu sa nasim kodom ne znamima nas, zato sto ako password nije greska onda email key nece postojati uopste u propName objektu i to onda ce ['email].msg biti undefined
   // }

//}

module.exports = ({ req, errors }) => {
    return layout({content: 
        `
            <div class="container">
                <div class="container is-centered">
                    <div class="container is-one-quarter">
                <form method="POST">
                <h1 class="title">Sign up</h1>
                    <div class="field">
                        <label class="label">Email</label>
                        <input required class="input" type="text" name="email" placeholder="email">
                        <p class="help is-danger">${getError(errors, 'email')}</p>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <input required class="input" type="text" name="password" placeholder="password">
                        <p class="help is-danger">${getError(errors, 'password')}</p>
                    </div>
                    <div class="field">
                        <label class="label">Password Confirmation</label>
                        <input required class="input" type="text" name="passwordConfirmation" placeholder="password confirmation">
                        <p class="help is-danger">${getError(errors, 'passwordConfirmation')}</p>
                    </div>
                        <button class="button is-primary">Submit</button>
                </form>
                <a href="signin">Have an acount? Sign in</a>
            </div>
        </div>
    </div>
        `
    });
}