const mongoose = require("mongoose");
const productModel = require("../models/product.model");
const {uploadMultipleImages} = require("../middlewares/upload.multiple.image");
const Product = productModel.Product;

const getAll = async (req, res) => {
    const product = await Product.find().exec();
    return res.status(200).json(product);
};
const getAllApproved = async (req, res) => {
    const product = await Product.find({isApproved: true}).sort({price: 1}).exec();
    return res.status(200).json(product);
};
const getProduct = async (req, res) => {
    Product.findById(req.body, (error, product) => {
        if (error) return res.status(error.code).json(error); else return res.status(200).json(product);
    });
};
const deleteProduct = (req, res) => {
    Product.remove({_id: req.body.id}, (error, result) => {
        if (error) return res.status(error.code).json(error); else return res.status(200).json(result);
    });
};
const updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.body.id, req.body, (error, result) => {
        if (error) return res.status(error.code).json(error); else return res.status(200).json(result);
    });
};
const createProduct = (req, res) => {
    const product = new Product(req.body);
    product._id = new mongoose.Types.ObjectId();
    uploadMultipleImages(req, res).forEach((file) => {
        console.log(file);
        product.images.push(file.destination + file.filename);
    });
    product.save().then((data) => {
        return res.status(201).json(data);
    }).catch((error) => {
        return res.status(500).json(error);
    });
}
module.exports = {getAll, getAllApproved, getProduct, deleteProduct, updateProduct, createProduct}