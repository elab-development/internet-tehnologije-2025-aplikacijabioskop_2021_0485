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
import dayjs from "dayjs";
import Swal from "sweetalert2";
function MyReservations() {
  const [reservations, setReservations] = useState(null);
  const [page, setPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(5);
  const [maxPages, setMaxPages] = useState(1);
  const [dispReservations, setDispReservations] = useState([]);
  const navigate = useNavigate();
  var cfgGetReservations = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/myreservations",
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN"),
    },
    data: {},
  };
  var cfgCancelReservation = {
    method: "delete",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/cancelreservation",
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN"),
    },
    data: {},
  };

  function setTable(startindex, endindex) {
    console.log("Start: " + startindex + " End: " + endindex + " Max: " + reservations.length);
    setDispReservations(reservations.slice(startindex, endindex));
  }

  function refreshReservations() {
    axios(cfgGetReservations)
      .then(function (response) {
        if (response.status === 200) {
          setReservations(response.data.res);
          var m = Math.ceil(response.data.res.length / elementsPerPage);
          setMaxPages(m);
          setDispReservations(response.data.res.slice(0, elementsPerPage));
        }
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire(error.message, "", "error");
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
    if (reservations === null) {
      refreshReservations();
    }
  }, []);

  function cancelreservation(i) {
    cfgCancelReservation.url = "http://127.0.0.1:8000/api/cancelreservation/" + reservations[i].id;
    axios(cfgCancelReservation)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          refreshReservations();
        }
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire(error.message, "", "error");
      });
  }

  return (
    <div className="maincontent">
      <Header></Header>
      <br></br>
      <br></br>
      <div className="tableview">
        {reservations === null ? (
          " "
        ) : (
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>Movie</th>
                <th>Number of people</th>
                <th>Venue</th>
                <th>Date</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {dispReservations.map((t, i) => (
                <tr key={i}>
                  <td>{t.projekcija.film.naziv}</td>
                  <td>{t.mesto}</td>
                  <td>{t.projekcija.objekat.naziv}</td>
                  <td>{dayjs(t.projekcija.datum).format("DD.MM.YYYY")}</td>
                  <td>
                    <button name={i} type="button" className="btn btn-danger btn-sm" onClick={() => cancelreservation(i)}>
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

export default MyReservations;
