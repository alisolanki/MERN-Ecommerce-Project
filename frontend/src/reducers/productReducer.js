import {
  GET_PRODUCT_FAILED,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_TOPTHREE_REQUEST,
  GET_TOPTHREE_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { products: action.payload, loading: false };
    case PRODUCT_LIST_FAILED:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};

export const productListTopThreeReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case GET_TOPTHREE_REQUEST:
      return { loading: true };
    case GET_TOPTHREE_SUCCESS:
      return { products: action.payload, loading: false };
    case GET_PRODUCT_FAILED:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return { product: {}, loading: true };
    case GET_PRODUCT_SUCCESS:
      return { product: action.payload, loading: false };
    case GET_PRODUCT_FAILED:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};
