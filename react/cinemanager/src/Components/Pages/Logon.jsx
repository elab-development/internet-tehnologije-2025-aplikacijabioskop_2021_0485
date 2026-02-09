import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import LogonForm from "../Reusable/Form/LogonForm.jsx";
import "../../style/pos.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logon() {
  const navigate = useNavigate();
  var cfg_logon = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/logon",
    headers: {},
    data: {
      email: "",
      password: "",
    },
  };
  function handleLogon(data) {
    cfg_logon.data.email = data.email;
    cfg_logon.data.password = data.password;
    console.log(data);
    axios(cfg_logon)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Successfully logged on!");
          window.sessionStorage.setItem("LOGIN", "1");
          window.sessionStorage.setItem("USER_NAME", response.data.username);
          window.sessionStorage.setItem("USER_AUTH_TOKEN", response.data.access_token);
          window.sessionStorage.setItem("USER_ID", response.data.user_id);
          window.sessionStorage.setItem("USER_ROLE", response.data.rola);
          navigate("/home");
        }
      })
      .catch(function (error) {
        console.log("Error: " + error.message);
      });
  }
  return (
    <div className="maincontent">
      <Header></Header>
      <br></br>
      <br></br>
      <div className="container">
        <LogonForm onSubmit={handleLogon}></LogonForm>
      </div>
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default Logon;
