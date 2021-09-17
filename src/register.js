import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { render } from 'react-dom';
import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

const Register = () => {
  const [formState, setFormState] = useState({name: "", email: "", password1: "", password2: "", lastError: "", isLoading: false});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setFormState({ ...formState, isLoading: true, lastError: "" });

    if (formState.password1 !== formState.password2) {
      setFormState({
        ...formState,
        lastError: "Passwords don't match" 
      });
      return
    }

    AxiosInstance
      .post ('register', { name: formState.name, email: formState.email, password: formState.password1 })
      .then( response => {
        console.log(response.data.result);
        setFormState({ ...formState, isLoading: false, lastError: response.data.error });

        if (response.data.error === "") {
            localStorage.setItem("name", response.data.result.name);
            localStorage.setItem("email", response.data.result.email);
            localStorage.setItem("id", response.data.result.id);
            window.location = "/";
        }
      })
      .catch(err => {
        console.log(err);
        setFormState({ ...formState, isLoading: false, lastError: err });
      });
  }

  const handleChange = (evt) => {
    const state = {
      ...formState,
      lastError: "",
      [evt.target.name]: evt.target.value,
    }
    setFormState(state);
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="form-group m-3">
            <label>Your name</label>
            <input
              type="text" className="form-control" placeholder="Enter your name" name="name"
              value={formState.name} onChange={handleChange} required autoComplete="off" />
        </div>
        <div className="form-group m-3">
            <label>Email address</label>
            <input
              type="email" className="form-control" placeholder="Enter email" name="email"
              value={formState.email} onChange={handleChange} required autoComplete="off" />
        </div>

        <div className="form-group m-3">
            <label>Password</label>
            <input
              type="password" className="form-control" placeholder="Enter password" name="password1"
              value={formState.password1} onChange={handleChange} required autoComplete="off" />
        </div>

        <div className="form-group m-3">
            <label>Password Match</label>
            <input
              type="password" className="form-control" placeholder="Enter password again" name="password2"
              value={formState.password2} onChange={handleChange} required autoComplete="off" />
        </div>
        <div className="form-group m-3 d-flex justify-content-center align-items-center flex-column">
          <button type="submit" className="btn btn-primary w-100" disabled={formState.isLoading ? true : false}>Sign Up</button>
          <div className="pt-4">
            Already registered? <a href="login">Sign in</a>
          </div>
        </div>
        <div className="form-group d-flex justify-content-center align-items-center flex-column">
              { formState.isLoading ? <span className="spinner-border"></span> : "" }
              { formState.lastError ? <span className="alert-warning">{formState.lastError}</span> : "" }
          </div>
    </form>
  )
}

render(
    <Register />,
    document.querySelector('#app')
  );
  
