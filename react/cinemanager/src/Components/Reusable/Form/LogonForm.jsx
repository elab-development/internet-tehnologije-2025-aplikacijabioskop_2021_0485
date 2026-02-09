import React from "react";
import { useState } from "react";
import "../../../style/logon.css";

function LogonForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    email_error: "",
    password_error: "",
  });

  function validate() {
    var temperrors = {
      email_error: "",
      password_error: "",
    };
    var valid = true;
    if (!formData.password.trim()) {
      temperrors.password_error = "* Password is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      temperrors.email_error = "* Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      temperrors.email_error = "* Email format is invalid";
      valid = false;
    }
    setValidationErrors({ ...temperrors });
    return valid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      console.log("frm submit");
    }
  }

  function handleInput(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="formcontainer">
      <form onSubmit={handleSubmit}>
        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="mail" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Email
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="email" type="email" className="form-control" id="mail" placeholder="E-mail" value={formData.email} onInput={handleInput} />
            <small id="emailHelp" className="form-text text-muted">
              Your registered e-mail.
            </small>
            {validationErrors.email_error && <small className="error d-block">{validationErrors.email_error}</small>}
          </div>
        </div>

        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="password" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Password
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="password" type="password" className="form-control" id="password" placeholder="Password" value={formData.password} onInput={handleInput} />
            {validationErrors.password_error && <small className="error d-block">{validationErrors.password_error}</small>}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <p className="">
              Don't have an account? <a href="/register">Sign up</a>
            </p>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-auto col-md-12">
            <input type="submit" className="btn btn-dark w-100 w-lg-auto" value="Log in" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LogonForm;
