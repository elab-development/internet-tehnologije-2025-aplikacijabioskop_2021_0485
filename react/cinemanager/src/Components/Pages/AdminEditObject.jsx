import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ObjectForm from "../Reusable/Form/ObjectForm.jsx";
import Swal from "sweetalert2";

function AdminEditObject() {
  const navigate = useNavigate();
  const objectParams = useParams();
  const [object, setObject] = useState(null);
  var cfg_edit_object = {
    method: "patch",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/editobject",
    headers: { Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN") },
    data: {},
  };

  var cfg_get_object = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/objects/" + objectParams.id,
    headers: { Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN") },
    data: {},
  };
  useEffect(() => {
    if (object === null) {
      axios(cfg_get_object)
        .then(function (response) {
          if (response.status === 200) {
            setObject(response.data.object);
          }
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire(error.message, "", "error");
        });
    }
  }, []);

  function submitForm(data) {
    cfg_edit_object.data = data;
    cfg_edit_object.data.id = object.id;
    console.log(data);
    axios(cfg_edit_object)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Successfully updated object!");
          Swal.fire("Successfully updated user!", "", "success");
          navigate("/admineditobject/" + objectParams.id);
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
      {object != null ? <ObjectForm onSubmit={submitForm} currentObject={object}></ObjectForm> : <></>}
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default AdminEditObject;
