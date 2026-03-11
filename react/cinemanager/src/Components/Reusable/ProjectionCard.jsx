import { NavLink } from "react-router-dom";
import "../../style/moviecard.css";
import dayjs from "dayjs";

function ProjectionCard({ projID, movieID, title, location, date, timeStart, timeEnd, linkto }) {
  return (
    <div className="card bg-dark text-white rounded-0 moviecard">
      <div className="divcard">
        <img src={require("../../pic/cam.png")} className="me-3 imgcard rb" alt="Card image" />
        <div className="d-flex flex-column flex-shrink-1 p-3">
          <h5 className="card-title fw-bold">{title}</h5>
          <table className="card-text flex-shrink-1">
            <tbody>
              <tr>
                <td>Venue:</td>
                <td>{location}</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>{dayjs(date).format("DD.MM.YYYY")}</td>
              </tr>
              <tr>
                <td>Begins:</td>
                <td>{dayjs(timeStart).format("HH:mm")}</td>
              </tr>
              <tr>
                <td>Ends:</td>
                <td>{dayjs(timeEnd).format("HH:mm")}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-end">
            {window.sessionStorage.getItem("LOGIN") === "1" && window.sessionStorage.getItem("USER_ROLE") === "0" ? (
              <NavLink to={"/reservation/" + projID} className="tclick">
                Reserve →
              </NavLink>
            ) : (
              <p>Log in to reserve a seat!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectionCard;
