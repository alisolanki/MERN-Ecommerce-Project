import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import getJsonWebToken from "../utils/getJsonWebToken.js";

export const createUser = async (req, res) => {
  try {
    const { name, password, email, address } = req.body;

    const data = await User.create({
      name,
      email,
      password,
      address,
    });

    res.status(200).json({
      _id: data._id,
      name: data.name,
      email: data.email,
      address: data.address,
      wishList: data.wishList,
      cartItems: data.cartItems,
      token: getJsonWebToken(data._id),
    });
  } catch (err) {
    if (err.code === 11000) {
      res.json({
        message: "Email already registered",
      });
    } else {
      res.json({
        message: "Something went wrong.",
      });
    }
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().populate("wishList");

    res.status(200).json({
      status: "success",
      count: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await User.find({ email })
      .populate("wishList")
      .populate("cartItems");

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          wishList: user.wishList,
          cartItems: user.cartItems,
          token: getJsonWebToken(user._id),
        });
      } else {
        res.status(401).json({
          message: "Email or password invalid",
        });
      }
    } else {
      res.status(401).json({
        message: "User does not exist.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const addProductToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    const isProductExist = user.wishList.includes(productId);
    if (user && !isProductExist) {
      user.wishList.push(productId);

      const updatedUser = await user
        .save()
        .then((u) => u.populate("wishList"))
        .then((u) => u.populate("cartItems"));

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        wishList: updatedUser.wishList,
        cartItems: updatedUser.cartItems,
        token: getJsonWebToken(updatedUser._id),
      });
    } else
      res
        .status(401)
        .json({ message: "Product already exisit in the wishlist" });
  } catch (err) {
    console.log(err);
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    if (user) {
      user.cartItems.push(productId);
      const updatedUser = await user
        .save()
        .then((u) => u.populate("cartItems"))
        .then((u) => u.populate("wishList"));

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        wishList: updatedUser.wishList,
        cartItems: updatedUser.cartItems,
        token: getJsonWebToken(updatedUser._id),
      });
    } else {
      res.status(401).json({ message: "User is not logged in." });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    if (user) {
      const index = user.cartItems.indexOf(productId);
      if (index > -1) {
        user.cartItems.splice(index, 1);
        const updatedUser = await user
          .save()
          .then((u) => u.populate("cartItems"))
          .then((u) => u.populate("wishList"));

        res.status(200).json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          address: updatedUser.address,
          wishList: updatedUser.wishList,
          cartItems: updatedUser.cartItems,
          token: getJsonWebToken(updatedUser._id),
        });
      } else {
        res.status(401).json({ message: "Product is not in cart" });
      }
    } else {
      res.status(401).json({ message: "User is not logged in." });
    }
  } catch (error) {
    console.log(error);
  }
};
