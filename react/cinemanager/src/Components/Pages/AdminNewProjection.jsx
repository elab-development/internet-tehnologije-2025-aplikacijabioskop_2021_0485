import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectionForm from "../Reusable/Form/ProjectionForm.jsx";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

function AdminNewProjection() {
  const navigate = useNavigate();
  const [movieOpts, setMovieOpts] = useState(null);
  const [objectOpts, setObjectOpts] = useState(null);

  var cfg_new_proj = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/newprojection",
    headers: { Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN") },
    data: {},
  };

  var cfg_get_movieopts = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/movieopts",
    headers: { Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN") },
    data: {},
  };

  var cfg_get_objopts = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/objectopts",
    headers: { Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN") },
    data: {},
  };

  useEffect(() => {
    if (movieOpts === null) {
      axios(cfg_get_movieopts)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            setMovieOpts(response.data.movieopts);
          }
        })
        .catch(function (error) {
          console.log("Error: " + error.message);
          Swal.fire(error.message, "", "error");
        });
    }
    if (objectOpts === null) {
      axios(cfg_get_objopts)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            setObjectOpts(response.data.objopts);
          }
        })
        .catch(function (error) {
          console.log("Error: " + error.message);
          Swal.fire(error.message, "", "error");
        });
    }
  }, []);

  function submitForm(data) {
    cfg_new_proj.data = data;
    console.log(data);
    axios(cfg_new_proj)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Successfully created projection!");
          Swal.fire("Successfully created object!", "", "success");
          navigate("/adminnewproj");
        }
      })
      .catch(function (error) {
        console.log("Error: " + error.message);
        Swal.fire(error.message, "", "error");
      });
  }

  return (
    <div className="maincontent">
      <Header></Header>
      <br></br>
      <br></br>
      <ProjectionForm onSubmit={submitForm} movieOpts={movieOpts} objectOpts={objectOpts}></ProjectionForm>
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default AdminNewProjection;
