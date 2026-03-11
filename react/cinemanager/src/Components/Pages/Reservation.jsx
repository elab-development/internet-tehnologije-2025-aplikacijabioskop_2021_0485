import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import MovieForm from "../Reusable/Form/MovieForm.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
function Reservation() {
  const navigate = useNavigate();
  const projParams = useParams();
  const [mesto, setMesto] = useState(1);
  var cfg_reserve = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/newreservation/",
    headers: { Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN") },
    data: {
      projekcija: projParams.id,
      mesto: 1,
    },
  };
  function submitForm(e) {
    e.preventDefault();
    cfg_reserve.data.mesto = mesto;
    axios(cfg_reserve)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Successfully reserved!");
          Swal.fire("Successfully reserved!", "", "success");
          navigate("/myreservations");
        }
      })
      .catch(function (error) {
        console.log("Error: " + error.message);
        Swal.fire(error.message, "", "error");
      });
  }

  function handleInput(e) {
    setMesto(e.target.value);
  }

  return (
    <div className="maincontent">
      <Header></Header>
      <br></br>
      <br></br>

      <form onSubmit={submitForm}>
        <div className="form-group row mb-3 align-items-top">
          <label htmlFor="mesto" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
            Number of people
          </label>
          <div className="col-lg-9 col-md-12">
            <input name="mesto" type="number" min={1} className="form-control" id="mesto" placeholder="" value={mesto} onInput={handleInput} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-auto col-md-12 col-sm-auto">
            <input type="submit" className="btn btn-dark w-100 w-lg-auto" value="Reserve" />
          </div>
        </div>
      </form>
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default Reservation;
