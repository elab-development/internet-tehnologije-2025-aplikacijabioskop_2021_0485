import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import MovieCard from "../Reusable/MovieCard.jsx";
import MovieCardContainer from "../Reusable/MovieCardContainer.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
function Movies() {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(10);
  const [maxPages, setMaxPages] = useState(1);
  const [dispMovies, setDispMovies] = useState([]);
  var cfgGetMovies = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/movies",
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN"),
    },
    data: {},
  };

  function setTable(startindex, endindex) {
    console.log("Start: " + startindex + " End: " + endindex + " Max: " + movies.length);
    setDispMovies(movies.slice(startindex, endindex));
  }

  function refreshMovies() {
    axios(cfgGetMovies)
      .then(function (response) {
        if (response.status === 200) {
          setMovies(response.data.movies);
          setMaxPages(response.data.movies.length / elementsPerPage);
          setDispMovies(response.data.movies.slice(0, elementsPerPage));
          console.log(response.data.movies);
          console.log(response.data.movies.slice(0, elementsPerPage));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function np() {
    if (page + 1 < maxPages) {
      setPage(page + 1);
      setTable(page * elementsPerPage, page * elementsPerPage + elementsPerPage);
    }
  }

  function pp() {
    if (page - 1 > 0) {
      setPage(page - 1);
      setTable(page * elementsPerPage, page * elementsPerPage + elementsPerPage);
    }
  }

  function gotopg(pg) {
    setPage(pg - 1);
    setTable((pg - 1) * elementsPerPage, (pg - 1) * elementsPerPage + elementsPerPage);
  }

  useEffect(() => {
    if (movies === null) {
      refreshMovies();
    }
  }, []);
  return (
    <div className="maincontent">
      <Header></Header>
      <br></br>
      <br></br>
      <h1 className="centeredheadline">Movies</h1>
      <MovieCardContainer cardData={dispMovies} />
      <Footer></Footer>
    </div>
  );
}

export default Movies;
