import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { render } from 'react-dom';
import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

const Login = () => {
  const [formState, setFormState] = useState({email: "", password: "", isLoading: false, lastError: ""});

  const handleSubmit = (evt) => {    
    evt.preventDefault();
    setFormState({ ...formState, isLoading: true, lastError: "" });

    AxiosInstance
      .post ('login', { email: formState.email, password: formState.password })
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
    setFormState({
      ...formState,
      [evt.target.name]: evt.target.value,
    });
  };

  return (
      <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="form-group m-3">
              <label>Email address</label>
              <input name="email"
                type="email" className="form-control" placeholder="Enter email"
                value={formState.email} onChange={handleChange} required autoComplete="off" />
          </div>

          <div className="form-group m-3">
              <label>Password</label>
              <input name="password"
                type="password" className="form-control" placeholder="Enter password"
                value={formState.password} onChange={handleChange} required autoComplete="off" />
          </div>

          <div className="form-group m-3 d-flex justify-content-center align-items-center flex-column">
            <button type="submit" className="btn btn-primary w-100" disabled={formState.isLoading ? true : false}>Submit</button>
            <div className="pt-4">
              Don't have login? <a href="register">Register</a>
            </div>
          </div>
          <div className="form-group d-flex justify-content-center align-items-center flex-column">
              { formState.isLoading ? <span className="spinner-border"></span> : "" }
              { formState.lastError ? <span className="alert-warning">{formState.lastError}</span> : "" }
          </div>
      </form>
  );
}

render(
    <Login />,
    document.querySelector('#app')
  );
  