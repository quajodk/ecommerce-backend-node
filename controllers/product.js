const Product = require('../models/product');

// @desc Add new product
// @route POST api/v1/products
// @access Private
exports.addProduct = async (req, res, next) => {
  try {
    const {name, details, images, tags} = req.body;
    const newProduct = new Product({
      name,
      details: {},
      images,
      tags,
    });

    newProduct.details.set('price', details.price);
    newProduct.details.set('desc', details.desc);
    newProduct.details.set('design', details.design);
    newProduct.details.set('stock', details.stock);

    await newProduct.save();

    return res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// @desc Update product
// @route PUT api/v1/products/:id
// @access Private
exports.editProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    // check for product
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'No product found',
      });
    }
    const updateData = Object.keys(req.body);
    console.log(updateData);

    if (updateData.includes('name')) {
      product.name = req.body.name;
    }

    if (updateData.includes('images')) {
      const newImgArray = [...product.images, ...req.body.images];
      product.images = [...newImgArray];
    }

    if (updateData.includes('tags')) {
      const newTagArray = [...product.tags, ...req.body.tags];
      product.images = [...newTagArray];
    }

    if (updateData.includes('details')) {
      const {price, desc, design, stock} = req.body.details;

      product.details.price = price
        ? product.details.set('price', price)
        : product.details.price;
      product.details.desc = desc
        ? product.details.set('desc', desc)
        : product.details.desc;
      product.details.design = design
        ? product.details.set('design', design)
        : product.details.design;
      product.details.stock = stock
        ? product.details.set('stock', stock)
        : product.details.stock;
    }

    product.updatedAt = Date.now();

    await Product.updateOne({_id: id}, product);

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
      error: 'Server Error',
    });
  }
};

// @desc Get all products
// @route GET api/v1/products
// @access Public
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
      error: 'Server Error',
    });
  }
};

// @desc Get product by id
// @route GET api/v1/products/:id
// @access Public
exports.getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
      error: 'Server Error',
    });
  }
};

// @desc Delete product
// @route DELETE api/v1/products/:id
// @access Private
exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'No product was found',
      });
    }

    await Product.deleteOne({_id: id});

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
      error: 'Server Error',
    });
  }
};
