import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Logoff() {
  const navigate = useNavigate();
  var cfg_logoff = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/logoff",
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN"),
    },
    data: {},
  };
  useEffect(() => {
    console.log(window.sessionStorage.getItem("USER_AUTH_TOKEN"));
    axios(cfg_logoff)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Successfully logged off!");
          navigate("/home");
        }
      })
      .catch(function (error) {
        console.log("Error: " + error.message);
      });
  }, []);
  return <div></div>;
}

export default Logoff;
