import React from "react";
import { useState } from "react";
import "../../../style/logon.css";

function RegisterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repass: "",
    name: "",
    lastname: "",
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
    } else {
      if (!formData.repass.trim()) {
        temperrors.repass_error = "* Repeating the password is required";
        valid = false;
      } else if (formData.repass !== formData.password) {
        temperrors.repass_error = "* Passwords must match";
        valid = false;
      }
    }

    if (!formData.name.trim()) {
      temperrors.name_error = "* First name is required";
      valid = false;
    }
    if (!formData.lastname.trim()) {
      temperrors.lastname_error = "* Last name is required";
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
        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="repass" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Repeat password
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="repass" type="password" className="form-control" id="repass" placeholder="Repeat password" value={formData.repass} onInput={handleInput} />
            {validationErrors.repass_error && <small className="error d-block">{validationErrors.repass_error}</small>}
          </div>
        </div>
        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="name" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Name
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="name" type="name" className="form-control" id="name" placeholder="First name" value={formData.name} onInput={handleInput} />
            <small id="NameHelp" className="form-text text-muted">
              Your first name.
            </small>
            {validationErrors.name_error && <small className="error d-block">{validationErrors.name_error}</small>}
          </div>
        </div>

        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="lastname" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Last Name
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="lastname" type="lastname" className="form-control" id="lastname" placeholder="Last Name" value={formData.lastname} onInput={handleInput} />
            <small id="lastnameHelp" className="form-text text-muted">
              Your last name.
            </small>
            {validationErrors.lastname_error && <small className="error d-block">{validationErrors.lastname_error}</small>}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <p className="">
              Already have an account? <a href="/logon">Log on</a>
            </p>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-auto col-md-12 col-sm-auto">
            <input type="submit" className="btn btn-dark w-100 w-lg-auto" value="Sign up" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
