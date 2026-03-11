import React from "react";
import { useState, useEffect } from "react";
import "../../../style/logon.css";

function UserForm({ onSubmit, currentUser }) {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [allowupdate, setAllowupdate] = useState(false);
  useEffect(() => {
    if (currentUser != null) {
      setFormData(currentUser);
    }
  }, []);

  function validate() {
    var temperrors = {};
    var valid = true;
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
  const handleCheckbox = (e) => {
    setAllowupdate(e.target.checked);
    if (e.target.checked === false) {
      setFormData({
        ...formData,
        ["password"]: "",
      });
    }
  };
  return (
    <div className="formcontainer">
      <form onSubmit={handleSubmit}>
        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="email" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            E-mail
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="email" type="email" min={1} className="form-control" id="email" placeholder="" value={formData.email} onInput={handleInput} />
          </div>
        </div>
        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="name" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Name
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="name" type="text" min={1} className="form-control" id="name" placeholder="" value={formData.name} onInput={handleInput} />
          </div>
        </div>
        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="lastname" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Last name
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="lastname" type="text" min={1} className="form-control" id="lastname" placeholder="" value={formData.lastname} onInput={handleInput} />
          </div>
        </div>
        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="password" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Password
          </label>
          <div className="col-lg-9 col-md-12">
            <input disabled={!allowupdate} name="password" type="password" min={1} className="form-control" id="password" placeholder="" value={formData.password} onInput={handleInput} />
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" checked={allowupdate} onChange={handleCheckbox} id="flexCheckDefault" />
            <label className="form-check-label" for="flexCheckDefault">
              Update
            </label>
          </div>
        </div>
        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="rola" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Role
          </label>
          <div className="col-lg-9 col-md-12">
            <select id="rola" name="rola" className="form-select" onChange={handleInput} value={formData.rola}>
              <option value="0">User</option>
              <option value="1">Admin</option>
              <option value="2">Employee</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-auto col-md-12 col-sm-auto">
            <input type="submit" className="btn btn-dark w-100 w-lg-auto" value="Update profile" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
