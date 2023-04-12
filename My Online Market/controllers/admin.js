const productModel = require('../models/product');
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');


exports.getAddProduct = (req, res, next) => {

    console.log('getAddProduct');

    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
      });

};

exports.postAddProduct = async (req, res, next) => {
    
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

    // console.log(req.user);

    const newProduct = new productModel({
        title: title,
        price: price,
        description: description,
        userId: req.user._id,
    });

    console.log('postAddProduct');

    try{
        const resp = await newProduct.save();
        console.log('saved');
        res.redirect('/admin/products');
    }
    catch(e){
        console.log(e);
    }
};

exports.getAllProducts = async (req, res, next) => {
    
    try {
        const products = await productModel.find();
        res.render('admin/products',{
            path: '/admin/products',
            prods: products,
            pageTitle: 'Admin Products',
        });
    }
    catch(e){
        console.log(e);
    }
};

async function findProductById(prodId) {

    var product;

    try{
        product = await productModel.findById(prodId);
        // console.log(product);
        return product;
    }
    catch(e){
        console.log(e);
    }

    return product;
};

exports.getEditProduct = async (req, res, next) => {

    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;

    const product = await findProductById(prodId);

    res.render('admin/edit-product',{
        editing: editMode,
        path: '/admin/edit-product',
        pageTitle: 'Edit Product',
        product: product,
    });

    // try{
    //     const product = await productModel.findById(prodId);

    //     if(!product){
    //         return res.redirect('/');
    //     }

    //     console.log(product);

    //     res.render('admin/edit-product',{
    //         editing: editMode,
    //         path: '/admin/edit-product',
    //         pageTitle: 'Edit Product',
    //         product: product,
    //     });
    // }
    // catch(e){
    //     console.log(e);
    // }
};

exports.postEditProduct = async (req, res, next) => {

    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const prodId = req.body.productId;

    const product = await findProductById(prodId);

    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDescription;

    try{
        var resp = await product.save();
        console.log('Product Updated');
        res.redirect('/admin/products');
    }
    catch(e){
        console.log(e);
    }


    // try{
    //     const product = await productModel.findById(prodId);

    //     product.title = updatedTitle;
    //     product.price = updatedPrice;
    //     product.description = updatedDescription;

    //     var resp = await product.save();
    //     console.log('Product Updated');
    // }
    // catch(e){
    //     console.log(e);
    // }

};

exports.deleteProduct = async (req, res, next) => {
    
    const prodId = req.body.productId;

    try{
        var resp = await productModel.findByIdAndDelete(prodId);
        console.log('Deleted Product');
        res.redirect('/admin/products');
    }
    catch(e){
        console.log(e);
    }

};