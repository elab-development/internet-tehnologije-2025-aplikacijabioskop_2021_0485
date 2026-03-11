import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Paginator from "../Reusable/Paginator.jsx";
import { MdDelete } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function AdminEmployeeList() {
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(5);
  const [maxPages, setMaxPages] = useState(1);
  const [dispUsers, setDispUsers] = useState([]);
  const navigate = useNavigate();
  var cfgGetEmployees = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/users",
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN"),
    },
    data: {},
  };
  var cfgDelEmployee = {
    method: "delete",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/deleteuser",
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN"),
    },
    data: {},
  };

  function setTable(startindex, endindex) {
    console.log("Start: " + startindex + " End: " + endindex + " Max: " + users.length);
    setDispUsers(users.slice(startindex, endindex));
  }

  function refreshUsers() {
    axios(cfgGetEmployees)
      .then(function (response) {
        if (response.status === 200) {
          setUsers(response.data.users);
          var m = Math.ceil(response.data.users.length / elementsPerPage);
          setMaxPages(m);
          setDispUsers(response.data.users.slice(0, elementsPerPage));
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
    if (users === null) {
      refreshUsers();
    }
  }, []);

  function edituser(i) {
    navigate("/admineditemployee/" + users[i].id);
  }

  function deleteuser(i) {
    cfgDelEmployee.url = "http://127.0.0.1:8000/api/deleteuser/" + users[i].id;
    axios(cfgDelEmployee)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          refreshUsers();
        }
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire(error.message, "", "error");
      });
  }
  function decode(i) {
    switch (i) {
      case 0:
        return "User";
        break;
      case 1:
        return "Admin";
        break;
      case 2:
        return "Employee";
        break;
    }
  }
  return (
    <div className="maincontent">
      <Header></Header>
      <br></br>
      <br></br>
      <div className="tableview">
        {users === null ? (
          " "
        ) : (
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Last name</th>
                <th>E-mail</th>
                <th>Role</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {dispUsers.map((t, i) => (
                <tr key={i}>
                  <td>#{t.id}</td>
                  <td>{t.name}</td>
                  <td>{t.lastname}</td>
                  <td>{t.email}</td>
                  <td>{decode(t.rola)}</td>
                  <td>
                    <button name={i} type="button" className="btn btn-primary btn-sm" onClick={() => edituser(i)}>
                      <GoPencil />
                    </button>
                  </td>
                  <td>
                    <button name={i} type="button" className="btn btn-danger btn-sm" onClick={() => deleteuser(i)}>
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

export default AdminEmployeeList;
