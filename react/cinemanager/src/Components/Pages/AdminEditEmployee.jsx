import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import UserForm from "../Reusable/Form/UserForm.jsx";
import Swal from "sweetalert2";

function AdminEditEmployee() {
  const navigate = useNavigate();
  const userParams = useParams();
  const [user, setUser] = useState(null);
  var cfg_edit_user = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/updateuser/",
    headers: { Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN") },
    data: {},
  };

  var cfg_get_user = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/users/" + userParams.id,
    headers: { Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN") },
    data: {},
  };
  useEffect(() => {
    if (user === null) {
      axios(cfg_get_user)
        .then(function (response) {
          if (response.status === 200) {
            setUser(response.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire(error.message, "", "error");
        });
    }
  }, []);

  function submitForm(data) {
    cfg_edit_user.data = data;
    cfg_edit_user.data.user_id = user.id;
    console.log(data);
    axios(cfg_edit_user)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Successfully updated user!");
          Swal.fire("Successfully updated user!", "", "success");
          navigate("/admineditemployee/" + userParams.id);
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
      {user != null ? <UserForm onSubmit={submitForm} currentUser={user}></UserForm> : <></>}
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default AdminEditEmployee;
