import {
  PRODUCT_LIST_REQUIST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUIST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DELETE_REQUIST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUIST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUIST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
} from "../constents/productConstents.js";

export const productListReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_LIST_REQUIST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_DETAIL_REQUIST:
      return { loading: true, ...state };
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (
  state = { product: { reviews: [] } },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_DELETE_REQUIST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REQUIST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productUpdateReducer = (
  state = { product: {} },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_UPDATE_REQUIST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };

    default:
      return state;
  }
};
