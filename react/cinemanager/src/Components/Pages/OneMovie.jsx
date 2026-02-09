import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import "../../style/onemovie.css";
import MovieForm from "../Reusable/Form/MovieForm.jsx";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";

function OneMovie() {
  const navigate = useNavigate();
  const movieParams = useParams();
  const [movie, setMovie] = useState(null);
  var cfg_edit_movie = {
    method: "patch",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/editmovie",
    headers: { Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN") },
    data: {
      movie_id: "",
      movietitle: "",
      moviedesc: "",
      moviepicture: "",
      moviegenre: "",
    },
  };

  var cfg_get_movie = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/movies/" + movieParams.movie_id,
    headers: { Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN") },
    data: {},
  };
  useEffect(() => {
    if (movie === null) {
      axios(cfg_get_movie)
        .then(function (response) {
          if (response.status === 200) {
            setMovie(response.data.movie);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  function submitForm(data) {
    cfg_edit_movie.data = data;
    cfg_edit_movie.data.movie_id = movie.id;
    console.log(data);
    axios(cfg_edit_movie)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Successfully updated movie!");
          navigate("/admineditmovie/" + movieParams.movie_id);
        }
      })
      .catch(function (error) {
        console.log("Error: " + error.message);
      });
  }

  return (
    <div className="maincontent">
      <Header></Header>
      {movie != null ? (
        <div>
          <div class="container-fluid p-0">
            <img src={movie.slika} alt="Banner" class="img-fluid w-100 banner-img" />
          </div>

          <div class="container my-5 text-center">
            <h2>{movie.naziv}</h2>
            <br></br>
            <h5>Genre: {movie.zanr}</h5>

            <p class="lead">{movie.opis}</p>
          </div>
        </div>
      ) : (
        <p>Loading. . .</p>
      )}
      <NavLink to="/movies">
        <span>
          <FaArrowLeft />
        </span>
        &nbsp; Back
      </NavLink>
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default OneMovie;
