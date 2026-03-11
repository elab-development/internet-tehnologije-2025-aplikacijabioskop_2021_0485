import React from "react";
import "../../style/imdbcontainer.css";

function IMDBContainer({ IMDBData }) {
  if (IMDBData == null) {
    return (
      <table className="imdbtable">
        <tbody>
          <tr>
            <td>
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" alt="IMDb" style={{ height: "24px" }} />
            </td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="2" className="text-center">
              IMDB Data not available
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
  return (
    <table className="imdbtable">
      <tbody>
        <tr>
          <td>
            <a href="https://www.imdb.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" alt="IMDb" style={{ height: "24px" }} />
            </a>
          </td>
          <td></td>
        </tr>

        <tr>
          <td>
            <strong>Title:</strong>
          </td>
          <td>{IMDBData["#TITLE"]}</td>
        </tr>

        <tr>
          <td>
            <strong>Year:</strong>
          </td>
          <td>{IMDBData["#YEAR"]}</td>
        </tr>

        <tr>
          <td>
            <strong>Actors:</strong>
          </td>
          <td>{IMDBData["#ACTORS"]}</td>
        </tr>
        <tr>
          <td>
            <strong>IMDB rank:</strong>
          </td>
          <td>{IMDBData["#RANK"]}</td>
        </tr>
        <tr>
          <td colSpan="2">
            <a href={IMDBData["#IMDB_URL"]} target="_blank" rel="noopener noreferrer">
              Check on IMDb ↗
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default IMDBContainer;
