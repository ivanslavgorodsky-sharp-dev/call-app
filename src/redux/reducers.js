import { RECEIVE_TOKEN, SET_LOADING, SET_ERROR, RECEIVE_CONTACTS, RECEIVE_BALANCE } from './actions';

function reducer( state = {}, action) {

  //console.log("REDUCER", action);

  switch (action.type) {
    case SET_LOADING:
      return Object.assign({}, state, {
        isLoading: action.bool
      });

    case RECEIVE_BALANCE:
      return Object.assign({}, state, {
        balance: action.number
      });

    case SET_ERROR:
      return Object.assign({}, state, {
        lastError: action.str
      });
    
    case RECEIVE_CONTACTS:
      return Object.assign({}, state, {
        contacts: action.json
      });

    case RECEIVE_TOKEN:
      return Object.assign({}, state, {
        token: action.token
      });

    default:
      return state
  }
}

export default reducer;
