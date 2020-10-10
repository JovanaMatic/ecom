const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

// receive a post request to add an item to a cart
router.post('/cart/products', async (req, res) => {
    //console.log(req.body.productId);
    //is there a cart or not!
    let cart;
    if(!req.session.cartId) {
        //don't have a cart, we need to create one
        cart = await cartsRepo.create({ items: [] });
        
        //and store cart Id on the req.session.cartId
        req.session.cartId = cart.id;
    }else{
        //we have a cart, get it from repository
        cart = await cartsRepo.getOne(req.session.cartId);
    }
    console.log(cart);
    //either increment an existing product  // productId je iz forme nase iz index.js fajla!!!
    const existingItems = cart.items.find(item =>  item.id === req.body.productId);
    //or add a new product
    if(existingItems) {
        //increment quantity and save cart
        existingItems.quantity++;
    }else{
        //add new product id to items array
        cart.items.push({ id: req.body.productId, quantity: 1});
    }
    await cartsRepo.update(cart.id, {
        items: cart.items
    });
    
    res.redirect('/cart');
})

// receive a get request to show all items in cart
router.get('/cart', async (req,res) => {
    //if a user don't have cart
    if(!req.session.cartId) {
        return res.redirect('/');
    }
    const cart = await cartsRepo.getOne(req.session.cartId);

    for (let item of cart.items) {
        const product = await productsRepo.getOne(item.id);
        //take the product and assign it to the item object as it's property
        item.product = product;
    }
    res.send(cartShowTemplate({ items: cart.items }));

})

// receive a post request to delete an item from a cart
router.post('/cart/products/delete', async (req, res) => {
    const { itemId } = req.body;
    const cart = await cartsRepo.getOne(req.session.cartId);
    const items = cart.items.filter(item => {
        return item.id !== itemId;
    });
    await cartsRepo.update(req.session.cartId, { items });
    console.log(cart);
    res.redirect('/cart');
});

module.exports = router;