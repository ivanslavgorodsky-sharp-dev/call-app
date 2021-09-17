import { connect } from "react-redux";
import {
    getToken, getContacts, addContact,
    deleteContact, setErrorMsg, pay, getBalance, checkout } from "./services"; //component to make api call
import App from "./app";

const mapStateToProps = (state) => {
  return {
    name: state.name,
    email: state.email,
    id: state.id,
    token: state.token,
    contacts: state.contacts,
    balance : state.balance,
    lastError: state.lastError,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getToken: (id) => dispatch (getToken(id)),
    getContacts: (userId) => dispatch (getContacts(userId)),
    addContact: (userId, name, phone) => dispatch (addContact(userId, name, phone)),
    deleteContact: (id) => dispatch (deleteContact(id)),
    setError: (str) => dispatch (setErrorMsg(str)),
    pay: (userId, paymentMethodId) => dispatch ( pay(userId, paymentMethodId)),
    getBalance: (userId) => dispatch (getBalance(userId)),
    checkout: (userId) => dispatch (checkout(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
