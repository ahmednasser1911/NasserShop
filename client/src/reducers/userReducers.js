import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_SUCESS,
  USER_LIST_REQUEST,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  USER_DELETE_SUCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "../constents/userConstants.js";

export const userLoginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCESS:
      return { loading: false, userInfo: payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: payload };

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCESS:
      return { loading: false, userInfo: payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCESS:
      return { loading: false, user: payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state = { user: {} },
  { type, payload }
) => {
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCESS:
      return { loading: false, sucess: true, userInfo: payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
export const userListReducer = (state = { users: [] }, { type, payload }) => {
  switch (type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCESS:
      return { loading: false, users: payload };
    case USER_LIST_FAIL:
      return { loading: false, error: payload };

    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: payload };
    case USER_UPDATE_RESET:
      return { user: {} };

    default:
      return state;
  }
};
