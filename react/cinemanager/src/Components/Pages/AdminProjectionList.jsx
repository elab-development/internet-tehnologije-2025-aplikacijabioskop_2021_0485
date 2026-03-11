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
function AdminProjectionList() {
  const [projs, setProjs] = useState(null);
  const [page, setPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(5);
  const [maxPages, setMaxPages] = useState(1);
  const [dispProjs, setDispProjs] = useState([]);
  const navigate = useNavigate();
  var cfgGetProjs = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/projections",
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN"),
    },
    data: {},
  };
  var cfgDelProjs = {
    method: "delete",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/deleteprojection",
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN"),
    },
    data: {},
  };

  function setTable(startindex, endindex) {
    console.log("Start: " + startindex + " End: " + endindex + " Max: " + projs.length);
    setDispProjs(projs.slice(startindex, endindex));
  }

  function refreshobjects() {
    axios(cfgGetProjs)
      .then(function (response) {
        if (response.status === 200) {
          setProjs(response.data.projs);
          var m = Math.ceil(response.data.projs.length / elementsPerPage);
          setMaxPages(m);
          setDispProjs(response.data.projs.slice(0, elementsPerPage));
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
    if (projs === null) {
      refreshobjects();
    }
  }, []);

  function editobject(i) {
    navigate("/admineditproj/" + projs[i].id);
  }

  function deleteobject(i) {
    cfgDelProjs.url = cfgDelProjs.url + "/" + projs[i].id;
    axios(cfgDelProjs)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          refreshobjects();
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
        {projs === null ? (
          " "
        ) : (
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Object</th>
                <th>Movie</th>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {dispProjs.map((t, i) => (
                <tr key={i}>
                  <td>#{t.id}</td>
                  <td>{t.objekat.naziv}</td>
                  <td>{t.film.naziv}</td>
                  <td>{dayjs(t.datum).format("DD.MM.YYYY")}</td>
                  <td>{dayjs(t.vreme_pocetka).format("HH:mm")}</td>
                  <td>{dayjs(t.vreme_kraja).format("HH:mm")}</td>
                  <td>
                    <button name={i} type="button" className="btn btn-primary btn-sm" onClick={() => editobject(i)}>
                      <GoPencil />
                    </button>
                  </td>
                  <td>
                    <button name={i} type="button" className="btn btn-danger btn-sm" onClick={() => deleteobject(i)}>
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

export default AdminProjectionList;
