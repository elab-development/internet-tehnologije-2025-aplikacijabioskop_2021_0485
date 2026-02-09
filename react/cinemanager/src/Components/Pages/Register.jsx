import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import RegisterForm from "../Reusable/Form/RegisterForm.jsx";
import "../../style/pos.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  var cfg_register = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/register",
    headers: {},
    data: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
  };
  function handleRegister(data) {
    cfg_register.data.name = data.name;
    cfg_register.data.lastname = data.lastname;
    cfg_register.data.email = data.email;
    cfg_register.data.password = data.password;
    axios(cfg_register)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Successfully registered!");
          navigate("/logon");
        }
      })
      .catch(function (error) {
        console.log("Error: " + error.message);
      });
  }

  return (
    <div className="maincontent flex-grow-1">
      <Header></Header>
      <br></br>
      <br></br>
      <div className="container">
        <RegisterForm onSubmit={handleRegister}></RegisterForm>
      </div>
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default Register;
