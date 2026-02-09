import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import MovieForm from "../Reusable/Form/MovieForm.jsx";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Paginator from "../Reusable/Paginator.jsx";
import { MdDelete } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function AdminMovieList() {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(5);
  const [maxPages, setMaxPages] = useState(1);
  const [dispMovies, setDispMovies] = useState([]);
  const navigate = useNavigate();
  var cfgGetMovies = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/movies",
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN"),
    },
    data: {},
  };
  var cfgDelMovie = {
    method: "delete",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/deletemovie",
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
          var m = Math.ceil(response.data.movies.length / elementsPerPage);
          setMaxPages(m);
          setDispMovies(response.data.movies.slice(0, elementsPerPage));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function np() {
    console.log(page + " " + maxPages);
    if (page + 1 <= maxPages) {
      var p = page + 1;
      console.log(page + 1);
      setPage(p);
      setTable((p - 1) * elementsPerPage, (p - 1) * elementsPerPage + elementsPerPage);
    }
  }

  function pp() {
    console.log(page - 1);
    if (page - 1 > 0) {
      var p = page - 1;
      setPage(p);
      setTable((p - 1) * elementsPerPage, (p - 1) * elementsPerPage + elementsPerPage);
    }
  }

  function gotopg(pg) {
    setPage(pg);
    setTable((pg - 1) * elementsPerPage, (pg - 1) * elementsPerPage + elementsPerPage);
  }

  useEffect(() => {
    if (movies === null) {
      refreshMovies();
    }
  }, []);

  function editmovie(i) {
    navigate("/admineditmovie/" + movies[i].id);
  }

  function deletemovie(i) {
    cfgDelMovie.url = cfgDelMovie.url + "/" + movies[i].id;
    axios(cfgDelMovie)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          refreshMovies();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="maincontent">
      <Header></Header>
      <br></br>
      <br></br>
      <div className="tableview">
        {movies === null ? (
          " "
        ) : (
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Description</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {dispMovies.map((t, i) => (
                <tr key={i}>
                  <td>#{t.id}</td>
                  <td>{t.naziv}</td>
                  <td>{t.zanr}</td>
                  <td>{t.opis}</td>
                  <td>
                    <button name={i} type="button" className="btn btn-primary btn-sm" onClick={() => editmovie(i)}>
                      <GoPencil />
                    </button>
                  </td>
                  <td>
                    <button name={i} type="button" className="btn btn-danger btn-sm" onClick={() => deletemovie(i)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Paginator onChange={gotopg} onPrevious={pp} onNext={np} pageCount={maxPages} active={page}></Paginator>
      </div>
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default AdminMovieList;
