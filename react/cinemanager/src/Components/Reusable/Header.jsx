import "../../style/header.css";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
function Header() {
  var loggedIn = window.sessionStorage.getItem("LOGIN");
  var role = window.sessionStorage.getItem("USER_ROLE");
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid nbres">
        <img className="navbar-brand" src={require("../../pic/CinePlazaBanner.png")} />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/movies">
                Movies
              </NavLink>
            </li>
            {loggedIn === "1" && role === "1" ? (
              <li className="nav-item dropdown ">
                <a className="nav-link dropdown-toggle" id="navDropdownAdminMovies" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Administrate Movies
                </a>

                <ul className="dropdown-menu dm-profile" aria-labelledby="navDropdownAdminMovies">
                  <li>
                    <NavLink className="dropdown-item" to="/adminnewmovie">
                      New
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/adminmovielist">
                      View Movies
                    </NavLink>
                  </li>
                </ul>
              </li>
            ) : (
              " "
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                <FaUser />
              </a>
              <ul className="dropdown-menu dropdown-menu-end dm-profile">
                {loggedIn === "1" ? (
                  <li>
                    <a className="dropdown-item dropdown-item-static" href="#">
                      {window.sessionStorage.getItem("USER_NAME")}
                    </a>
                  </li>
                ) : (
                  <></>
                )}
                {loggedIn === "0" ? (
                  <li>
                    <a className="dropdown-item" href="/logon">
                      Log in
                    </a>
                  </li>
                ) : (
                  <></>
                )}
                {loggedIn === "0" ? (
                  <li>
                    <a className="dropdown-item" href="/register">
                      Register
                    </a>
                  </li>
                ) : (
                  <></>
                )}
                {loggedIn === "1" ? (
                  <li>
                    <a className="dropdown-item" href="/logoff">
                      Log out
                    </a>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
