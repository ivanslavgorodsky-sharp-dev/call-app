import { receiveToken, setLoading, setError, receiveContacts, receiveBalance } from '../redux/actions';
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 25000,
  headers: {'Content-Type': 'application/json'}
});

export function getToken(id) {
  return dispatch => {
    dispatch(setLoading(true));
    return AxiosInstance
      .post ('voice/token', { id })
      .then( response => {
          dispatch (receiveToken(response.data.result.token));
          dispatch (setLoading(false));
          return response.data.result.token;
      })
      .catch(err => {
        dispatch (setLoading(false));
        dispatch (setError(err.message));
      })
  }
}

export function getContacts(id) {
  return dispatch => {
    dispatch(setLoading(true));
    return AxiosInstance
      .get ('contacts?id=' + id)
      .then( response => {
          dispatch (receiveContacts(response.data.result));
          dispatch (setLoading(false));
          if (response.data.error) dispatch (setError(response.data.error));
          return response.data.result;
      })
      .catch(err => {
        dispatch (setLoading(false));
        dispatch (setError(err.message));
      })
  }
}

export function addContact (id, name, phone) {
  return dispatch => {
    dispatch(setLoading(true));
    return AxiosInstance
      .post ('contacts', {id, name, phone})
      .then( response => {
          dispatch (setLoading(false));
          if (response.data.error) dispatch (setError(response.data.error));
          return response.data.result;
      })
      .catch(err => {
        dispatch (setLoading(false));
        dispatch (setError(err.message));
      })
  }
}

export function deleteContact (id) {
  return dispatch => {
    dispatch(setLoading(true));
    return AxiosInstance
      .delete ('contacts?id=' + id)
      .then( response => {
          dispatch (setLoading(false));
          if (response.data.error) dispatch (setError(response.data.error));
          return response.data.result;
      })
      .catch(err => {
        dispatch (setLoading(false));
        dispatch (setError(err.message));
      })
  }
}

export function setErrorMsg(str) {
  return dispatch => {
    dispatch (setError(str));
  }
}

export function pay(userId, paymentMethodId) {
  return dispatch => {
    dispatch(setLoading(true));
    return AxiosInstance
      .post ('pay', {id: paymentMethodId, userId})
      .then( response => {
          dispatch (setLoading(false));
          if (response.data.error) dispatch (setError(response.data.error));
          return response.data.result;
      })
      .catch(err => {
        dispatch (setLoading(false));
        dispatch (setError(err.message));
      })
  }
}

export function getBalance(userId) {
  return dispatch => {
    dispatch(setLoading(true));
    return AxiosInstance
      .get ('balance?id='+userId)
      .then( response => {
          dispatch (setLoading(false));
          dispatch (receiveBalance (response.data.result));
          if (response.data.error) dispatch (setError(response.data.error));
          return response.data.result;
      })
      .catch(err => {
        dispatch (setLoading(false));
        dispatch (setError(err.message));
      })
  }
}

export function checkout (userId) {
    return dispatch => {
      dispatch(setLoading(true));
      return AxiosInstance
        .get ('checkout?id='+userId)
        .then( response => {
            dispatch (setLoading(false));
            if (response.data.error) dispatch (setError(response.data.error));
            return response.data.result;
        })
        .catch(err => {
          dispatch (setLoading(false));
          dispatch (setError(err.message));
        })
    }
}
