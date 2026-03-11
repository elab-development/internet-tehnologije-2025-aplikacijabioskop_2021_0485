import React, { useState, useEffect } from "react";
import "../../../style/logon.css";
import dayjs from "dayjs";
import { DatePicker, TimePicker } from "antd";

function ProjectionForm({ onSubmit, currentProjection, movieOpts, objectOpts }) {
  const [formData, setFormData] = useState({
    vreme_pocetka: "",
    vreme_kraja: "",
    datum: "",
    film: movieOpts?.[0]?.id || "",
    objekat: objectOpts?.[0]?.id || "",
  });

  const [validationErrors, setValidationErrors] = useState({
    vreme_pocetka_error: "",
    vreme_kraja_error: "",
    datum_error: "",
    film_error: "",
    objekat_error: "",
  });

  useEffect(() => {
    if (currentProjection) {
      setFormData({
        vreme_pocetka: currentProjection.vreme_pocetka,
        vreme_kraja: currentProjection.vreme_kraja,
        datum: currentProjection.datum,
        film: String(currentProjection.film.id),
        objekat: String(currentProjection.objekat.id),
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        film: movieOpts?.[0]?.id || "",
        objekat: objectOpts?.[0]?.id || "",
      }));
    }
  }, [currentProjection, movieOpts, objectOpts]);

  function validate() {
    const temperrors = {};
    let valid = true;
    setValidationErrors({ ...temperrors });
    return valid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      console.log("Form submitted:", formData);
    }
  }

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleIntervalInput(times) {
    if (!times) {
      setFormData((prev) => ({
        ...prev,
        vreme_pocetka: "",
        vreme_kraja: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        vreme_pocetka: times[0].format("YYYY-MM-DD HH:mm:ss"),
        vreme_kraja: times[1].format("YYYY-MM-DD HH:mm:ss"),
      }));
    }
  }

  function handleDateInput(date) {
    setFormData((prev) => ({
      ...prev,
      datum: date ? date.format("YYYY-MM-DD") : "",
    }));
  }

  return (
    <div className="formcontainer">
      <form onSubmit={handleSubmit}>
        <div className="form-group row mb-3 align-items-top">
          <label className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">Duration</label>
          <div className="col-lg-9 col-md-12">
            <TimePicker.RangePicker value={[formData.vreme_pocetka ? dayjs(formData.vreme_pocetka) : null, formData.vreme_kraja ? dayjs(formData.vreme_kraja) : null]} onChange={handleIntervalInput} format="HH:mm" />
            <small className="form-text text-muted">Movie duration.</small>
          </div>
        </div>

        <div className="form-group row mb-3 align-items-top">
          <label className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">Date</label>
          <div className="col-lg-9 col-md-12">
            <DatePicker value={formData.datum ? dayjs(formData.datum) : null} onChange={handleDateInput} />
          </div>
        </div>

        <div className="form-group row mb-3 align-items-top">
          <label className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">Object</label>
          <div className="col-lg-9 col-md-12">
            <select name="objekat" className="form-select" value={formData.objekat} onChange={handleInput}>
              {objectOpts?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.naziv}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group row mb-3 align-items-top">
          <label className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">Movie</label>
          <div className="col-lg-9 col-md-12">
            <select name="film" className="form-select" value={formData.film} onChange={handleInput}>
              {movieOpts?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.naziv}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-auto col-md-12 col-sm-auto">
            <input type="submit" className="btn btn-dark w-100 w-lg-auto" value={currentProjection ? "Update projection" : "Create projection"} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProjectionForm;
