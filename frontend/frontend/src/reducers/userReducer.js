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
  REMOVE_PRODUCT_FROM_CART_REQUEST,
  REMOVE_PRODUCT_FROM_CART_SUCCESS,
  REMOVE_PRODUCT_FROM_CART_FAILED,
} from "../constants";

export const authorizeUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { loading: true };
    case GET_USER_SUCCESS:
      return { user: action.payload, loading: false };
    case GET_USER_FAILED:
      return { error: action.payload, loading: false };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const signupUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { loading: true };
    case CREATE_USER_SUCCESS:
      return { user: action.payload, loading: false };
    case CREATE_USER_FAILED:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};

export const addProductToWishListReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_WISHLIST_REQUEST:
      return { loading: true };
    case ADD_PRODUCT_TO_WISHLIST_SUCCESS:
      return { loading: false, user: action.payload };
    case ADD_PRODUCT_TO_WISHLIST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addProductToCartReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART_REQUEST:
      return { loading: true };
    case ADD_PRODUCT_TO_CART_SUCCESS:
      return { loading: false, payload: action.payload };
    case ADD_PRODUCT_TO_CART_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const removeProductToCartReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT_FROM_CART_REQUEST:
      return { loading: true };
    case REMOVE_PRODUCT_FROM_CART_SUCCESS:
      return { loading: false, payload: action.payload };
    case REMOVE_PRODUCT_FROM_CART_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}