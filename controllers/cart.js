const Cart = require('../models/cart');
const Product = require('../models/product');

// @desc Add items to cart
// @route POST api/v1/me/cart?item
// @access Public
exports.addItems = async (req, res, next) => {
    try {
        const item = req.query.item;

        const itemsArray = [];
        itemsArray.push(item);
        const total = itemsArray.length !== 0 ? itemsArray.map(value => await Product.findById(value)).reduce((acc, cur) => acc + Number(cur.details.price), 0) : 0;

        const cartItem = await Cart.create({
            user: req.body.userId,
            items: [...itemsArray],
            total,
            dateAdded: Date.now()
        });

        res.status(201).json({
            success: true,
            data: cartItem,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
            error: 'Server error'
        });
    }
}

// @desc Remove items from cart
// @route PUT api/v1/me/cart/:id
// @access Private
exports.removeItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const cart = await Cart.findById(id);

        if (!cart) {
           res.status(404).json({
                success: false,
                error: 'No cart was found'
            });  
        }
        
        const remainCartItem = cart.items.filter(item => item !== req.body.productId);
        const product = await Product.findOne({ _id: req.body.productId });
        const newTotal = cart.total - product.details.price;
        // update cart
        const newCart = await Cart.updateOne({ _id: id }, {
            $set: {
                items: [...remainCartItem],
                total: newTotal,
            }
        });

        res.status(200).json({
            success: true,
            data: newCart,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
            error: 'Server error',
        });
    }
}

// @desc Checkout cart
// @route PUT api/v1/checkout/:id
// access Private
exports.checkout = async (req, res, next) => {
    try {
        const id = req.params.id;
        const cart = await Cart.findById(id);

        if (!cart) {
            res.status(404).json({
                success: false,
                error: 'No cart found'
            });
        }

        const checkoutCart = await Cart.updateOne({ _id: id }, {
            $set: {
                checkout: true,
                checkoutDate: Date.now(),
            }
        });

        res.status(200).json({
            success: true,
            data: checkoutCart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
            error: 'Server error'
        });
    }
}

// @desc Clear cart
// @route DELETE api/v1/cart/:id
// @access Private
exports.clearCart = async (req, res, next) => {
    try {
        const id = req.params.id;
        // check for cart
        const cartExist = await Cart.findById(id);
        if (!cartExist) {
            res.status(404).json({
                success: false,
                error: 'No cart found'
            });
        }

        await Cart.deleteOne({ _id: id });

        res.status(200).json({
            success: true,
            data: {},
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
            error: 'Server error'
        });
    }
}