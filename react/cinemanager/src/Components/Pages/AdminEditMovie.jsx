import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import MovieForm from "../Reusable/Form/MovieForm.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function AdminEditMovie() {
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
      <br></br>
      <br></br>
      {movie != null ? <MovieForm onSubmit={submitForm} currentMovie={movie}></MovieForm> : <></>}
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default AdminEditMovie;
