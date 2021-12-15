import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { getCheckoutSession } from "../Controller/checkoutController.js";

const router = express.Router();

router.route("/:userId").get(protect, getCheckoutSession);


export default router;
