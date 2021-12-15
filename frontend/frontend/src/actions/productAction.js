import axios from "axios";
import {
  GET_PRODUCT_FAILED,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_TOPTHREE_FAILED,
  GET_TOPTHREE_REQUEST,
  GET_TOPTHREE_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");
    const { products } = data;

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      payload: error.response && error.response.data.message,
    });
  }
};

export const searchProducts = (search) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`/api/products/search/${search}`);
    const { products } = data;

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      payload: error.response && error.response.data.message,
    });
  }
};

export const listTopThree = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TOPTHREE_REQUEST });

    const { data } = await axios.get("/api/products/topthree");
    const { products } = data;

    dispatch({ type: GET_TOPTHREE_SUCCESS, payload: products });
  } catch (error) {
    dispatch({
      type: GET_TOPTHREE_FAILED,
      payload: error.response && error.response.data.message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    const { product } = data;
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: product });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAILED,
      payload: error.response && error.response.data.message,
    });
  }
};
