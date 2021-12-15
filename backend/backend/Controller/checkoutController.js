import Product from "../Model/productModel.js";
import Stripe from "stripe";
import User from "../Model/userModel.js";

const stripe = new Stripe(
  "sk_test_51JYS4lSI7Mw1fgd2NC1u1zuN8MoDJmJxXiXThXuOPO2fMyYy4LrQmF1nqii7QuiGgAbvhSvfyXSiid5mDfw4N3o7000bisgEcI"
);

const getProductsFromCart = (cartitems) => {
  return cartitems.map((p) => {
    return {
      name: p.name,
      description: p.description,
      amount: Math.round(p.price * 100),
      images: [`https://proshopreact.herokuapp.com${p.image}`],
      currency: "inr",
      quantity: 1,
    };
  });
};

export const getCheckoutSession = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).populate("cartItems");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${req.protocol}://${req.get("host")}/`,
      cancel_url: `${req.protocol}://${req.get("host")}/cart`,
      customer_email: user.email,
      client_reference_id: req.params.userId,
      line_items: getProductsFromCart(user.cartItems),
    });

    res.status(200).json({
      status: "success",
      session,
    });
  } catch (error) {
    console.log(error);
  }
};
