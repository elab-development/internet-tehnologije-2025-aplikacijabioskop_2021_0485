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
import Swal from "sweetalert2";
function AdminObjectList() {
  const [objects, setObjects] = useState(null);
  const [page, setPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(5);
  const [maxPages, setMaxPages] = useState(1);
  const [dispObjects, setDispObjects] = useState([]);
  const navigate = useNavigate();
  var cfgGetObjects = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/objects",
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN"),
    },
    data: {},
  };
  var cfgDelObject = {
    method: "delete",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/deleteobject",
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN"),
    },
    data: {},
  };

  function setTable(startindex, endindex) {
    console.log("Start: " + startindex + " End: " + endindex + " Max: " + objects.length);
    setDispObjects(objects.slice(startindex, endindex));
  }

  function refreshobjects() {
    axios(cfgGetObjects)
      .then(function (response) {
        if (response.status === 200) {
          setObjects(response.data.objects);
          var m = Math.ceil(response.data.objects.length / elementsPerPage);
          setMaxPages(m);
          setDispObjects(response.data.objects.slice(0, elementsPerPage));
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
    if (objects === null) {
      refreshobjects();
    }
  }, []);

  function editobject(i) {
    navigate("/admineditobject/" + objects[i].id);
  }

  function deleteobject(i) {
    cfgDelObject.url = cfgDelObject.url + "/" + objects[i].id;
    axios(cfgDelObject)
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
        {objects === null ? (
          " "
        ) : (
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Capacity</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {dispObjects.map((t, i) => (
                <tr key={i}>
                  <td>#{t.id}</td>
                  <td>{t.naziv}</td>
                  <td>{t.adresa}</td>
                  <td>{t.kapacitet}</td>
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

export default AdminObjectList;
