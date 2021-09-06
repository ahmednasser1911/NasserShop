import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUIST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUIST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUIST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_REQUIST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUIST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
} from "../constents/productConstents.js";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUIST });
    const { data } = await axios.get("http://localhost:5001/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.date.message
          ? error.response.date.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUIST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.date.message
          ? error.response.date.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUIST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUIST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUIST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
