export const SET_LOADING = 'SET_LOADING';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const SET_ERROR = 'SET_ERROR';
export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS';
export const RECEIVE_BALANCE = 'RECEIVE_BALANCE';

export function receiveToken(token) {
  return {
    type: RECEIVE_TOKEN,
    token
  }
}

export function setLoading(bool) {
  return {
    type: SET_LOADING,
    bool
  }
}

export function setError(str) {
  return {
    type: SET_ERROR,
    str
  }
}

export function receiveContacts(json) {
  return {
    type: RECEIVE_CONTACTS,
    json
  }
}

export function receiveBalance (number) {
  return {
    type: RECEIVE_BALANCE,
    number
  }
}
