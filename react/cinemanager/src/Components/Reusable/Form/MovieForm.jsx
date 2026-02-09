import React from "react";
import { useState, useEffect } from "react";
import "../../../style/logon.css";

function MovieForm({ onSubmit, currentMovie }) {
  const [formData, setFormData] = useState({
    movietitle: "",
    moviegenre: "",
    moviedesc: "",
    moviepicture: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    movietitle_error: "",
    moviegenre_error: "",
    moviedesc_error: "",
  });
  useEffect(() => {
    if (currentMovie != null) {
      formData.movietitle = currentMovie.naziv;
      formData.moviegenre = currentMovie.zanr;
      formData.moviedesc = currentMovie.opis;
      formData.moviepicture = currentMovie.slika;
    }
  }, []);

  function validate() {
    var temperrors = {};
    var valid = true;
    if (!formData.movietitle.trim()) {
      temperrors.movietitle_error = "* Movie title is required";
      valid = false;
    }
    if (!formData.moviegenre.trim()) {
      temperrors.moviegenre_error = "* Movie genre is required";
      valid = false;
    }
    if (!formData.moviedesc.trim()) {
      temperrors.moviedesc_error = "* Movie description is required";
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
          <label htmlFor="movietitle" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Title
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="movietitle" type="text" className="form-control" id="movietitle" placeholder="Movie Title" value={formData.movietitle} onInput={handleInput} />
            <small id="movietitleHelp" className="form-text text-muted">
              Movie title.
            </small>
            {validationErrors.movietitle_error && <small className="error d-block">{validationErrors.movietitle_error}</small>}
          </div>
        </div>

        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="moviegenre" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Genre
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="moviegenre" type="text" className="form-control" id="moviegenre" placeholder="Movie Genre" value={formData.moviegenre} onInput={handleInput} />
            <small id="moviegenreHelp" className="form-text text-muted">
              Movie genre.
            </small>
            {validationErrors.moviegenre_error && <small className="error d-block">{validationErrors.moviegenre_error}</small>}
          </div>
        </div>
        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="moviepicture" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Picture
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="moviepicture" type="text" className="form-control" id="moviepicture" placeholder="Movie picture" value={formData.moviepicture} onInput={handleInput} />
            <small id="moviepictureHelp" className="form-text text-muted">
              Movie picture URL.
            </small>
          </div>
        </div>
        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="moviedesc" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Description
          </label>
          <div className="col-lg-9 col-md-12">
            <textarea name="moviedesc" type="textarea" className="form-control" id="opis" aria-describedby="opisHelp" placeholder="Movie description" value={formData.moviedesc} onChange={handleInput} rows="3"></textarea>
            <small id="moviedescHelp" className="form-text text-muted">
              Movie description.
            </small>
            {validationErrors.moviedesc_error && <small className="error d-block">{validationErrors.moviedesc_error}</small>}
          </div>
        </div>

        <div className="form-group row">
          <div className="col-lg-auto col-md-12 col-sm-auto">{currentMovie == null ? <input type="submit" className="btn btn-dark w-100 w-lg-auto" value="Create movie" /> : <input type="submit" className="btn btn-dark w-100 w-lg-auto" value="Update movie" />}</div>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
