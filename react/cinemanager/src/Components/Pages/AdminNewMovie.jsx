import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import MovieForm from "../Reusable/Form/MovieForm.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminNewMovie() {
  const navigate = useNavigate();
  var cfg_new_movie = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/newmovie",
    headers: { Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN") },
    data: {
      movietitle: "",
      moviedesc: "",
      moviepicture: "",
      moviegenre: "",
    },
  };

  function submitForm(data) {
    cfg_new_movie.data.movietitle = data.movietitle;
    cfg_new_movie.data.moviedesc = data.moviedesc;
    cfg_new_movie.data.moviegenre = data.moviegenre;
    cfg_new_movie.data.moviepicture = data.moviepicture;
    console.log(data);
    axios(cfg_new_movie)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Successfully created movie!");
          navigate("/adminnewmovie");
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
      <MovieForm onSubmit={submitForm}></MovieForm>
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default AdminNewMovie;
