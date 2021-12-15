import express from "express";
import {
  addProductToWishlist,
  addProductToCart,
  removeProductFromCart,
  createUser,
  getAllUser,
  getUser,
} from "../Controller/userController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllUser);
router.route("/login").post(getUser);
router.route("/signup").post(createUser);
router.route("/addtowishlist").patch(protect, addProductToWishlist);
router.route("/addproducttocart").patch(protect, addProductToCart);
router.route("/removeproductfromcart").patch(protect, removeProductFromCart);


export default router;
