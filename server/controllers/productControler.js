import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (products.length === 0) throw new Error("No Products Added!");
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else {
      res.status(404);
      throw new Error("Product not found!");
    }
  } else {
    res.status(400);
    throw new Error("Not a valid id!");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product Removed" });
    } else {
      res.status(404);
      throw new Error("Product not found!");
    }
  } else {
    res.status(400);
    throw new Error("Not a valid id!");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.json(404);
    throw new Error("Product notFound");
  }
});
export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
