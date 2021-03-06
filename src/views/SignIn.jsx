import React, { useState, useContext } from "react";
import UserContext from "./../auth/UserContext";
import APIHandler from "./../api/handler";

export default function Signin(props) {
  const [formValues, setFormValues] = useState({
    email: "noha@you.com",
    password: "12345"
  });

  const userContext = useContext(UserContext);
  const { setCurrentUser } = userContext;

  const handleFormValues = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    // try {
    APIHandler.post("/signin", formValues)
      .then(res => {
        // console.log(res);
        setCurrentUser(res.data);
        const redirects = {
          ADMIN: "/admin-dashboard",
          DELIVERER: "/dashboard",
          CUSTOMER: "/menu"
        };
        props.history.push(redirects[res.data.role]);
      })
      .catch(err => console.log(err));
  };

  return (
    <div id="auth-container-signin" className="auth-container">
      <form
        className="form-signup"
        onChange={handleFormValues}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center">Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            defaultValue={formValues.email}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            defaultValue={formValues.password}
          />
        </div>

        <button
          id="btn-submit-signin"
          type="submit"
          className="btn btn-primary btn-block"
        >
          Submit
        </button>
        <p id="forgot-password" className="forgot-password text-right">
          Don't have an account yet <a href="/signUp">sign up ?</a>
        </p>
      </form>
    </div>
  );
}
