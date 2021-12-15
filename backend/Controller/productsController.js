import Product from "../Model/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      description,
      brand,
      category,
      countInStock,
      rating,
      numReviews,
    } = req.body;

    const data = await Product.create({
      name,
      price,
      image,
      description,
      brand,
      category,
      countInStock,
      rating,
      numReviews,
    });

    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find();

    if (req.params.key)
      products = products.filter(p => p.name.toLowerCase().startsWith(req.params.key.toLowerCase()))

    res.status(200).json({
      status: "success",
      count: products.length,
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      product,
    });

    next();
  } catch (err) {
    console.log(err);
  }
};

export const getTopProduct = async (req, res) => {
  try {
    let products = await Product.find({}).limit(3);

    // products = products.slice(0, 3);

    res.status(200).json({
      status: "success",
      products,
    });
  } catch (err) {
    console.log(err);
  }
};
