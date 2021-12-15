import axios from "axios";
import {
  ADD_PRODUCT_TO_WISHLIST_FAILED,
  ADD_PRODUCT_TO_WISHLIST_REQUEST,
  ADD_PRODUCT_TO_WISHLIST_SUCCESS,
  CREATE_USER_FAILED,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  USER_LOGOUT,
  ADD_PRODUCT_TO_CART_REQUEST,
  ADD_PRODUCT_TO_CART_SUCCESS,
  ADD_PRODUCT_TO_CART_FAILED,
  REMOVE_PRODUCT_FROM_CART_SUCCESS,
  REMOVE_PRODUCT_FROM_CART_REQUEST,
  REMOVE_PRODUCT_FROM_CART_FAILED,
} from "../constants";

export const getUserInfo = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const { data } = await axios.post("/api/users/login", { email, password });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GET_USER_FAILED,
      payload: error.response && error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT });
  } catch (error) {
    console.log(error);
  }
};

export const signupUser =
  (name, email, password, address) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_USER_REQUEST });

      let { data } = await axios.post("/api/users/signup", {
        name,
        email,
        password,
        address,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));

      dispatch({ type: CREATE_USER_SUCCESS, payload: data });
      dispatch({ type: GET_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAILED,
        payload: error.response && error.response.data.message,
      });
    }
  };

export const addProductToWishlist =
  (userId, productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_PRODUCT_TO_WISHLIST_REQUEST });

      const { authorizeUser } = getState();
      const { user } = authorizeUser;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.patch(
        "/api/users/addtowishlist",
        {
          userId,
          productId,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: GET_USER_SUCCESS, payload: data });
      dispatch({ type: ADD_PRODUCT_TO_WISHLIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_TO_WISHLIST_FAILED,
        payload: error.response && error.response.data.message,
      });
    }
  };

export const addProductToCart =
  (userId, productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_PRODUCT_TO_CART_REQUEST });

      const { authorizeUser } = getState();
      const { user } = authorizeUser;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.patch(
        "/api/users/addproducttocart",
        {
          userId,
          productId,
        },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: GET_USER_SUCCESS, payload: data });
      dispatch({ type: ADD_PRODUCT_TO_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_TO_CART_FAILED,
        payload: error.response && error.response.data.message,
      });
    }
  };

export const removeProduct =
  (userId, productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: REMOVE_PRODUCT_FROM_CART_REQUEST });

      const { authorizeUser } = getState();
      const { user } = authorizeUser;

      const updatedUser = user.cartItems.filter((p) => p._id !== productId);
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.patch(
        "/api/users/removeproductfromcart",
        {
          userId,
          productId,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: GET_USER_SUCCESS, payload: data });
      dispatch({ type: REMOVE_PRODUCT_FROM_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REMOVE_PRODUCT_FROM_CART_FAILED,
        payload: error.response && error.response.data.message,
      });
    }
  };
