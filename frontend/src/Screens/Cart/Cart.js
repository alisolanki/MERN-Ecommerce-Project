import "./Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./../../Components/spinner/spinner";
import { removeProduct } from "../../actions/userAction";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const authorizeUser = useSelector((state) => state.authorizeUser);
  const removeProductToCart = useSelector((state) => state.removeProductToCart);
  const { loading, user } = authorizeUser;
  const dispatch = useDispatch();
  let totalPrice = 0;

  const getTotalPrice = () => {
    let prices = user.cartItems.map((p) => p.price);
    totalPrice = prices.reduce((a, b) => a + b, 0);
    return totalPrice.toFixed(2);
  };

  const removeFromCart = (productId, price) => {
    totalPrice = totalPrice - price;
    dispatch(removeProduct(user._id, productId));
  };

  const handleCheckout = () => {
    const checkoutBtn = document.getElementById("checkout");
    checkoutBtn.textContent = "Processing...";

    const addStripe = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const session = await axios.get(`/api/checkout/${user._id}`, config);

      const stripePromise = loadStripe(
        "pk_test_51JYS4lSI7Mw1fgd2NZwHQynRq2HT8hxor6ZB3MlQkEPLSmSgCWwhx0HeXVBXKnFFj9KhGGZ3G3LqTk6ukp7r2ZS0008sJAiejl"
      );

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({
        sessionId: session.data.session.id,
      });
      emptyCart();
    };

    const emptyCart = async () => {
      user.cartItems.forEach((p) => {
        removeFromCart(p._id, p.price);
      });
    };
    addStripe();
  };

  return loading ? (
    <Spinner />
  ) : user && user.cartItems ? (
    <div className="cart">
      <div className="cart_items">
        {user.cartItems.map((product, i) =>
          removeProductToCart.loading ? (
            <Spinner />
          ) : (
            <div key={i} className="cart_item">
              <img
                src={require(`./../../../public${product.image}`).default}
                alt={product.name}
              />
              <div className="cart_item-details">
                <h3>{product.name}</h3>
                <h3>₹ {product.price}</h3>
              </div>
              <button
                className="btn"
                onClick={() => {
                  removeFromCart(product._id, product.price);
                }}
              >
                Remove
              </button>
            </div>
          )
        )}
      </div>
      <div className="cart_total">
        <h1 className="cart_total-title">Total</h1>
        <hr />
        {user.cartItems.map((item, i) => (
          <div key={i} className="cart_total-item">
            <h3 className="cart_total-item-name">{item.name}</h3>
            {/* <h3>{item.price}</h3> */}
            <h3 className="cart_total-item-price">{item.price}</h3>
          </div>
        ))}
        <hr />
        <div className="cart_total-item">
          <h3>Total Price</h3>
          <h3>₹{getTotalPrice()}</h3>
        </div>
        <hr />
        <button
          id="checkout"
          className="btn checkout-btn"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  ) : (
    <div className="noproduct">
      <p className="message">Your cart is empty.</p>
    </div>
  );
};

export default Cart;
