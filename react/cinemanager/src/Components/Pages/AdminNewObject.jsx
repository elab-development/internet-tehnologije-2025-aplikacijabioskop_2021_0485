import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import MovieForm from "../Reusable/Form/ObjectForm.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ObjectForm from "../Reusable/Form/ObjectForm.jsx";
import Swal from "sweetalert2";
function AdminNewObject() {
  const navigate = useNavigate();
  var cfg_new_object = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/newobject",
    headers: { Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN") },
    data: {},
  };

  function submitForm(data) {
    cfg_new_object.data = data;
    console.log(data);
    axios(cfg_new_object)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Successfully created object!");
          Swal.fire("Successfully created object!", "", "success");
          navigate("/adminnewobject");
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
      <ObjectForm onSubmit={submitForm}></ObjectForm>
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default AdminNewObject;
