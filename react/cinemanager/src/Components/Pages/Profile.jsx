import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/logon.css";
import Swal from "sweetalert2";
function Profile() {
  const [userdata, setUserdata] = useState(null);
  const [formData, setFormData] = useState(null);
  const [allowupdate, setAllowupdate] = useState(false);
  const navigate = useNavigate();
  var cfg_get_userdata = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/user",
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN"),
    },
    data: {},
  };
  var cfg_update_profile = {
    method: "patch",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/api/updatemyprofile",
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("USER_AUTH_TOKEN"),
    },
    data: {},
  };
  useEffect(() => {
    if (userdata === null) {
      axios(cfg_get_userdata)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            setFormData(response.data);
            setUserdata(response.data);
          }
        })
        .catch(function (error) {
          console.log("Error: " + error.message);
          Swal.fire(error.message, "", "error");
        });
    }
  }, []);
  function submitForm(e) {
    e.preventDefault();
    cfg_update_profile.data = formData;
    axios(cfg_update_profile)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Successfully updated!");
          Swal.fire("Successfully updated profile!", "", "success");
          navigate("/myprofile");
        }
      })
      .catch(function (error) {
        console.log("Error: " + error.message);
        Swal.fire(error.message, "", "error");
      });
  }

  function handleInput(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const handleCheckbox = (e) => {
    setAllowupdate(e.target.checked);
  };

  return (
    <div className="maincontent">
      <Header></Header>
      <br></br>
      <br></br>
      <form>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" checked={allowupdate} onChange={handleCheckbox} id="flexCheckDefault" />
          <label className="form-check-label" for="flexCheckDefault">
            Update
          </label>
        </div>
      </form>

      {userdata === null ? (
        " "
      ) : (
        <div className="formcontainer">
          <form onSubmit={submitForm}>
            <div className="form-group row mb-3 align-items-top">
              <label htmlFor="email" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
                E-mail
              </label>
              <div className="col-lg-9 col-md-12">
                <input disabled={!allowupdate} name="email" type="email" min={1} className="form-control" id="email" placeholder="" value={formData.email} onInput={handleInput} />
              </div>
            </div>
            <div className="form-group row mb-3 align-items-top">
              <label htmlFor="name" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
                Name
              </label>
              <div className="col-lg-9 col-md-12">
                <input disabled={!allowupdate} name="name" type="text" min={1} className="form-control" id="name" placeholder="" value={formData.name} onInput={handleInput} />
              </div>
            </div>
            <div className="form-group row mb-3 align-items-top">
              <label htmlFor="lastname" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
                Last name
              </label>
              <div className="col-lg-9 col-md-12">
                <input disabled={!allowupdate} name="lastname" type="text" min={1} className="form-control" id="lastname" placeholder="" value={formData.lastname} onInput={handleInput} />
              </div>
            </div>
            <div className="form-group row mb-3 align-items-top">
              <label htmlFor="password" className="col-lg-3 col-md-12 col-form-label mb-2 mb-lg-0">
                Password
              </label>
              <div className="col-lg-9 col-md-12">
                <input disabled={!allowupdate} name="password" type="password" min={1} className="form-control" id="password" placeholder="" value={formData.password} onInput={handleInput} />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-lg-auto col-md-12 col-sm-auto">
                <input disabled={!allowupdate} type="submit" className="btn btn-dark w-100 w-lg-auto" value="Update profile" />
              </div>
            </div>
          </form>
        </div>
      )}

      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default Profile;
