import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <img src="/Images/card.png" alt="" width="30" height="30" />
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            © 2024 Company, Inc Products
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-body-secondary">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="cards" className="nav-link px-2 text-body-secondary">
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link to="add_item" className="nav-link px-2 text-body-secondary">
              Add Item
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
