import React from "react";
import { useState, useEffect } from "react";
import "../../../style/logon.css";

function ObjectForm({ onSubmit, currentObject }) {
  const [formData, setFormData] = useState({
    naziv: "",
    adresa: "",
    kapacitet: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    naziv_error: "",
    adresa_error: "",
    kapacitet_error: "",
  });
  useEffect(() => {
    if (currentObject != null) {
      formData.naziv = currentObject.naziv;
      formData.adresa = currentObject.adresa;
      formData.kapacitet = currentObject.kapacitet;
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

  return (
    <div className="formcontainer">
      <form onSubmit={handleSubmit}>
        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="naziv" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Object name
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="naziv" type="text" className="form-control" id="naziv" placeholder="" value={formData.naziv} onInput={handleInput} />
            {validationErrors.naziv_error && <small className="error d-block">{validationErrors.naziv_error}</small>}
          </div>
        </div>

        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="adresa" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Address
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="adresa" type="text" className="form-control" id="adresa" placeholder="" value={formData.adresa} onInput={handleInput} />
            {validationErrors.adresa_error && <small className="error d-block">{validationErrors.adresa_error}</small>}
          </div>
        </div>

        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="kapacitet" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Capacity
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="kapacitet" type="number" min={0} className="form-control" id="kapacitet" placeholder="" value={formData.kapacitet} onInput={handleInput} />
            {validationErrors.kapacitet_error && <small className="error d-block">{validationErrors.kapacitet_error}</small>}
          </div>
        </div>

        <div className="form-group row">
          <div className="col-lg-auto col-md-12 col-sm-auto">{currentObject == null ? <input type="submit" className="btn btn-dark w-100 w-lg-auto" value="Create object" /> : <input type="submit" className="btn btn-dark w-100 w-lg-auto" value="Update object" />}</div>
        </div>
      </form>
    </div>
  );
}

export default ObjectForm;
