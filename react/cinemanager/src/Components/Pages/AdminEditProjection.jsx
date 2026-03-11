import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProjectionForm from "../Reusable/Form/ProjectionForm.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function AdminEditProjection() {
  const navigate = useNavigate();
  const [movieOpts, setMovieOpts] = useState(null);
  const [objectOpts, setObjectOpts] = useState(null);
  const projParams = useParams();
  const [proj, setProj] = useState(null);
  var cfg_edit_proj = {
    method: "patch",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/editprojection",
    headers: { Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN") },
    data: {},
  };

  var cfg_get_proj = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/projections/" + projParams.id,
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
    if (proj === null) {
      axios(cfg_get_proj)
        .then(function (response) {
          if (response.status === 200) {
            setProj(response.data.projection);
          }
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire(error.message, "", "error");
        });
    }
  }, []);

  function submitForm(data) {
    cfg_edit_proj.data = data;
    cfg_edit_proj.data.proj_id = proj.id;
    console.log(data);
    axios(cfg_edit_proj)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Successfully updated object!");
          Swal.fire("Successfully updated object!", "", "success");
          navigate("/admineditproj/" + projParams.id);
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
      <ProjectionForm onSubmit={submitForm} currentProjection={proj} movieOpts={movieOpts} objectOpts={objectOpts}></ProjectionForm>
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default AdminEditProjection;
