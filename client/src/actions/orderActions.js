import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  OREDER_CREATE_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  OREDER_DETAILS_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  OREDER_PAY_REQUEST,
  OREDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  OREDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  OREDER_DELEVER_REQUEST,
  ORDER_DELEVER_SUCCESS,
  ORDER_DELEVER_FAIL,
} from "./../constents/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: OREDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:5001/api/orders",
      order,
      config
    );
    console.log(data.order._id);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: OREDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5001/api/orders/${orderId}`,
      config
    );
    console.log(data);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: OREDER_PAY_REQUEST });

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
        `http://localhost:5001/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: OREDER_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`api/orders/myorders`, config);
    console.log(data);

    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: OREDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: OREDER_DELEVER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5001/api/orders/${order._id}/delever`,
      {},
      config
    );

    dispatch({ type: ORDER_DELEVER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: ORDER_DELEVER_FAIL,
      payload: error.response.data.message,
    });
  }
};
