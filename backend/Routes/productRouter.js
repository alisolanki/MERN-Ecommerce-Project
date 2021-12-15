import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  getTopProduct,
} from "../Controller/productsController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createProduct);
router.route("/").get(getAllProducts);
router.route("/topthree").get(getTopProduct);
router.route("/:id").get(getProduct);
router.route("/search/:key").get(getAllProducts);

export default router;
