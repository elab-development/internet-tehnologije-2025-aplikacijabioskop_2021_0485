import React, { useEffect, useState } from "react";
import "../../style/paginator.css";
import { Link } from "react-router-dom";

function Paginator({ pageCount, active, onChange, onPrevious, onNext }) {
  var pages = [];

  for (let i = 0; i < pageCount; i++) {
    if (i == active - 1) {
      pages.push(
        <li className="page-item active" key={i}>
          <Link
            className="page-link inactive"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              onChange(i + 1);
            }}
          >
            {i + 1}
          </Link>
        </li>,
      );
    } else {
      pages.push(
        <li className="page-item" key={i}>
          <Link
            className="page-link inactive"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              onChange(i + 1);
            }}
          >
            {i + 1}
          </Link>
        </li>,
      );
    }
  }

  return (
    <nav aria-label="pages">
      <ul className="pagination">
        <li className="page-item">
          <Link
            className="page-link"
            to="#"
            aria-label="Previous"
            onClick={(e) => {
              e.preventDefault();
              onPrevious();
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {pages}
        <li className="page-item">
          <Link
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={(e) => {
              e.preventDefault();
              onNext();
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default Paginator;
