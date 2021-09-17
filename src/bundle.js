import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/wrapper';

const initialStore = {
  name: localStorage.getItem("name") || "Unknown",
  email: localStorage.getItem("email") || "Unknown",
  id: localStorage.getItem("id") || "Unknown",
  token: localStorage.getItem("token") || "",
  contacts: JSON.parse(localStorage.getItem("contacts")) || [],
  balance: localStorage.getItem("balance") || 0,
  lastError: "",
  isLoading: false,
};

const store = configureStore(initialStore);
render(
  <Provider store={store} > <App /> </Provider>,
  document.querySelector('#app')
);
