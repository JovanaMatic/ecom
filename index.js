const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['hdshgsshshgsgddhs']   //this is for encrypting all the info about the user
}))

app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);

//set up template engine

app.set('view engine', 'ejs');
//static files

app.listen(3000, () => {
    console.log('listening');
})