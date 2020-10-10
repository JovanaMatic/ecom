const layout = require('../layout');
const { getError } = require('../../helpers');

// const getError = ( errors, propName) => {
//     try {
//         return errors.mapped()[propName].msg;
//     } catch (err) {
//         return '';
//     }
// }

module.exports = ({ errors }) => {
    return layout({ content: 
        `<div class="container">
            <div class="column is-centered">
                <div class="column is-one-quarter">
                    <form method="POST">
                        <h1 class=title>Sign in</h1>
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
                <button class="button is-primary">Submit</button>
            </form>
            <a href="/signup">Need an acount? Sign Up</a>
        </div>
    </div>
    </div>
        `});
    };