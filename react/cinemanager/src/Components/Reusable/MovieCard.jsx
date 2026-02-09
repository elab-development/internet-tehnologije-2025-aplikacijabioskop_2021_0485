import { NavLink } from "react-router-dom";
import "../../style/moviecard.css";

function MovieCard({ movieID, img, title, desc, linkto }) {
  const ellipsized = desc.length > 955 ? desc.substring(0, 955) + "..." : desc;
  return (
    <div className="card bg-dark text-white rounded-0 moviecard">
      <div className="divcard">
        <img src={img} className="flex-grow-1 me-3 imgcard" alt="Card image" />
        <div className="d-flex flex-column flex-shrink-1 p-3">
          <h5 className="card-title fw-bold">{title}</h5>

          <p className="card-text flex-shrink-1">{ellipsized}</p>

          <div className="text-end">
            <NavLink to={"/movie/" + movieID} className="tclick">
              Read more →
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
